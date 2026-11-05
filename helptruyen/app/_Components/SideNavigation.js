"use client";
import { EyeIcon, HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const navLinks = [
  // {
  //   name: "Truyện theo dõi",
  //   href: "/account/follow",
  //   icon: <EyeIcon className="w-5 h-5" />,
  // },
  {
    name: "Tài khoản",
    href: "/account",
    hrefChild: "/account/detail/",
    icon: <HomeIcon className="h-5 w-5 " />,
  },
  {
    name: "Setting",
    href: "/account/setting",
    icon: <Cog6ToothIcon className="w-5 h-5" />,
  },
];

function SideNavigation({session}) {
  const pathname = usePathname();

  return (
    <nav className="border-r border-black-50 ">
      <ul className="flex flex-col gap-2 h-[402px] text-lg sticky">

      {/* Nếu không phải admin sẽ ko hiện setting */}
        { (session.user.role === "admin" ? navLinks : navLinks.slice(0,1)).map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-blue-50 hover:text-white-50 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ||
                (link.href === "/account" &&
                  !pathname.startsWith("/account/follow") && !pathname.startsWith("/account/setting") )
                  ? "bg-blue-50 text-white-50"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
          
        ))   }

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
