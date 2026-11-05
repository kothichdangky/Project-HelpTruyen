"use client";
import {  useActionState, useTransition } from "react";
import SignInButton from "../_Components/SignInButton";
import { signInWithUserAccount } from "../_lib/actions";

export default function Page() {
  const [state, dispatchAction] = useActionState(signInWithUserAccount, {error: null})

  // bình thường thì cần dùng với startTransition nhưng ở đây không cần nhưng vẫn dùng cho biết
  const [isPending, startTransition ] = useTransition()
  function formAction(formData){
    startTransition(()=> dispatchAction(formData))
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">
        Sign in
      </h2>

      <form action={formAction} className="flex flex-col gap-2">
        {
          state.error && <p className="text-red-600">{state.error}</p>
        }
      
        <div>
          <label className="text-[16px] font-medium"> Tên tài khoản </label>
          <div>
            <input name="Username" className="outline p-2 w-84" />
          </div>
        </div>
        <div>
          <label className="text-[16px] font-medium" > Mật khẩu </label>
          <div>
            <input name="Password" type="password" className="outline p-2 w-84" autoComplete="current-password" />
          </div>
        </div>
        <button disabled={isPending} type="submit" className={`p-3 ${isPending ? 'bg-blue-500 text-white-50 cursor-progress' : 'bg-blue-50'}  cursor-pointer text-[16px] font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white-50`}>{isPending ? "Đăng nhập..." : "Đăng nhập"} </button>
      
      </form>

      
    </div>
  );
}
