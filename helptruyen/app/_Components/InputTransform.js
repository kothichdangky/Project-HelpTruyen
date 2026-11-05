"use client";
import { useOptimistic, useState, useTransition } from "react";
import PencilButton from "./PencilButton";

function InputTransform({ name, id, style, text, action, buttonStyle, type, margin, detailId, setupId  }) {
  const [input, setInput] = useState(false);
  const [isPending, startTransititon] = useTransition()
  const [optimisticName, setOptimisticName] = useOptimistic(name)

  async function handleInput(e) {
    if (input === false) {
      e.preventDefault();
      setInput(true);
    }
    if (input === true) {
      await new Promise((res) => setTimeout(res, 100));
      setInput(false);
    }
  }

  async function updateName(formData) {
  const title = formData.get("title");
    setOptimisticName(title)
    startTransititon(()=>action(formData));
  }

  return (
    <>
      <div className={`flex ${margin} `}>
        <form className="flex" action={updateName}>
          <input id="id" name="id" defaultValue={id} hidden />
          <input id="detailId" name="detailId" defaultValue={detailId} hidden />
          <input type="text" defaultValue={setupId} name="setupId" hidden />
          {input ? (
            <>
              <input
                className={`outline outline-offset-2 ${style}`}
                type={type}
                min="0"
                id="title"
                name="title"
                defaultValue={optimisticName}
              />
            </>
          ) : (
            <>
              <div className={`${text} `}>{optimisticName}</div>
            </>
          )}
          <PencilButton buttonStyle={buttonStyle} onClick={handleInput}/>
        </form>
         
      </div>
    </>
  );
}

export default InputTransform;
