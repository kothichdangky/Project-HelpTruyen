import ButtonMove from "@/app/_Components/ButtonMove";
import { getChapter, getManga, getPrevAndNextChapter } from "../_lib/data-service";
async function ButtonInManga({number, ChapterId ,ChapId, bigNumber, chapter, manga ,prev, next}) {

    return (
       <div className="flex justify-center">
        <ButtonMove color="gray-50" textColor="text-black-50" right={false} number={number} ChapterId={ChapterId} ChapId={ChapId} prev={prev} next={next}>
         Chương trước 
        </ButtonMove>

        <div className=" lg:px-2  text-center">
          <div className="text-xl font-bold">{manga.title}</div>
          <div>
            {" "}
            <b> Chương {number} </b> &nbsp; {chapter.name}
          </div>
        </div>

        <ButtonMove number={number} ChapterId={ChapterId} bigNumber={bigNumber} prev={prev} next={next}> <button > Chương sau </button> </ButtonMove>
      </div>
    )
}

export default ButtonInManga
