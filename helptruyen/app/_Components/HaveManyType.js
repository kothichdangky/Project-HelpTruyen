"use client";
import MinusButton from "./MinusButton";
import Type from "./Types";
import { useTransition } from "react";

function HaveManyType({ type, id, edit, handleDelete }) {
  const [isPending, startTransititon] = useTransition();
  function DeleteType() {
    startTransititon(() => handleDelete(type.id));
  }

  return (
    <div className="flex" key={type.id}>
      <Type edit={edit} id={type.id} param_id={id}>
        {type.types.title}
      </Type>
      {edit && <MinusButton onDelete={DeleteType} key={type.id} isPending={isPending} />}
      
    </div>
  );
}

export default HaveManyType;
