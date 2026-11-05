import SideNavigation from "../_Components/SideNavigation";
import { BrowserRouter } from "react-router";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <>


      <div className="m-30 grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation session={session} />
      <div className="py-1">
        <div>{children}</div>
      </div>
    </div>

    </>
  );
}
