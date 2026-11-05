"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { deleteManga } from "../_lib/actions";

function Post({href, chapter, hour, name, image, id, ondelete= false}) {

  return (
    <>
    <div className="relative">
    <Link href={href} >
      <Image src={image} width={160} height={240} alt={name} />
      <div className="text-[18px] font-medium py-2">{name}</div>
      <div className="flex">
        <div className="text-[16px] font-medium ">{chapter ? `C`+chapter : chapter} </div>
        <div className="text-[16px] font-light">{!hour ? '' : '-'}  {hour}</div>
      </div>
    </Link>
      {ondelete ?  <div onClick={()=>deleteManga(id)} className="absolute top-2 left-28 bg-red-600 p-2 rounded-4xl transition-all hover:text-white-50 hover:left-24 hover:px-4 cursor-pointer">
          <TrashIcon className=" w-4 h-4 " />
        </div> : ""}
        </div>
    </>
  );
}

export default Post;
