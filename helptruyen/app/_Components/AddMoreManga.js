import { PlusIcon } from "@heroicons/react/24/outline"
import { createManga } from "../_lib/actions"

function AddMoreManga() {
    return (
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
              <div className="font-medium text-2xl">Thêm trang</div>
            </button>
          </form>
        </div>
    )
}

export default AddMoreManga
