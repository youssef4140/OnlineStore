
class Checkout {
  constructor(){
  this.prevBtns = document.querySelectorAll('.btn-prev');
  this.nextBtns = document.querySelectorAll('.btn-next');
  this.progress = document.querySelector('#progress');
  this.formSteps = document.querySelectorAll(".form-step");
  this.progressSteps = document.querySelectorAll(".progress-step");
  this.checkoutCart = document.getElementById('checkout-product-container')
  this.stripeBtn = document.getElementById('Stripe');
  this.cartquery = JSON.parse(localStorage.getItem('cartitems')).join('-')
  this.items = this.convertIdsToObjects(JSON.parse(localStorage.getItem('cartitems')))
  this.checkoutPanel = document.getElementById('checkout-panel');
  this.stripeBtn.addEventListener("click", ()=>{
    fetch('http://localhost:8080/shop/checkout-session',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: this.items
      })
    }).then(res => {
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json))
    }).then(({url}) =>{
      console.log(url);
      // this.checkoutPanel.src = url
      // window.location = url
    }).catch(err =>{
      console.error(err.error)
    })
  })
  this.progressBar = {
      0 : 0,
      1 : 50,
      2 : 100,
  }

  this.formStepNum = 0

  this.nextBtns.forEach((btn) => {
      btn.addEventListener('click',()=>{
          if(this.formStepNum ==2) return;
          this.formStepNum ++;
          this.updateProgressBar()
          // console.log(this.formStepNum + 1)
          this.updateProgressSteps()
          this.updateFormSteps();
      })
  });

  this.prevBtns.forEach((btn) => {
      btn.addEventListener('click',()=>{
      this.updateFormSteps();
      this.updateProgressSteps()
      this.formStepNum--;
      this.updateProgressBar()
      console.log(this.formStepNum + 1);
      })
  });

  }

  convertIdsToObjects(ids) {
    let items = [];
    for (let i = 0; i < ids.length; i++) {
      let item = {id: ids[i], quantity: 1};
      items.push(item);
    }
    return items;
  }

  updateFormSteps() {
      this.formSteps[this.formStepNum].classList.toggle('form-step-active');
      this.formSteps[this.formStepNum-1].classList.toggle('form-step-active');
  }

  updateProgressSteps(){
      this.progressSteps[this.formStepNum].classList.toggle('progress-step-active');
  }

  updateProgressBar(){
      console.log()
      this.progress.style.width = `${this.progressBar[this.formStepNum]}%`
  }

  async getCheckout() {
    let cartquery = JSON.parse(localStorage.getItem('cartitems')).join('-')
          try {
            const response = await fetch(`http://localhost:8080/shop/cart?cart=${cartquery}`);
            const result = await response.json();
            // console.log(result);
            this.renderCheckout(result);
          } catch (error) {
            this.renderCheckout([]);
            console.error("Error:", error);
          }
        };

  renderCheckout(productsdata) {
      let productshtml = "";
      for (let i = 0; i < productsdata.length; i++) {
        const product = productsdata[i];
        productshtml += this.CheckOutProductCard(product);
      }
      this.checkoutCart.innerHTML = productshtml;
      // this.totalprice(productsdata);
    };

    CheckOutProductCard(product) {
      const productshtml =
      `<div class="cart-product-card" data-product-id="${product._id}">
      <div class="product-container">
        <div class="product-image-container">
        <img src="${product.image}">
        </div>
        <div class="product-btns">
          <button  onclick="changeCount('${product._id}',-1,'${product.price}')">-</button>
          <div><span class="cart-product-counter " >1</span></div>
          <button  onclick="changeCount('${product._id}',1,'${product.price}')">+</button>
          <button class="delete" onclick="deleteProduct('${product._id}')"><i class="fa-regular fa-trash-can"></i></button>
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

    getProductCount(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
          return this.items[i].quantity;
        }
      }
    }

    updateProductCount(productId,price) {
      let count = this.getProductCount(productId)
      let productCount = document.querySelector(`[data-product-id="${productId}"] .cart-product-counter`);
      let productPrice = document.querySelector(`[data-product-id="${productId}"] .product-price`);
      productCount.innerHTML = count ;
      productPrice.innerHTML = (count * price)
    }
    


}

const checkout = new Checkout();
checkout.getCheckout() 
console.log(checkout.items)

const changeCount = (productId, change, price)=> {
let IntChange = parseInt(change)
for (let i = 0; i < checkout.items.length; i++) {
  if (checkout.items[i].id === productId) {
    if(IntChange == -1 && checkout.items[i].quantity == 1){
      return;
    }
    checkout.items[i].quantity += IntChange;
    checkout.updateProductCount(productId,price)
    console.log(checkout.items)

    break;
  }
}
}

const  deleteProduct =  function(productId){
let cartitems = JSON.parse(localStorage.getItem('cartitems'))
cartitems.splice(cartitems.indexOf(productId), 1)
localStorage.setItem('cartitems', JSON.stringify(cartitems));
console.log(cartitems)
checkout.getCheckout()
console.log(checkout.getCheckout())
}