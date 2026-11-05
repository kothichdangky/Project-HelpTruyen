import { PlusIcon } from "@heroicons/react/24/outline";
import { createManga } from "../_lib/actions";
import { Suspense } from "react";
import Spinner from "../_Components/Spinner";
import PostList from "../_Components/PostList";
import YourAccount from "../_Components/YourAccount";
import { auth } from "../_lib/auth";

async function page() {
    const session = await auth();

  return (
    <div>
      <div className="mb-5 ">
        <div className="text-2xl font-bold ">Tài khoản</div>
        <YourAccount session={session} />
      </div>

      <div className="mb-5 flex justify-between">
        <div className="text-2xl font-bold ">Đăng truyện</div>
        <div className={`flex`}>
          <form action={createManga}>
            <input
              type="hidden"
              name="title"
              id="title"
              defaultValue="Tên truyện"
            />
            <input
              type="hidden"
              name="author"
              id="author"
              defaultValue="Tên tác giả"
            />
            <input
              type="hidden"
              name="description"
              id="description"
              defaultValue="Sơ lược về cốt truyện"
            />
            <button className="mt-1 cursor-pointer flex items-center hover:text-blue-50">
              <PlusIcon className="w-6 h-6" />
              <div className="font-medium text-2xl">Tạo truyện</div>
            </button>
          </form>
        </div>
      </div>

      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}

export default page;
