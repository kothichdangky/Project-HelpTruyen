
"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";
import Comment from "./Comment";

function Mini({
  ChapterId,
  ChapId,
  bigNumber,
  chapter,
  manga,
  number,
  prev,
  next,
  comments,
  session
}) {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  return (
    <>
      <div className="bg-gray-100 fixed bottom-5 left-5 w-89 h-12 rounded-2xl flex z-50">
        <button onClick={handleShow}>
          <ChevronUpIcon height={24} width={24} className="cursor-pointer mx-4" />
        </button>

        <Link
          href={
            number === 1
              ? `/chapter/48/chap/${ChapId}`
              : `/chapter/48/chap/${prev.id}`
          }
          className="cursor-pointer bg-blue-50 h-full w-14.75 flex items-center justify-center"
        >
          <ChevronLeftIcon height={24} width={24} />
        </Link>

        <div className="flex items-center mx-6.5 w-25 font-medium text-[16px]">
          Chương {number}
        </div>

        <Link
          href={
            number === bigNumber
              ? `/chapter/48/chap/${ChapId}`
              : `/chapter/48/chap/${next.id}`
          }
          className="cursor-pointer bg-blue-50 h-full w-14.75 flex items-center justify-center"
        >
          <ChevronRightIcon height={24} width={24} />
        </Link>

        <button onClick={handleShow}>
          <ChatBubbleOvalLeftEllipsisIcon height={24} width={24} className="cursor-pointer mx-4" />
        </button>
      </div>

      <Comment handleShow={handleShow} show={show} ChapterId={ChapterId} ChapId={ChapId} comments={comments} session={session} />
    </>
  );
}

export default Mini;
