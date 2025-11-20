import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cardNumber").value = 1234123412341234;
    document.getElementById("code").value = 123;
    document.getElementById("expiration").value = "8/28";
    document.getElementById("zip").value = "68137";
});

const checkoutProcess = new CheckoutProcess("so-cart", "price-details");
checkoutProcess.init();

loadHeaderFooter();

document.querySelector("#zip").addEventListener("blur", checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

// listening for click on the button
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutProcess.checkout();
});