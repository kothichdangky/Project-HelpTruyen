"use client";
import { useOptimistic, useTransition } from "react";
import Type from "./Types";
import { deleteType } from "../_lib/actions";
import MinusButton from "./MinusButton";
import HaveManyType from "./HaveManyType";

function TypeList({ mangatype, id, edit }) {
  const [useoptimisticManga, useoptimisticDelete] = useOptimistic(
    mangatype,
    (curType, typeId) => {
      return curType.filter((type) => type.id !== typeId);
    },
  );

  async function handleDelete(mangaId) {
    useoptimisticDelete(mangaId);
    await deleteType(mangaId, id);
  }

  return (
    <>
      {useoptimisticManga?.map((type) =>
        +id === type.manga_id ? (
          <HaveManyType type={type} id={id} edit={edit} key={type.id} handleDelete={handleDelete}/>
        ) : (
          ""
        ),
      )}
    </>
  );
}

export default TypeList;
