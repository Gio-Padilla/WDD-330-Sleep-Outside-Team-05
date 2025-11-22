import { loadHeaderFooter, dates } from "./utils.mjs";

export async function init() {
    await loadHeaderFooter();
    dates();
}

init();