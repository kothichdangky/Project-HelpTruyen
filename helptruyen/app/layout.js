import HeaderServer from "./_Components/HeaderServer";
import { auth } from "./_lib/auth";
import "./_styles/globals.css";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / HelpTruyen",
    default: "Home / HelpTruyen",
  },
  description: "chỗ đọc truyện",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <>
    
      {/* <Header session={session} /> */}
      <HeaderServer session={session}/>
      <body className="relative">{children}</body>
    </>
  );
}
