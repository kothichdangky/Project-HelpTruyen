"use client";
import { usePathname } from "next/navigation";
import SignInButton from "../_Components/SignInButton";
import Link from "next/link";


const navLinks = [
  {
    name: "Sign in",
    href: "/login",
  },
  {
    name: "Register",
    href: "/login/register",
  },
];


function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className=" fixed flex flex-col top-40 right-0 left-0  items-center justify-center">
      <ul className="flex gap-1 min-h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 m-0 hover:bg-blue-50 hover:text-white-50 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href
                  ? "bg-blue-50 text-white-50"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="w-85 border-t mb-1"></div>
      <div className=" gap-5">
        {children}

        <div className="flex relative m-2">
          <div className="w-32 border-t absolute top-3 right-50"></div>
          <div className="w-36 absolute  right-9">Hoặc</div>
          <div className="w-32 border-t absolute top-3 left-50"></div>
        </div>
      </div>
      <div className="mt-7">
        <SignInButton />
      </div>
    </div>
  );
}

export default RootLayout;
