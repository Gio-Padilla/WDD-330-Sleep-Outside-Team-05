import{r as s,l as i,a as c}from"./utils-xO2efT-X.js";import{E as o}from"./ExternalServices-Cs-SxY3_.js";function n(t){return`<li class="product-card">
    <a href="/product_pages/?product=${t.Id}">
      <img src="${t.Images.PrimaryMedium}" alt="${t.Name}">
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.ListPrice}</p>
    </a>
  </li>`}class l{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").textContent=d(this.category)}renderList(e){s(n,this.listElement,e)}}function d(t){return t.replace(/-/g," ").replace(/\b\w/g,e=>e.toUpperCase())}i();const m=c("category"),u=new o,h=document.querySelector(".product-list"),p=new l(m,u,h);p.init();
