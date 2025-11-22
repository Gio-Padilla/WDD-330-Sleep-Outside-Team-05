import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";



const checkoutProcess = new CheckoutProcess("so-cart", "price-details");
checkoutProcess.init();

loadHeaderFooter();

document.querySelector("#zip").addEventListener("blur", checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

// listening for click on the button
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutProcess.checkout();
});

function checkCartInputs() { // Used to create an error message informing the user it needs a valid response on that part of the form
    const form = document.getElementById("checkout-form");
    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
        // Create a <p> element under each input
        const errorP = document.createElement("p");
        errorP.classList.add("input-error");
        errorP.style.color = "red";
        errorP.style.fontSize = "0.9rem";
        errorP.style.margin = "-0.8rem 0 0 0";
        errorP.style.padding = "0 0 5px 0";
        errorP.textContent = input.dataset.error;
        errorP.style.display = "none"; // hidden by default
        input.insertAdjacentElement("afterend", errorP);

        // When input is invalid
        input.addEventListener("invalid", (e) => {
            errorP.style.display = "block";
        });

        // When input becomes valid again
        input.addEventListener("input", () => {
            if (input.checkValidity()) {
            errorP.style.display = "none";
            }
        });
    });
}

function testingInputs() { // Only run this to test the inputs

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("cardNumber").value = 1234123412341234;
        document.getElementById("code").value = 123;
        document.getElementById("expiration").value = "8/28";
        // document.getElementById("zip").value = "68137";
        // document.getElementById("fname").value = "Gio";
        // document.getElementById("lname").value = "Padilla";
        // document.getElementById("city").value = "Omaha";
        // document.getElementById("state").value = "NE";
        // document.getElementById("street").value = "123 West St";
    });
}

testingInputs();

checkCartInputs();