import { constants } from "../_constants/page";
import { auth } from "../_lib/auth";
import { getManga, getTypesForManga } from "../_lib/data-service";
import LeftBackground from "./LeftBackground";

async function SuspenseLeft({ ChapterId }) {
  const session = await auth();
  const { collapsedNumWords } = await constants();
  const [type, manga] = await Promise.all([
    getTypesForManga(),
    getManga(ChapterId),
  ]);

  return (
    <div>
      <LeftBackground
        id={ChapterId}
        typesManga={type}
        manga={manga}
        collapsedNumWords={collapsedNumWords}
        session={session}
      />
    </div>
  );
}

export default SuspenseLeft;
