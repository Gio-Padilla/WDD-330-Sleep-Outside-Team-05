import{l as m,g as c,u,s as i}from"./utils-xO2efT-X.js";function o(){const t=c("so-cart")||[],r=(Array.isArray(t)?t:[t]).map(y),e=document.querySelector(".product-list");e.innerHTML=r.join(""),e.querySelectorAll(".remove-btn").forEach(n=>{const s=n.dataset.index;n.addEventListener("click",()=>I(s))}),e.querySelectorAll(".qty-input").forEach(n=>{n.addEventListener("change",s=>{const d=s.target.dataset.index,l=parseInt(s.target.value);if(l<1){s.target.value=1;return}p(d,l)})}),u()}function y(t,a){return`
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${t.Images.PrimarySmall}" alt="${t.Name}" />
      </a>

      <a href="#">
        <h2 class="card__name">${t.Name}</h2>
      </a>

      <p class="cart-card__color">${t.Colors[0].ColorName}</p>

      <p class="cart-card__quantity">
        qty:
        <input 
          type="number" 
          min="1" 
          value="${t.quantity||1}" 
          class="qty-input" 
          data-index="${a}"
        />

        <button data-index="${a}" class="remove-btn">Remove</button>
      </p>

      <p class="cart-card__price">$${(t.FinalPrice*(t.quantity||1)).toFixed(2)}</p>
    </li>
  `}function p(t,a){const r=c("so-cart")||[],e=Array.isArray(r)?r:[r];e[t].quantity=a,i("so-cart",e),o()}function I(t){const a=c("so-cart")||[],r=Array.isArray(a)?a:[a];r.splice(t,1),i("so-cart",r),o()}o();m();
