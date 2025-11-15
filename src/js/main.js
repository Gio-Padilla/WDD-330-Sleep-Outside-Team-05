import { loadHeaderFooter, dates } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();
    dates();
}

init();