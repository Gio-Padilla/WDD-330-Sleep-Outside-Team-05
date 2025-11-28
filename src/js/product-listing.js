import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

await loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');

const myList = new ProductList(category, dataSource, listElement);
myList.init();

async function initSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  if (searchQuery) {
    const products = await dataSource.searchProducts(searchQuery);
    myList.renderList(products);
  }
}

initSearch();