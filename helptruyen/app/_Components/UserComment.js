import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteComment } from "../_lib/actions";

function UserComment({ content, user, id, ChapterId, ChapId, session, userId }) {
  return (
    <div className="py-2 ">
      <div className="flex justify-between">
        <div className="font-bold">{user}</div>
        { +session?.user.userId === userId &&
        <form action={() => deleteComment(id, ChapterId, ChapId)} className="pr-4 pt-1">
          <input value={id} readOnly hidden />
          <button >
            <TrashIcon className="w-5 h-5 text-black cursor-pointer hover:text-red-600" />
          </button>
        </form>
        }
      </div>

      <div>{content}</div>
      <div className="h-px bg-black" />
    </div>
  );
}

export default UserComment;
