
import { PencilIcon } from "@heroicons/react/16/solid";
import UserComment from "./UserComment";
import { insertComment } from "../_lib/actions";

 function Comment({ show, handleShow, comments, session , ChapterId, ChapId }) {
  const action = insertComment.bind(null, ChapterId, ChapId);
  return (
    <>
      <div
        onClick={handleShow}
        className={`${!show ? "" : "fixed top-21 min-h-screen bg-black-50/50 z-20 h w-screen "}`}
      ></div>

      <div
        className={`scrollbar-thin overflow-auto  transition-all delay-150 duration-200 ${!show ? "-right-120" : "right-0"}  fixed h-screen w-112.5 top-21 bg-gray-100 z-20 `}
      >
        <div className="p-6 ">
          <div className="font-bold text-2xl">Bình luận</div>
          {
            comments.map((cmt)=> ( <UserComment key={cmt.id} id={cmt.id} content={cmt.content} user={cmt.users.fullName} ChapterId={ChapterId} ChapId={ChapId} userId={cmt.users_id}  session={session}/>))
          }
          <div className="h-45 bg-gray-10"></div>
        </div>

          { session ?
          <form action={action} className="fixed -bottom-1">
          <textarea
            type="text"
            id="fname"
            name="comment"
            placeholder="nhập bình luận..."
            className=" mx-1 ml-2 bg-white-50 py-2 px-7 w-108 h-27.5 resize-none"
          />
          <button
          type="submit"
            className={` transition-all delay-150 duration-200 ${show ? "right-7" : "-right-10" } fixed bottom-4  p-2 bg-blue-50 
          `}
          >
            <PencilIcon className="h-4  w-4  " />
          </button>
        </form>:  
        
        <div className="text-center">Cần đăng nhập đê bình luận </div>  }
        
      </div>
    </>
  );
}

export default Comment;
