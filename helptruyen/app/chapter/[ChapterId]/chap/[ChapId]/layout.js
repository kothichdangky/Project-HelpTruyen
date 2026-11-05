import ButtonInManga from "@/app/_Components/ButtonInManga";

export default async function RootLayout({ children, params }) {

  return (
    <div className="bg-gray-100 mt-5 pb-5">
    <div className="lg:mt-30 mt-30 pt-5">
      {children}
    </div>
    </div>
  );
}
