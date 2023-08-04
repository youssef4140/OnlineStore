

const  display=()=> {
    console.log(JSON.parse(localStorage.getItem('cartitems'))); 
}

  class Cart {
    constructor(){
        this.cartProductContainer = document.getElementById('cart-product-container');
        this.cartquery = JSON.parse(localStorage.getItem('cartitems')).join('-')


        this.cartList = JSON.parse(localStorage.getItem('cartitems'));
    }

    
    expandcart = ()=> {
        this.cartProductContainer.classList.toggle('cart-container-expands')
        this.getCart(`http://localhost:8080/shop/cart?cart=${this.cartquery}`);



    }
    getCart = async (url) => {
            try {
              const response = await fetch(url);
              const result = await response.json();
              console.log(result);
              this.rendercart(result);
            } catch (error) {
              console.error("Error:", error);
            }
          };

    rendercart = (productsdata) => {
        let productshtml = "";
        for (let i = 0; i < productsdata.length; i++) {
          const product = productsdata[i];
          productshtml += this.productcard(product);
        }
        this.cartProductContainer.innerHTML = productshtml;
      };

    
      productcard = (product) => {
        const productshtml =
        `<div class="cart-product-card">
        <div class="product-container">
          <div class="product-image-container">
          <img src="${product.image}">
          </div>
          <div class="product-btns">
            <button>-</button>
            <div><span class="cart-product-counter">1</span></div>
            <button onclick="display()">+</button>
          </div>
      </div>
        <div class="product-description">
          <span class="product-name">${product.title}</span>
          <span class="product-price">${product.price}</span>
        </div>
      </div>
    </div>`
          return productshtml;
      }



  }

  const cart = new Cart();
  const cartquery = JSON.parse(localStorage.getItem('cartitems')).join('-')
  cart.getCart(`http://localhost:8080/shop/cart?cart=${cartquery}`);
//   cart.getCart(`http://localhost:8080/shop/cart?cart=`);

console.log(JSON.parse(localStorage.getItem('cartitems')).join('-'));



  