"use client";
import Chapters from "./Chapters";
import { deleteChapter, insertChapter } from "../_lib/actions";
import { useOptimistic, useState } from "react";
import ButtonPlush from "./ButtonPlush";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import Pagination from "./Pagination";

function ChapterList({ chapters, id, count, pageSize, bigNumber=0, trash=true, param="/account/detail/"}) {
  const [optimisticDel, setOptimisticDel] = useOptimistic(
    chapters,
    (curChap, chapId) => curChap.filter((chap) => chap.id !== chapId),
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("sort");
  const params = new URLSearchParams(searchParams.toString());

  async function handleDelete(chapId) {
    setOptimisticDel(chapId);
    deleteChapter(chapId, id);
  }

  function handleSort() {
    if (search === "down") {
      params.set("sort", "up");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    if (search === "up" || search === null) {
      params.set("sort", "down");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <div>
      {trash && <form action={insertChapter} className={`ml-200 my-2 flex relative`}>
        <input name="name" hidden defaultValue="tên chương" />
        <input name="number" hidden value={bigNumber+1} readOnly />
        <input name="mangas_id" hidden defaultValue={id} />
        <ButtonPlush name="chương" />
      </form>}
      
      <div className="bg-gray-50 p-5  ">
        <div className="flex justify-between">
          <div className="text-2xl font-bold pb-4">Danh sách chương</div>
          <div
            onClick={handleSort}
            className="hover:text-blue-50 cursor-pointer"
          >
            <ArrowsUpDownIcon className="w-6 h-6" />
          </div>
        </div>
        {optimisticDel.map((chapter) =>
            +id === chapter.mangas_id ? (
            <Chapters
              handleDelete={handleDelete}
              key={chapter.id}
              chapterId={chapter.id}
              param_id={+id}
              href={`${  !trash ? `/chapter/${+id}/chap/${chapter.id}` : `/account/detail/${+id}/setup/${chapter.id}` }`}
              number={chapter.number}
              name={chapter.name}
              trash={trash}
            />
          ) : (
            ""
          ),
        )}

        <div>
          <Pagination param={param} count={count} pageSize={pageSize} id={id}/>
        </div>
      </div>
    </div>
  );
}

export default ChapterList;
