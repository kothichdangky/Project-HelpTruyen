"use client";

import { useOptimistic, useTransition } from "react";
import SettingImage from "./SettingImage";
import { deleteImageChapter } from "../_lib/actions";

function ImageList({ chapterImage, id, detailId }) {
  const [optimisticDel, setOptimisticDel] = useOptimistic(
    chapterImage,
    (curImg, ImgId) => curImg.filter((img) => img.id !== ImgId),
  );
  const [isPending, startTransititon] = useTransition()

  function handleDelete(setId) {
    startTransititon(()=> setOptimisticDel(setId))
    deleteImageChapter(setId, detailId);
  }
  return (
    <div className="grid grid-cols-6 gap-4">
      {" "}
      {optimisticDel
        .filter((img) => img.chapter_id === +id)
        .map((img) => (
          <SettingImage
            chapterImage={chapterImage}
            key={img.id}
            number={img.number}
            img={img.image}
            inputId={img.id}
            id={img.id}
            detailId={detailId}
            setupId={id}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
}

export default ImageList;
