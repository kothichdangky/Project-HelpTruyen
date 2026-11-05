import Image from "next/image";
import TextExpander from "@/app/_Components/TextExpander";
import Link from "next/link";

function BackGround({ image, title, name, collapsedNumWords, mangas_id }) {
  // href={`chapter/${manga.mangas_id}`}
  return (
    <div
      className="lg:-translate-y-75
        -translate-y-53 md:-translate-y-51  min-w-full  bg-linear-[0deg,#111111_20%,rgb(250_250_250/0%)_70%]"
    >
      <div className="lg:ml-30 ml-3 mr-3 flex">
        <div className="relative h-76 w-50 max-[1100px]:hidden ">
          <Image src={image} fill className="  pb-4" alt="notbg" />
        </div>
        <div className="text-4xl  text-white-50 pt-35 pl-4">
          <Link href={`chapter/${mangas_id}`} className="font-bold"> {name} </Link>
          <div
            className="lg:text-[16px] text-[12px] pb-3 font-normal pt-1
 text-white-50 lg:w-4xl lg:h-26.5"
          >
            <TextExpander
              collapsedNumWords={collapsedNumWords}
              expandButtonText="Xem thêm"
              collapseButtonText="Ẩn bớt"
            >
              {title}
            </TextExpander>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackGround;
