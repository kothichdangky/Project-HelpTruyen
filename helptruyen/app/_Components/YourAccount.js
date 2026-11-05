import Image from "next/image";
import InputFile from "./InputFile";
import { auth } from "../_lib/auth";
import { updateImageUser, updateNameUser } from "../_lib/actions";
import InputTransform from "./InputTransform";
import ImageAndButton from "./ImageAndButton";
// import { useRouter } from "next/navigation";

function YourAccount({ session }) {


  return (
    <div className="flex gap-10">
        <ImageAndButton session={session} action={updateImageUser} actionName={updateNameUser} />
    </div>
  );
}

export default YourAccount;
