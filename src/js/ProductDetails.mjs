import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

    const cart = getLocalStorage("so-cart");
    const cartItems = Array.isArray(cart) ? cart : cart ? [cart] : [];
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails(product, renderTo) {
    renderTo.querySelector("h3").textContent = product.Brand.Name;
    renderTo.querySelector("h2").textContent = product.NameWithoutBrand;

    const productImage = renderTo.querySelector("img");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    renderTo.querySelector(".product-card__price").textContent = "$" + product.FinalPrice;
    renderTo.querySelector(".product__color").textContent = product.Colors[0].ColorName;
    renderTo.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;

    renderTo.querySelector("button").setAttribute("data-id", product.Id);
  }
}
