import Spinner from "@/app/_Components/Spinner";

function loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3">
      <Spinner />
      Loading....
    </div>
  );
}

export default loading;
