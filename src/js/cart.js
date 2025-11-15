import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const normalizedItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  const htmlItems = normalizedItems.map(cartItemTemplate);
  const listElement = document.querySelector(".product-list");
  listElement.innerHTML = htmlItems.join("");

  // Attach remove event
  const removeButtons = listElement.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    const index = button.dataset.index;
    button.addEventListener("click", () => removeFromCart(index));
  });

  // Attach quantity-change event
  const qtyInputs = listElement.querySelectorAll(".qty-input");
  qtyInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);

      if (newQty < 1) {
        e.target.value = 1;
        return;
      }

      updateQuantity(index, newQty);
    });
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
        qty:
        <input 
          type="number" 
          min="1" 
          value="${item.quantity || 1}" 
          class="qty-input" 
          data-index="${index}"
        />

        <button data-index="${index}" class="remove-btn">Remove</button>
      </p>

      <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
    </li>
  `;
}

function updateQuantity(index, newQty) {
  const cartItems = getLocalStorage("so-cart") || [];
  const normalizedItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  normalizedItems[index].quantity = newQty;

  setLocalStorage("so-cart", normalizedItems);
  renderCartContents();
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  const normalizedItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  normalizedItems.splice(index, 1);
  setLocalStorage("so-cart", normalizedItems);
  renderCartContents();
}

// Initialize
renderCartContents();
loadHeaderFooter();