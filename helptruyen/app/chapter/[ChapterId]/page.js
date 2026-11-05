import ChapterList from "@/app/_Components/ChapterList";
import SuspenseLeft from "@/app/_Components/SuspenseLeft";
import { Suspense } from "react";

import { constants } from "@/app/_constants/page";
import { auth } from "@/app/_lib/auth";
import { getChapters } from "@/app/_lib/data-service";
import Spinner from "@/app/_Components/Spinner";

async function page({ params, searchParams }) {
  const { ChapterId } = await params;
  const { sort, page } = await searchParams;

  const {pageSize} =await constants();
  const {data: chapters, count} = await getChapters(sort === undefined ? true :sort==="up" , false , page === undefined ? 1 : Number(page), +ChapterId)
  
  return (
    <div className="flex lg:m-30 lg:grid lg:grid-cols-2 lg:gap-4 m-10 ">
      <Suspense fallback={<Spinner />}>
        <SuspenseLeft ChapterId={ChapterId} />
      </Suspense>
      <div className="bg-gray-50  ">
        <ChapterList id={ChapterId} chapters={chapters} count={count} pageSize={pageSize} trash={false} param="/chapter/"/>
      </div>
    </div>
  );
}

export default page;
