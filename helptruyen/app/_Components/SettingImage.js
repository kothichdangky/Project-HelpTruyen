"use client";
import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useOptimistic, useState } from "react";
import { deleteImageChapter, updateImageChapter, updateImageNumber } from "../_lib/actions";
import InputTransform from "./InputTransform";

function SettingImage({ number, img, id, detailId, inputId, onDelete, setupId }) {
  const [input, setInput] = useState(false);
  
  function handleInput() {
    setInput(!input);
  }

  return (
    <div className="relative">
      <Image src={img} width={160} height={226} alt="hello" />
      <form
        action={updateImageChapter}
        className="absolute top-2 left-2 p-2 bg-white-50 rounded-4xl transition-all hover:text-blue-50 hover:px-4 cursor-pointer"
      >
        <input
          type="file"
          id={inputId}
          name="image"
          onChange={(e) => e.target.form?.requestSubmit()}
          hidden
        />
        <input type="text" defaultValue={id} name="id" hidden />
        <input type="text" defaultValue={detailId} name="detailId" hidden />
        <label htmlFor={inputId}>
          <PencilIcon className=" w-4 h-4 " />
        </label>
      </form>
{/* absolute top-2 left-28 bg-red-600 p-2 rounded-4xl transition-all hover:text-white-50 hover:left-24 hover:px-4 cursor-pointer */}
      <button onClick={()=>onDelete(id)} className="absolute top-2 left-28 bg-red-600 p-2 rounded-4xl transition-all hover:text-white-50 hover:left-24 hover:px-4 cursor-pointer">
        <TrashIcon className=" w-4 h-4 " />
      </button>

      <InputTransform name={number} id={id}  action={updateImageNumber} margin="ml-16 mt-2" style="w-15 text-xl" type="number" detailId={detailId} setupId={setupId} text="text-xl" />
    
    </div>
  );
}

export default SettingImage;
