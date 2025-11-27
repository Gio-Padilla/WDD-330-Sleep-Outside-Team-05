import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ExternalServices("tents");
const productId = getParam('product');

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

// Moved addProductToCart to ProductDetails.mjs as asignment stated

loadHeaderFooter();