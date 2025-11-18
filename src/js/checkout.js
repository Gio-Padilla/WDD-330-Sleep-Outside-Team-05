import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";


const checkoutProcess = new CheckoutProcess("so-cart", "price-details");
checkoutProcess.init();

loadHeaderFooter();