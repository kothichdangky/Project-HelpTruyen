import { auth } from "../_lib/auth";
import { getMangasUser } from "../_lib/data-service";
import Post from "./Post";

async function PostList() {
  const session = await auth();
  const manga = await getMangasUser(session.user.userId);

  return (
    <div className="grid lg:grid-cols-6 grid-cols-4 gap-4">
      {manga.map((manga) => (
        <Post
          href={`account/detail/${manga.id}`}
          ondelete={true}
          id={manga.id}
          key={manga.id}
          name={manga.title}
          image={manga.image_main}
        />
      ))}
    </div>
  );
}

export default PostList;
