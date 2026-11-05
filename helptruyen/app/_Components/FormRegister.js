"use client";

import { useActionState, useEffect } from "react";
import { registerUserAccount } from "../_lib/actions";

function FormRegister() {
  const [state, displayAction, isPending] = useActionState(
    registerUserAccount,
    { error: null },
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Register</h2>

      <div>{state.error && <p className="w-80 break-words text-red-600">{state.error}</p>}</div>
      <div>
        <form action={displayAction} className="flex flex-col gap-2">
          <div>
            <label className="text-[16px] font-medium"> Tên tài khoản </label>
            <div>
              <input name="Username" className="outline p-2 w-84" />
            </div>
          </div>
          <div>
            <label className="text-[16px] font-medium"> Mật khẩu </label>
            <div>
              <input
                name="Password"
                type="password"
                className="outline p-2 w-84"
                autoComplete="current-password"
              />
            </div>
          </div>
          <div>
            <label className="text-[16px] font-medium">
              {" "}
              Nhập lại mật khẩu{" "}
            </label>
            <div>
              <input
                name="RedoPassword"
                type="password"
                className="outline p-2 w-84"
                autoComplete="current-password"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`p-3 ${isPending ? "bg-blue-500 text-white-50 cursor-progress" :"bg-blue-50"}  cursor-pointer text-[16px] font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white-50`}
          >
            {" "}
           {isPending ? "Tạo tài khoản..." : "Tạo tài khoản"} 
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormRegister;
