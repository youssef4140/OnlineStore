import Cart from "./cart.js";
class Index extends Cart {
  constructor() {
    super();
    this.cartlist = JSON.parse(localStorage.getItem("cartitems")) || [];
    this.card = document.getElementById("product-card");
    this.newSeasonBtn = document.getElementById("new-season");
    this.onSaleBtn = document.getElementById("on-sale");
    this.teenKitsBtn = document.getElementById("teens-kits");
    this.cartCounter = document.querySelector(".fa-bag-shopping");
    this.counter = this.cartlist.length;
    this.addproduct = document.querySelectorAll(".data-set");

    this.getProducts("http://localhost:8080/shop?page=0");

    this.newSeasonBtn.addEventListener("click", () => {
      this.getProducts("http://localhost:8080/shop?page=0");
      this.onSaleBtn.classList.remove("click");
      this.teenKitsBtn.classList.remove("clicked");
      this.newSeasonBtn.classList.add("clicked");
    });

    this.teenKitsBtn.addEventListener("click", () => {
      this.getProducts("http://localhost:8080/shop?page=1");
      this.teenKitsBtn.classList.add("clicked");
      this.newSeasonBtn.classList.remove("clicked");
      this.onSaleBtn.classList.remove("click");
    });

    this.onSaleBtn.addEventListener("click", () => {
      this.getProducts("http://localhost:8080/shop?page=2");

      this.onSaleBtn.classList.add("click");
      this.teenKitsBtn.classList.remove("clicked");
      this.newSeasonBtn.classList.remove("clicked");
    });
  }

  getProducts = async (url) => {
    let response = await fetch(url);
    const data = await response.json();
    console.log(data);

    this.renderProducts(data);
  };

  renderProducts(data) {
    let a = ``;

    data.forEach((el) => {
      a += `
    <div class="">
    <div class="card">
                      <div class="image-wrapper">
                        <img
                          src=${el.image}
                          class="card-img-top"
                          alt="product image"
                          />
                          <button class="image-overlay" onclick="index.addToCart(this,'${el._id}')" >
                          <i class="fa-solid fa-cart-plus"></i>
                          </button>
                          </div>
                          <div class="card-body">
                          <h6>${el.title}</h6>
                          <p>${el.price}$</p>
                          </div>
                          </div>
                          </div>
                          `;
    });
    this.card.innerHTML = a;
  }

  IsInCart = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cartitems"));
    return cartItems.includes(id) ? false : true;
  };
  addToCart = (button, id) => {
    this.cartlist.includes(id)
      ? this.cartlist.splice(this.cartlist.indexOf(id), 1)
      : this.cartlist.push(id);
    button.classList.toggle("added-to-cart");
    this.setCounter();
    localStorage.setItem("cartitems", JSON.stringify(this.cartlist));
    super.getCart();
  };

  setCounter = () => {
    this.counter = this.cartlist.length;
    this.cartCounter.setAttribute("value", this.counter);
  };
}

const index = new Index();
window.index = index;
index.setCounter();

console.log(localStorage.getItem("cartitems"));
