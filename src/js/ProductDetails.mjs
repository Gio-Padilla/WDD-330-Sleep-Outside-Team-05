import { getLocalStorage, setLocalStorage, notify } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    const renderTo = document.querySelector(".product-detail");
    this.renderProductDetails(this.product, renderTo);

    // Correct event binding — no need to pass product
    document.getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Use the stored product object
    const product = this.product;

    let cart = getLocalStorage("so-cart") || [];
    cart = Array.isArray(cart) ? cart : [cart];
    const existing = cart.find(item => item.Id === product.Id);

    if (existing) {
      // If found, increase quantity
      existing.quantity = (existing.quantity || 1) + 1;
      notify(`Quantity updated to ${existing.quantity}!`);
    } else {
      // If not found, add as a new item with quantity = 1
      // We have the "..." because we want to keep all the existing product fields add quantity without modifying the original product object.
      cart.push({...product, quantity: 1});
      notify("Added to cart!");
    }
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails(product, renderTo) {
    renderTo.querySelector("h3").textContent = product.Brand.Name;
    renderTo.querySelector("h2").textContent = product.NameWithoutBrand;

    const productImage = renderTo.querySelector("img");
    productImage.src = product.Images.PrimaryExtraLarge;;
    productImage.alt = product.NameWithoutBrand;

    renderTo.querySelector(".product-card__price").textContent = "$" + product.FinalPrice;
    renderTo.querySelector(".product__color").textContent = product.Colors[0].ColorName;
    renderTo.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;

    renderTo.querySelector("button").setAttribute("data-id", product.Id);
  }
}
