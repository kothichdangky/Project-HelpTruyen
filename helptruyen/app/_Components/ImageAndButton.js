"use client";
import { useRouter } from "next/navigation";
import InputFile from "./InputFile";
import InputTransform from "./InputTransform";
import { useActionState } from "react";

function ImageAndButton({ session, action, actionName }) {
  const route = useRouter();
  const [state, dispatchAction] = useActionState(actionName, {error: null})
  

  async function handleClick(formData) {
    await action(formData);
    route.refresh();
  }

  async function handleClickName(formData) {
     dispatchAction(formData);
    route.refresh();
  }
  return (
    <>
    <div>
      <img
        className="h-16 rounded-full"
        src={session.user.image}
        alt={session.user.name}
        referrerPolicy="no-referrer"
      />

      <InputFile action={handleClick} detail="avarta" name="file-input" />
    </div>
     <div className="mt-12">
        Tên tài khoản{" "}
        <span className="text-xs font-bold">
        {
          state.error ? <p className="text-red-600">{state.error}</p> : <p className="">tên tài khoản là để đăng nhập</p>
        }
        </span>
        <div className="flex items-center">
          <InputTransform
            action={handleClickName}
            name={session.user.name}
            id={session.user.userId}
            style="w-45 h-7.5 p-1"
            text="font-medium text-xl"
            buttonStyle="mt-2"
          />
        </div>
      </div>

    </>
  );
}

export default ImageAndButton;
