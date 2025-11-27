import { loadHeaderFooter, dates } from "./utils.mjs";
import Alert from "./alert.js"; 

<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    new Alert();
});

export async function init() {
    await loadHeaderFooter();
    dates();
=======
async function init() {
  await loadHeaderFooter();
  dates && dates();
>>>>>>> 32a01781ef53b46b20fb9551a64528499134925f
}

init();