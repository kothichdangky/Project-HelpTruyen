"use client";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Search from "./Search";
import { getMangaformSearch } from "../_lib/actions";
import { useEffect, useState } from "react";

function Navigation({ session, position, handleShow, show }) {
  
  const [search, setSearch] = useState("");
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
  const timer = setTimeout(async () => {
    if (search.trim()) {
      const data = await getMangaformSearch(search);
      setMangas(data);
    } else {
      setMangas([]);
    }
  }, 400);

  return () => clearTimeout(timer);
}, [search]);
  return (
    <nav
      className={`fixed left-0 lg:w-full w-screen top-0
        ${
          position || show
            ? "bg-linear-[180deg,rgb(250_250_250/100%)_100%,rgb(250_250_250/0%)_80%]"
            : "bg-linear-[180deg,rgb(250_250_250/80%)_60%,rgb(250_250_250/0%)_100%]"
        }
      
      z-50`}
    >
      <ul
        className={`flex justify-between md:mx-30 mx-2  pt-4 ${position || show ? "pb-4" : "pb-9"}  relative items-center `}
      >
        <li>
          <Link
            href="/"
            className="md:text-4xl text-2xl font-bold text-blue-50"
          >
            HELPTRUYỆN
          </Link>
        </li>
        <li className="flex items-center">
          <div className="flex relative items-center">
            <input
              onFocus={handleShow}
              onBlur={handleShow}
              onChange={(e) => setSearch(e.target.value)}

              name="search"
              placeholder="Tìm kiếm truyện"
              className="input bg-black-50 text-white-50 opacity-50 w-44 h-13.25 pb-4 pt-3 rounded-2xl
               px-5 
               transition-all delay-150 duration-700
               min-[1300px]:focus:w-250 focus:w-52
               "
            />
            <MagnifyingGlassIcon className="w-4 h-4 absolute right-4 pointer-events-none" />
          </div>
          {session ? (
            <Link
              href="/account/"
              className="bg-black-50/50 mx-2  
           rounded-4xl"
            >
              <img
                className="h-12 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : (
            <Link
              href="/account"
              className="bg-black-50/50 mx-2  
          p-4 rounded-4xl"
            >
              <UserIcon className="h-5 w-5 " />
            </Link>
          )}
        </li>
      </ul>
      <Search show={show}  mangas={mangas} />
    </nav>
  );
}

export default Navigation;
