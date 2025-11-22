import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function packageItems(items) {
    const itemList = items.map(item => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity
        }
    });
    return itemList
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
    constructor (key, outputId) {
        this.key = key;
        this.outputElement = outputId;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    returnCartSubtotal() {
        let subtotal = 0;
        this.list.forEach(item => {
        subtotal += item.FinalPrice * item.quantity;
      });

      subtotal = parseFloat(subtotal.toFixed(2));
      return subtotal;
    }

    getCartQuantity() {
        let quantity = 0;
        this.list.forEach(item => {
            quantity += item.quantity;
        });
        return quantity;
    }

    getShipping() {
        const shippingPrice = this.getCartQuantity() * 2 + 8;
        return shippingPrice
    }

    getTax() {
        const tax = 0.06;
        const checkoutTax = parseFloat((this.itemTotal * tax).toFixed(2));
        return checkoutTax;
    }

    calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = this.getTax()
        this.shipping = this.getShipping()
        this.itemTotal = this.returnCartSubtotal()
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const cartTotalElement = document.querySelector(`#${this.outputElement} .cart-total`);
        const taxElement = document.querySelector(`#${this.outputElement} .cart-tax`);
        const shippingElement = document.querySelector(`#${this.outputElement} .cart-shipping`);
        const priceElement = document.querySelector(`#${this.outputElement} .cart-final-price`);

        cartTotalElement.textContent = this.itemTotal.toFixed(2);
        shippingElement.textContent = this.shipping.toFixed(2);
        taxElement.textContent = this.tax.toFixed(2);
        priceElement.textContent = this.orderTotal.toFixed(2);
    }

    calculateItemSummary() {
        this.itemTotal = this.returnCartSubtotal();
        this.shipping = this.getShipping();
        this.tax = this.getTax();
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        this.displayOrderTotals();
    }

    async checkout() {
        const formElement = document.getElementById("checkout-form");
        const formDataJSON = formDataToJSON(formElement);

        formDataJSON.orderDate = new Date().toISOString();
        formDataJSON.items = packageItems(this.list);
        formDataJSON.orderTotal = this.orderTotal;
        formDataJSON.tax = this.tax;
        formDataJSON.shipping = this.shipping;

        console.log(formDataJSON);

        try {
            const response = await services.checkout(formDataJSON);
            console.log(response);
            if (response.message === "Order Placed") {
                setLocalStorage("so-cart", []);
                window.location.href = "/checkout/success.html";
            }
        } catch (err) {
            console.log(err);
        }
    }
}
