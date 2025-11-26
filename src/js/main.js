import { loadHeaderFooter, dates } from "./utils.mjs";
import Alert from "./alert.js"; 

document.addEventListener('DOMContentLoaded', () => {
    new Alert();
});

export async function init() {
    await loadHeaderFooter();
    dates();
}

init();