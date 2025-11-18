import { getLocalStorage } from "./utils.mjs";

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

    displayOrderTotals() {
        const cartTotalElement = document.querySelector(`#${this.outputElement} .cart-total`);
        const taxElement = document.querySelector(`#${this.outputElement} .cart-tax`);
        const shippingElement = document.querySelector(`#${this.outputElement} .cart-shipping`);
        const priceElement = document.querySelector(`#${this.outputElement} .cart-final-price`);

        cartTotalElement.textContent = this.itemTotal;
        shippingElement.textContent = this.shipping;
        taxElement.textContent = this.tax;
        priceElement.textContent = this.orderTotal;
    }

    calculateItemSummary() {
        this.itemTotal = this.returnCartSubtotal();
        this.shipping = this.getShipping();
        this.tax = this.getTax();
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        this.displayOrderTotals();
    }
}