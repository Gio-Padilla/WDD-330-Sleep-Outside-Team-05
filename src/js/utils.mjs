// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  updateCartNotification();
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const htmlFile = await fetch(path);
  const template = await htmlFile.text();
  return template;
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const headerElement = document.querySelector("#header-contents");
    if (headerElement) renderWithTemplate(headerTemplate, headerElement);
    else console.warn("Element #header-contents introuvable.");

    const footerTemplate = await loadTemplate("/partials/footer.html");
    const footerElement = document.querySelector("#footer-contents");
    if (footerElement) renderWithTemplate(footerTemplate, footerElement);
    else console.warn("Element #footer-contents introuvable.");

    updateCartNotification();
  } catch (err) {
    console.error("Erreur loadHeaderFooter:", err);
  }

}

// Adds a notification
// Requires the following line to use:
// <div id="center-toast" class="hidden"></div>
export function notify(message, durrationInSeconds = 2) {
  const toast = document.getElementById("center-toast");

  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 300); // matches fade-out transition
  }, (durrationInSeconds * 1000)); // visible for 2 seconds
}

export function dates() {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`
}

export function updateCartTotal() {
  const cartTotalElement = document.querySelector(".cart-total");
  let cartTotal = 0;
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.forEach(item => {
    cartTotal += item.FinalPrice * item.quantity;
  });

  cartTotal = parseFloat(cartTotal.toFixed(2));

  cartTotalElement.textContent = cartTotal;
  return cartTotal;
}

export function updateCartNotification() {
  const cartQuantityElement = document.querySelector(".cart p");
  const cartQuantity = getCartQuantity();
  if (cartQuantity > 0) {
    cartQuantityElement.textContent = cartQuantity;
    cartQuantityElement.style.display = "inline";
  } else {
    cartQuantityElement.style.display = "none";
  }
}

export function getCartQuantity() {
  const list = getLocalStorage("so-cart");
  let quantity = 0;
  list.forEach(item => {
    quantity += item.quantity;
  });
  return quantity;
}