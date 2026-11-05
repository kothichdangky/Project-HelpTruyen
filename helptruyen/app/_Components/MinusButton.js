"use client";

import { MinusCircleIcon } from "@heroicons/react/16/solid";

function MinusButton({onDelete, isPending}) {
      
    return (
        <button onClick={onDelete} > 
        { !isPending ?
          <MinusCircleIcon  className="h-6 w-6 text-red-600 cursor-pointer hover:text-red-400"/> :"deleting..."
        }
        </button>
    )
}

export default MinusButton
