"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";

function Star() {
  const [follow, setFollow] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFollow(!follow)}
    >
      <StarIcon
        className={`w-6 h-6 cursor-pointer ${
          follow ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
        }`}
      />
    </button>
  );
}

export default Star;