import { getMangaformSearch } from "../_lib/data-service"
import Header from "./Header"

async function HeaderServer({session, params}) {
    // const chapters= await getMangaformSearch()
    return (
        <Header session={session} />
    )
}

export default HeaderServer
