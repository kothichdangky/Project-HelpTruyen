import ButtonAddInSetup from "@/app/_Components/ButtonAddInSetup";
import ImageList from "@/app/_Components/ImageList";
import InputTransform from "@/app/_Components/InputTransform";
import { updateDetailChapter } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getChapter, getImageChapter } from "@/app/_lib/data-service";

async function page({ params }) {
  const { DetailId, SetupId } = await params;
  const session = await auth();

  const chapter = await getChapter(SetupId);
  const chapterImage = await getImageChapter();

  if (+session.user.userId !== chapter.mangas.user_id) {
    return <h1>Đây không phải truyện của bạn</h1>;
  }

  return (
    <>
      <div className="flex my-5">
        <div className={` mt-3 flex`}>
          <div className="text-2xl flex">
            <span className="font-medium mr-1"> Chương </span>
            <InputTransform
              name={chapter.number}
              id={SetupId}
              style="w-15 font-medium "
              text="font-medium"
              action={updateDetailChapter.bind(null, "number")}
              type="number"
            />
          </div>
        </div>
        <div className={`mx-4 mt-3 flex`}>
          <InputTransform
            name={chapter.name}
            id={SetupId}
            style="w-28"
            text="font-medium text-2xl"
            action={updateDetailChapter.bind(null, "name")}
          />
        </div>
        <div className={` absolute flex right-33`}>
          <ButtonAddInSetup
            chapterImage={chapterImage}
            id={+SetupId}
            detailId={+DetailId}
          />
        </div>
      </div>
      <ImageList
        chapterImage={chapterImage}
        id={+SetupId}
        detailId={+DetailId}
      />
    </>
  );
}

export default page;
