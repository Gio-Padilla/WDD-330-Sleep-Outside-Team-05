import { getLocalStorage, setLocalStorage, updateCartTotal, notify } from "./utils.mjs";
import { init } from "./main";

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
  updateCartTotal();
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
<<<<<<< HEAD
        quantity:
=======
        Quantity:
>>>>>>> 32a01781ef53b46b20fb9551a64528499134925f
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

function checkoutButtonEvent() {
  const checkoutButton = document.querySelector(".continue-to-checkout");
  checkoutButton.addEventListener("click", () => {
    const currentCart = getLocalStorage("so-cart");
    if (currentCart == "") {
      notify("Please add something to the cart before going to checkout.", 5);
    } else {
      window.location.href = "/checkout/";
    }
  });
}

// Initialize
renderCartContents();
<<<<<<< HEAD
init();
=======
init();
checkoutButtonEvent();
>>>>>>> 32a01781ef53b46b20fb9551a64528499134925f
