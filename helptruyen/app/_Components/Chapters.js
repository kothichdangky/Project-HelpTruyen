"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteChapter } from "../_lib/actions";
import { useTransition } from "react";

function Chapters({
  number,
  name,
  href,
  trash = false,
  chapterId,
  param_id,
  handleDelete,
}) {
  const [isPending, startTransititon] = useTransition();
  function deleteChap(e) {
    e.preventDefault();
    startTransititon(() => handleDelete(chapterId));
  }
  return (
    <Link href={href} className="flex mt-1 py-3 bg-gray-100 justify-between">
      <div className="flex pl-4 ">
        <div className="font-bold pr-3">Chương {number}</div>
        <div>{name}</div>
      </div>
      {trash && (
        <form className="pr-4 pt-1">
          <button onClick={deleteChap}>
            <TrashIcon className="w-5 h-5 text-black cursor-pointer hover:text-red-600" />
          </button>
        </form>
      )}
    </Link>
  );
}

export default Chapters;
