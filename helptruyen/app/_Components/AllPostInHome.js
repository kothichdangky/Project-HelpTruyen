import { formatDistanceFromNow } from "@/public/helpers";
import { getNewChapterAndDate } from "../_lib/data-service";
import Post from "./Post";

async function AllPostInHome({ id, href, name, image }) {
  const chapter = await getNewChapterAndDate(id);
  return (
    <div>
      {!chapter ? null : (
        <Post
          key={id}
          href={href}
          name={name}
          image={image}
          chapter={chapter?.number}
          hour={formatDistanceFromNow(chapter?.created_at.split(" ").join("T"))}
        />
      )}
    </div>
  );
}

export default AllPostInHome;
