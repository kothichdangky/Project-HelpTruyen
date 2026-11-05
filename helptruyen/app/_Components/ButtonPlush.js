"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";

function ButtonPlush({ name, onClick }) {
   const {pending} =  useFormStatus()
  return (
    <div className="flex relative">
        {pending &&<span className="absolute text-xl right-50 top-2 cursor-progress  ">  updating... </span>}
         
      <button 
        onClick={onClick}
        type="submit"
        className="mt-1 cursor-pointer flex items-center hover:text-blue-50"
      >
        <PlusIcon className="w-6 h-6" />
        <div className="font-medium text-2xl">Thêm {name}</div>
      </button>
    </div>
  );
}

export default ButtonPlush;
