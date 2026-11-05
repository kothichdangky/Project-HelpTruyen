import { PencilIcon } from "@heroicons/react/24/outline";

import { useFormStatus } from "react-dom";

function PencilButton({onClick, buttonStyle}) {
      const {pending} = useFormStatus();

    return (
         <button
            className={`${buttonStyle} cursor-pointer mt-1 flex mx-2 items-center`}
            onClick={onClick}
            disabled={pending}
          >
            <PencilIcon className={` h-5.5 w-5.5 transition-all duration-500 hover:text-blue-50 `} />
             {pending? <div className="text-xs" >
              updating...
            </div> : ""}
          </button>
    )
}

export default PencilButton
