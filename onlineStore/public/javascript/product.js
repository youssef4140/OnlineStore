
class Product {
    constructor(){
        this.queryarr = window.location.href.split('?')[1].split('&')
        this.query = {}
        this.queryarr.forEach((arr)=>{
            const key = arr.split('=')[0];
            const value = arr.split('=')[1];
            this.query[key] = value;
        })

        this.singleProduct = document.querySelector('.single-product-container');
        
    }
    
    async get()  {
        try {
          const response = await fetch(`http://localhost:8080/shop/product?id=${this.query.id}`);
          const result = await response.json();
          console.log(result);
          this.renderProduct(result);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      renderProduct(result){

        const productHTML = `<div class="single-image-container">
                  <img src="${result.image}" alt="${result.title}">
              </div>
              <div class="non-image-container">
              <div class="single-description-container">
                  <span class="single-product-category">${result.category}</span>
                  <span class="single-product-name">${result.title}</span>
                  <span class="single-product-price">${result.price}</span>
                  <em style="font-weight: 100;font-size: 9px;">Tax included</em>
              </div>
              <div class="single-filter-container">
                  <p class="single-product-description">
                  ${result.description}
                  </p>
                  <span class="single-product-quantity">Quantity</span>
                  <div class="product-btns">
                      <button class="product-btn">-</button>
                      <div><span class="cart-product-counter">1</span></div>
                      <button class="product-btn">+</button>
                  </div>

              </div>
              <div class="single-product-btn-container">
                  <button class="add-to-cart">ADD TO CART</button>
                  <button class="buy-it-now">BUT IT NOW</button>
              </div>
          </div>
          `
          this.singleProduct.innerHTML = productHTML;


      }

}

const product = new Product();
product.get()
