"use client";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import ButtonImage from "./ButtonImage";

function InputFile({ action, detail, id, name }) {
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fileInput = document.getElementById(`${name}`);
    const fileInputLabel = document.getElementById(`${name}-label`);

    fileInput.addEventListener("change", () => {
      if (fileInput.value === "") {
        fileInputLabel.value;
        count;
      } else {
        const realPathArray = fileInput.value.split("\\");
        fileInputLabel.innerHTML = realPathArray[realPathArray.length - 1];
        setDisabled(false);
      }
    });
    return () => {
      fileInputLabel.innerHTML = `Điều chỉnh ${detail}`;
      setDisabled(true);
    };
  }, [count]);

  function handleCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <form action={action}>
        <input id="id" name="id" defaultValue={id} hidden />
        <div className="flex items-center my-2">
          <div className="flex hover:text-blue-50 items-center">
            <label htmlFor={name} className="cursor-pointer">
              <PencilSquareIcon className="h-8 w-8 " />
            </label>
            <label
              id={`${name}-label`}
              htmlFor={name}
              className="cursor-pointer"
            >
              <div className=""></div>
            </label>
          </div>
          <input
            type="file"
            hidden
            id={name}
            name="image"
            className="mx-2"
            accept="image/png, image/jpeg"
          />
        </div>
        <div onClick={handleCount}>
          <ButtonImage disable={disabled} />
        </div>
      </form>
    </div>
  );
}

export default InputFile;
