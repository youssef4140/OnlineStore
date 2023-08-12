export default class Cart {
  constructor() {
    this.cartProductContainer = document.getElementById(
      "cart-product-container"
    );
    this.cartList = JSON.parse(localStorage.getItem("cartitems")) || [];
    this.cartquery = this.cartList.join("-");

    this.cartbtn = document.querySelector("#cart-btn");
    this.checkoutPrice = document.querySelector("#checkout-price");
  }

  expandcart = () => {
    this.cartProductContainer.classList.toggle("cart-container-expands");
    this.getCart();
    // console.log('expand')
  };
  async getCart() {
    this.cartList = JSON.parse(localStorage.getItem("cartitems")) || [];
    this.cartquery = this.cartList.join("-");
    try {
      if (this.cartquery) {
        const response = await fetch(
          `http://localhost:8080/shop/cart?cart=${this.cartquery}`
        );
        const result = await response.json();
        console.log(result);
        this.rendercart(result);
      } else {
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  rendercart(productsdata) {
    let productshtml = "";
    for (let i = 0; i < productsdata.length; i++) {
      const product = productsdata[i];
      productshtml += this.cartProductCard(product);
    }
    this.cartProductContainer.innerHTML = productshtml;
    // cart.innerHTML = productshtml;
    this.totalprice(productsdata);
  }

  cartProductCard(product) {
    const productshtml = `<div class="cart-product-card">
        <div class="product-container">
          <div class="product-image-container">
          <img src="${product.image}">
          </div>
        <div class="product-description">
          <span class="product-name">${product.title}</span>
          <span class="product-price">${product.price}</span>
        </div>
      </div>
    </div>`;
    return productshtml;
  }

  totalprice(products) {
    let price = 0;
    for (let i = 0; i < products.length; i++) {
      price += products[i].price;
    }
    this.checkoutPrice.innerHTML = price;
  }
}

const cart = new Cart();
// const cartquery = JSON.parse(localStorage.getItem('cartitems')).join('-')

console.log(JSON.parse(localStorage.getItem("cartitems")));
cart.getCart();
