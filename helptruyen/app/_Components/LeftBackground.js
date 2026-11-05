"use client";
import Image from "next/image";
import Avarta from "./Avarta";
import TextExpander from "@/app/_Components/TextExpander";
import Star from "./Star";
import { PlusCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import InputTransform from "./InputTransform";
import { useParams } from "next/navigation";
import {
  insertTypeForManga,
  updateDetailManga,
  updateImage,
} from "../_lib/actions";
import TypeList from "./TypeList";
import InputFile from "./InputFile";

function LeftBackground({ id, edit = false, manga, types, typesManga, collapsedNumWords, session }) {

  const [select, setSelect] = useState(false);
  const [textarea, setTextarea] = useState(false);

  function handleSelect() {
    setSelect(!select);
  }

  function handleTextarea() {
    setTextarea(!textarea);
  }

  return (
    <>
      <div className="flex items-center gap-15 ">
        <div>
          <Image
            src={manga.image_background}
            width={692}
            height={272}
            alt="anotherbg"
          />
          {edit && (
            <InputFile
              action={updateImage.bind(null, "image_background")}
              detail="Background"
              id={id}
              name="file-input"
            />
          )}
        </div>
        {edit ? (
          <div className="mt-15 max-w-40">
            <Image src={manga.image_main} width={160} height={240} alt="123" />
            {edit && (
              <InputFile
                action={updateImage.bind(null, "image_main")}
                detail="ảnh"
                id={id}
                name="file-input2"
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="lg:flex place-content-between py-2 max-w-full">
        <div>
          {!edit ? (
            <div className="text-4xl font-bold flex">
              {manga.title}
             
            </div>
          ) : (
            ""
          )}

          <div className="flex gap-2">
            <strong>Tác giả:</strong>
             {edit ? (
            <InputTransform
              action={updateDetailManga.bind(null, "author")}
              id={id}
              name={manga.author}
              style="w-25"
            />)  : <div className={` `}>{manga.author}</div> }
          </div>
        </div>
        {!edit ? (
          <div className="flex items-center ">
            <Avarta img={manga.users?.image} />
            <div className="pl-2 font-medium text-[16px]">{manga.users?.fullName}</div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <TypeList mangatype={typesManga} id={id} edit={edit} />
        {select ? (
          <>
            <form action={insertTypeForManga} className="mt-1 ">
              <input id="id" name="id" defaultValue={id} hidden />
              <label htmlFor="manga" className="cursor-pointer"></label>
              <select id="manga" name="type" className="cursor-pointer">
                {types.map((type) => (
                  <option value={type.id} name="type_id" key={type.id}>
                    {type.title}
                  </option>
                ))}
              </select>
              <input
                type="submit"
                value="Submit"
                className="outline-black-50 bg-black-50 text-white-50 mx-1 px-2 outline-solid rounded-xl cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:outline-gray-100 hover:text-black-50"
              />
            </form>
          </>
        ) : (
          ""
        )}

        {edit ? (
          <button onClick={handleSelect}>
            <PlusCircleIcon className="h-6 w-6  cursor-pointer hover:text-blue-50" />
          </button>
        ) : (
          ""
        )}
      </div>

      <div>
        {edit ? (
          <div className="flex">
            <div className="text-2xl font-bold">Nội dung: </div>
            <button onClick={handleTextarea}>
              <PencilSquareIcon className="h-8 w-8 cursor-pointer hover:text-blue-50" />
            </button>
          </div>
        ) : (
          ""
        )}
        {textarea ? (
          <form action={updateDetailManga.bind(null, "description")}>
            <input id="id" name="id" defaultValue={id} hidden />
            <textarea
              className="w-full outline-black-50 outline-solid px-5"
              id="description"
              name="title"
              defaultValue={manga.description}
              rows="8"
              cols="50"
            ></textarea>
            <button
              type="submit"
              className=" outline-black-50 bg-black-50 text-white-50 px-2 py-1 outline-solid rounded-xl cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:outline-gray-100 hover:text-black-50"
            >
              Submit{" "}
            </button>
          </form>
        ) : (
          <TextExpander
            collapsedNumWords={collapsedNumWords}
            expandButtonText="Xem thêm"
            collapseButtonText="Ẩn bớt"
          >
            {manga.description}
          </TextExpander>
        )}
      </div>
    </>
  );
}

export default LeftBackground;
