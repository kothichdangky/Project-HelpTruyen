"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { pageSize } from "@/public/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { constants } from "../_constants/page";

function Pagination({ count, pageSize, param, id }) {
  const searchParams = useSearchParams();
  const route = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const pageCount = Math.ceil(count / pageSize);

 
  function handleNext() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    params.set("page", next);
    route.replace(`?${params.toString()}`, { scroll: false });
  }

  function handlePrev() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    params.set("page", prev);
    route.replace(`?${params.toString()}`, { scroll: false });
  }

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="flex justify-between mt-2">
      <div className="font-medium">
        Tổng <b>{count}</b> chương
      </div>

      <div className="flex gap-4">

              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center ${currentPage === 1 ? "text-gray-500" : "cursor-pointer hover:text-blue-50"}  `}
              >
                <ChevronLeftIcon className="h-7 w-7" />
                <span className="font-medium">quay về</span>
              </button>
        
              <button
                onClick={handleNext}
                disabled={currentPage === pageCount}
                className={`flex items-center ${currentPage === pageCount ? "text-gray-500" : "cursor-pointer hover:text-blue-50"} `}
              >
                <span className="font-medium">tiến tới</span>
                <ChevronRightIcon className="h-7 w-7" />
              </button>
          
      </div>
    </div>
  );
}

export default Pagination;
