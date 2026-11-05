import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
async function ButtonMove({
  children,
  color = "blue-50",
  textColor = "text-white-50",
  right = true,
  number,
  ChapterId,
  ChapId,
  bigNumber,
  prev,
  next,
}) {
  return (
    <div className="flex">
      {!right && (
        <Link
          href={
            number === 1
              ? `/chapter/48/chap/${ChapId}`
              : `/chapter/48/chap/${prev.id}`
          }
          className={`group flex items-center justify-center gap-2 
      rounded-xl bg-${color} ${textColor}
      px-5 py-3 font-bold shadow-sm transition-all duration-200
      hover:brightness-95 hover:shadow-md active:scale-95`}
        >
          <ChevronLeftIcon className="h-5 w-5 shrink-0" />
          <span>{children}</span>
        </Link>
      )}

      {right && (
        <Link
          href={
            number === bigNumber
              ? `/chapter/48/chap/${ChapId}`
              : `/chapter/48/chap/${next.id}`
          }
          className={`group flex items-center justify-center gap-2
      rounded-xl bg-${color} ${textColor}
      px-5 py-3 font-bold shadow-sm transition-all duration-200
      hover:brightness-95 hover:shadow-md active:scale-95`}
        >
          <span>{children}</span>
          <ChevronRightIcon className="h-5 w-5 shrink-0" />
        </Link>
      )}
    </div>
  );
}

export default ButtonMove;
