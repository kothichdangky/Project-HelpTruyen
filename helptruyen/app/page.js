import Post from "./_Components/Post";
import Carousel from "./_Components/Carousel";
import { getNewChapterInMangas } from "./_lib/data-service";
import AllMangas from "./_Components/AllMangas";
import { constants } from "./_constants/page";

export default async function page() {
  const [newMangas, newMangasInpost, {collapsedNumWords}] = await Promise.all([
    getNewChapterInMangas(true),
    getNewChapterInMangas(),
    constants()
  ])
  // const newMangas = await getNewChapterInMangas(true)
  // const newMangasInpost = await getNewChapterInMangas();
  // const {collapsedNumWords} = await constants()
  return (
    <>
      <div className="mb-6 ">
        <Carousel newMangas={newMangas}  collapsedNumWords={collapsedNumWords}/>
      </div>
      
      <div className="absolute font-bold text-4xl lg:pl-30 p-5">
        Truyện mới
        <div className=" ">
          {/* <AllMangas mangas={mangas} /> */}
          <AllMangas mangas={newMangasInpost} />
          
        </div>
      </div>
    </>
  );
}
