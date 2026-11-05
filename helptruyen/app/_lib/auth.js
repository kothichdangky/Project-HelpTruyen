import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser, getUserInPage } from "./data-service";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "./supabase";
import react from "react";
import { NextResponse } from "next/server";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const bcrypt = require("bcrypt");
        let { data, error } = await supabase
          .from("users")
          .select("id , fullName , password, image, role")
          .eq("fullName", credentials.username)
          .maybeSingle();

        const user = {
          id: data.id,
          name: data.fullName,
          check: true,
          image: data.image,
          role: data.role,
        };
        if (error) {
          return null;
        }
        const check = await bcrypt.compare(credentials.password, data.password);
        return check ? user : null;
      },
    }),
  ],
  callbacks: {
    async authorized({ auth, request }) {
      const isLogin = !!auth?.user;
      const isPageLogin = request.nextUrl.pathname === "/login";
      const isPageRegister = request.nextUrl.pathname === "/login/register";
      const isPageSetting = request.nextUrl.pathname === "/account/setting";
      const admin = auth?.user.role === "admin";

      if ((isLogin && isPageLogin) || (isLogin && isPageRegister)) {
        return NextResponse.redirect(new URL("/account", request.url));
      }

      if (isLogin && !admin && isPageSetting) {
        return NextResponse.redirect(new URL("/account", request.url));
      }

      if (!isLogin && isPageRegister) {
        return true;
      }
      return isLogin;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const existUser = await getUser(user.email);

          if (!existUser) {
            await createUser({
              fullName: user.name,
              email: user.email,
              image: user.image,
            });
          }
          return true;
        } catch {
          return false;
        }
      } else {
        return true;
      }
    },
    async jwt({ token, user, account, trigger }) {
      // dùng jwt để chuyển bị tham số chèn vào session
      if (account?.provider === "credentials" && user) {
        if (user) {
          token.id = user.id;
          token.image = user.image;
          token.role = user.role;
          token.check = user.check;
        }
      }
      if (token.check) {
        if (trigger === "update") {
          const user = await getUserInPage(token.id);
          token.image = user.image === token.image ? token.image : user.image;
          // token.image = user.image
          token.name =
            user.fullName === token.name ? token.name : user.fullName;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // có thể chèn thêm 1 thứ vào session cơ bản của nextAuth
      if (!token.check) {
        // ở đây là để chèm thêm 1 thành phần mới là userId vào trong session(session là 1 object)
        const user = await getUser(session.user.email);
        session.user.userId = user.id;
        session.user.role = user.role;
        session.user.image =
          session.user.image !== user.image ? user.image : session.user.image;
        session.user.name =
          session.user.name !== user.fullName
            ? user.fullName
            : session.user.name;

        return session;
      } else {
        session.user.userId = token.id;
        session.user.role = token.role;
        session.user.image = token.image;

        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  unstable_update,
  handlers: { GET, POST },
} = NextAuth(authConfig);
