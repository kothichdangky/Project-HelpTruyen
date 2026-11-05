import ButtonInManga from "@/app/_Components/ButtonInManga";
import Mini from "@/app/_Components/Mini";
import { auth } from "@/app/_lib/auth";
import { getBigNumber, getChapter, getComments, getImageChapterWithId, getManga, getPrevAndNextChapter } from "@/app/_lib/data-service";
import Image from "next/image";

async function page({ params }) {
  const { ChapterId, ChapId } = await params;
  const [images, bigNum, chapter, manga, comments, session] = await Promise.all([
    getImageChapterWithId(ChapId),
    getBigNumber(ChapterId),
    getChapter(ChapId),
    getManga(ChapterId),
    getComments(ChapterId, ChapId),
    auth(),
   ])
  const bigNumber = bigNum.number;
  const number = chapter.number
  const {prev, next} = await getPrevAndNextChapter(ChapterId, number);

  return (
    <>
      <ButtonInManga number={number} ChapterId={ChapterId} ChapId={ChapId} bigNumber={bigNumber} chapter={chapter} manga={manga} prev={prev} next={next} />
      <div className="mt-5 absolute left-1/2 -translate-x-1/2 w-full z-20 px-10 bg-gray-100">
        {images.map((img) => (
          <div key={img.id} className="relative w-full h-400 ">
            <Image
              src={img.image}
              fill
              className="object-contain"
              alt={img.image}
            />
          </div>
        ))}
      </div>
      <Mini number={number} ChapterId={ChapterId} ChapId={ChapId} bigNumber={bigNumber} chapter={chapter} manga={manga} prev={prev} next={next} comments={comments} session={session}/>
    </>
  );
}

export default page;
