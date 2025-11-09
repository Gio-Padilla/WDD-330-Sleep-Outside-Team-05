import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
  }

	// This is used right after creating the object in order to add all the necessities to set up the page
  async init() {
    // Set the object to this varible
    this.product = await this.dataSource.findProductById(this.productId);
		// Location to render
		const renderTo = document.querySelector(".product-detail");
    // Renders the page
    this.renderProductDetails(this.product, renderTo);
    //Adds the product to the cart
    document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart(product) {
    const cart = getLocalStorage("so-cart");
    // Normalize stored cart so we always work with an array.
    const cartItems = Array.isArray(cart) ? cart : cart ? [cart] : [];
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails(product, renderTo) {
		renderTo.querySelector('h3').textContent = product.Brand.Name;
  	renderTo.querySelector('h2').textContent = product.NameWithoutBrand;

  	const productImage = renderTo.querySelector('img');
  	productImage.src = product.Image;
  	productImage.alt = product.NameWithoutBrand;

  	renderTo.querySelector('.product-card__price').textContent = "$" + product.FinalPrice;
  	renderTo.querySelector('.product__color').textContent = product.Colors[0].ColorName;
  	renderTo.querySelector('.product__description').innerHTML = product.DescriptionHtmlSimple;

  	renderTo.querySelector('button').setAttribute("data-id", product.Id);
  }

}