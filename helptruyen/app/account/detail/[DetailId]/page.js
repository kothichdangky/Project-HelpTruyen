import ChapterList from "@/app/_Components/ChapterList";
import InputTransform from "@/app/_Components/InputTransform";
import LeftBackground from "@/app/_Components/LeftBackground";
import { constants } from "@/app/_constants/page";
import { insertChapter, updateDetailManga } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import {
  getBigNumber,
  getChapters,
  getManga,
  getTypes,
  getTypesForManga,
} from "@/app/_lib/data-service";

export const metadata = {
  title: "Update Manga",
};

async function Page({ params, searchParams  }) {
  const session = await auth()

  const { DetailId } = await params;
  const {sort, page} = await searchParams;
  const manga = await getManga(DetailId);
  const types = await getTypes();
  const typesManga = await getTypesForManga();
  const number = await getBigNumber(DetailId);
  const bigNumber = !number? 0 : number.number
  const {pageSize, collapsedNumWords} = await constants();
  
  const {data: chapters, count} = await getChapters(sort === undefined ? true :sort==="up" , +session.user.userId, page === undefined ? 1 : Number(page), +DetailId );


  if(+session.user.userId !==  manga.user_id){
    return <h1>Đây không phải truyện của bạn</h1>
  }

  return (
    <div className=" ">
      <div className="mb-2">
        <InputTransform
          action={updateDetailManga.bind(null, "title")}
          name={manga.title}
          id={manga.id}
          style="w-45 h-7.5 p-1"
          text="font-bold text-4xl"
          buttonStyle="mt-2"
        />
      </div>
      <LeftBackground
        id = {DetailId}
        edit={true}
        manga={manga}
        types={types}
        collapsedNumWords={collapsedNumWords}
        typesManga={typesManga}
      />
      <ChapterList id={DetailId} count={count} chapters={chapters} pageSize={pageSize} bigNumber={bigNumber}/>
    </div>
  );
}

export default Page;
