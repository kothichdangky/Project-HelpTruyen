"use client";
import { useEffect, useState } from "react";
import ButtonPlush from "./ButtonPlush";
import { insertImageChapter } from "../_lib/actions";

function ButtonAddInSetup({ chapterImage, id, detailId }) {
  const chapterArray = chapterImage
    .filter((chap) => chap.chapter_id === id)
    .map((chap) => chap.number);

  const [num, setNum] = useState(Math.max(0, ...chapterArray));

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=> setNum(Math.max(0, ...chapterArray)),[chapterArray])

  function handleNum() {
    setNum((num) => num + 1);
  }
  return (
    <form action={insertImageChapter}>
      <input value={num} hidden readOnly name="number" />
      <input defaultValue={id} hidden name="setId" />
      <input defaultValue={detailId} hidden name="id" />
      <ButtonPlush name="trang" onClick={handleNum} />
    </form>
  );
}

export default ButtonAddInSetup;
