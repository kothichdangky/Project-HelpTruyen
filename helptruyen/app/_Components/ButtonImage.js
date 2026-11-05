import { useFormStatus } from "react-dom";

function ButtonImage({disable}) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        disabled={pending || disable}
        className=" outline-black-50 bg-black-50  text-white-50 px-2 py-1 outline-solid rounded-xl cursor-pointer transition-all disabled:cursor-not-allowed
 duration-500 hover:bg-gray-50 hover:outline-gray-100 hover:text-black-50 mr-2"
      >
        Submit
      </button>
      {pending && "updating..."}
    </>
  );
}

export default ButtonImage;
