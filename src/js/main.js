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
}

init();

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#product-search-form");
  const searchInput = document.querySelector("#search-input");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) return;

      window.location.href = `/product_listing/index.html?search=${encodeURIComponent(query)}`;
    });
  }
});