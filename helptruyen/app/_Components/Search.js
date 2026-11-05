import { useParams } from "next/navigation";
import Post from "./Post";

function Search({ show, mangas  }) {
  const params = useParams();
  const chapterId = params.ChapterId
  return (
    <>
      <div
        className={` left-0 w-full 
   bg-gray-100  ${show ? " py-4 " : "h-0 invisible"}  `}
      >
        <div className={` ${show ? "" : "hidden"} grid lg:grid-cols-5 grid-cols-4 gap-6.5 pt-5  mx-30`}>
          {mangas?.map((manga)=> <Post
          key={manga.id}
          href={ !chapterId ?`chapter/${manga.id}` : `${manga.id}`}
          name={manga.title}
          image={manga.image_main}
        /> )}
        </div>
      </div>
      <div
        className={` ${!show ? "" : "show absolute bg-black-50/50 z-20 h-screen w-full"}`}
      ></div>
    </>
  );
}

export default Search;
