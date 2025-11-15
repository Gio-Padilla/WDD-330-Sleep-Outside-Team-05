import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const normalizedItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  const htmlItems = normalizedItems.map(cartItemTemplate);
  const listElement = document.querySelector(".product-list");
  listElement.innerHTML = htmlItems.join("");

  // Attach event listeners to remove buttons
  const removeButtons = listElement.querySelectorAll(".cart-card button");
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => removeFromCart(index));
  });
}

function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">
        qty: ${item.quantity}
        <button data-index="${index}" class="remove-btn">Remove</button>
      </p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  const normalizedItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  // Remove only one item at this specific index
  normalizedItems.splice(index, 1);

  // Save updated array
  setLocalStorage("so-cart", normalizedItems);

  // Re-render cart
  renderCartContents();
}

// Initialize cart
renderCartContents();


loadHeaderFooter();