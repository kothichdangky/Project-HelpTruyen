import AllPostInHome from "./AllPostInHome";
import { formatDistanceFromNow } from "@/public/helpers";
import Post from "./Post";

async function AllMangas({ mangas }) {

  return (
    <div className="grid lg:grid-cols-7 grid-cols-4 gap-6.5 pt-5">
      {mangas.map((manga) => (
        <Post
          key={manga.id}
          href={`chapter/${manga.mangas_id}`}
          name={manga.mangas.title}
          image={manga.mangas.image_main}
          chapter={manga.number}
          hour={formatDistanceFromNow(manga?.created_at.split(" ").join("T"))}
        />
       
      ))}
      {/* {mangas.map((manga) => (
        <AllPostInHome
          key={manga.id}
          id={manga.id}
          href={`chapter/${manga.id}`}
          name={manga.title}
          image={manga.image_main}
        />
       
      ))} */}
    </div>
  );
}

export default AllMangas;
