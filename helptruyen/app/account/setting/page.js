import InputFile from "@/app/_Components/InputFile";
import { updateImageSetting, updateSetting } from "@/app/_lib/actions";
import { getSetting } from "@/app/_lib/data-service";
import Image from "next/image";

async function page() {
  const setting = await getSetting();
  return (
    <>
      <div className="mb-5 text-2xl font-bold ">Setting</div>
      <table className="border-collapse border border-gray-400 ...">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 ">Page Size</th>
            <th className="border border-gray-300 p-2 ">Collapsed Num Words</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 ">
              <form action={updateSetting.bind(null,"page_size")}>
                <input defaultValue={setting.page_size} name="title" id="title" className="p-5" />
                <button
                  type="submit"
                  className="border border-blue-50 bg-blue-50 text-white transition-all duration-300 hover:bg-blue-600 hover:text-black cursor-pointer h-full p-5"
                >
                  submit
                </button>
              </form>
            </td>
            <td className="border border-gray-300 ">
              {" "}
              <form action={updateSetting.bind(null,"collapsed_numWords")}>
                <input
                  defaultValue={setting.collapsed_numWords} name="title" id="title"
                  className="p-5"
                />
                <button
                  type="submit"
                  className="border border-blue-50 bg-blue-50 text-white transition-all duration-300 hover:bg-blue-600 hover:text-black cursor-pointer h-full p-5"
                >
                  submit
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="my-5 text-2xl font-bold ">Setting Image</div>
      <div className="flex gap-10">
        <div>
          <Image
            src={setting.background_start || undefined}
            width={492}
            height={272}
            alt="anotherbg"
            className="object-cover"
          />
          <InputFile
           action={updateImageSetting.bind(null, "background_start")}
            detail="ảnh"
            id={1}
            name="file-input1"
          />
        </div>
        <div>
          <Image src={setting.image_start} width={160} height={240} alt="123" />

          <InputFile
             action={updateImageSetting.bind(null, "image_start")}
            detail="ảnh"
            id={1}
            name="file-input2"
          />
        </div>
        <div>
          <Image src={setting.image_avarta} width={160} height={240} alt="123" />

          <InputFile
           action={updateImageSetting.bind(null, "image_avarta")}
            detail="ảnh"
            id={1}
            name="file-input3"
          />
        </div>
      </div>
    </>
  );
}

export default page;
