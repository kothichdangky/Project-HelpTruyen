import { getSetting } from "@/app/_lib/data-service";

export async function constants() {
    const setting = await getSetting();

    const pageSize = +setting.page_size
    const collapsedNumWords = setting.collapsed_numWords
    const backgroundStart = setting.background_start
    const imageStart = setting.image_start
    const imageAvarta = setting.image_avarta

    return {pageSize, collapsedNumWords, backgroundStart, imageStart, imageAvarta}
}