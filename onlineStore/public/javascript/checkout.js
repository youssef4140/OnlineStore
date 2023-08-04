
class Checkout {
    constructor(){
    this.prevBtns = document.querySelectorAll('.btn-prev');
    this.nextBtns = document.querySelectorAll('.btn-next');
    this.progress = document.querySelector('#progress');
    this.formSteps = document.querySelectorAll(".form-step");
    this.progressSteps = document.querySelectorAll(".progress-step");
    this.checkoutCart = document.getElementById('checkout-product-container')
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
            console.log(this.formStepNum + 1)
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
        const cartquery = JSON.parse(localStorage.getItem('cartitems')).join('-')
            try {
              const response = await fetch(`http://localhost:8080/shop/cart?cart=${cartquery}`);
              const result = await response.json();
              // console.log(result);
              this.renderCheckout(result);
            } catch (error) {
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
        this.totalprice(productsdata);
      };

      CheckOutProductCard(product) {
        const productshtml =
        `<div class="cart-product-card">
        <div class="product-container">
          <div class="product-image-container">
          <img src="${product.image}">
          </div>
          <div class="product-btns">
            <button>-</button>
            <div><span class="cart-product-counter">1</span></div>
            <button>+</button>
            <a><i class="fa-regular fa-trash-can"></i></a>

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

const checkout = new Checkout();
checkout.getCheckout() 