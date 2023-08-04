
    class Products {
      constructor(){
        this.cartlist = JSON.parse(localStorage.getItem('cartitems')) || [];
        this.page = 0;
        this.listdropdown = document.querySelector(".sort-list");
        this.chevronrotate = document.querySelector("#sort-chevron");
        this.pagenumber = document.querySelector(".page-number");
        this.cartCounter = document.querySelector(".fa-bag-shopping")
        this.counter = this.cartlist.length;

      }
      showsortlist = () =>{
        this.listdropdown.classList.toggle("show");
        this.chevronrotate.classList.toggle("chevron-rotate");
      }

      changepagenumber = () => {
        this.pagenumber.innerHTML = this.page + 1;
      }
      
      pagedown = ()=> {
        if (this.page === 0) return
        this.page--;
        console.log(this.page)
        this.get(`http://localhost:8080/shop?page=${this.page}`)
        this.changepagenumber()
      }
      
      pageup =  ()=> {
        this.page++
        console.log(this.page)
        this.get(`http://localhost:8080/shop?page=${this.page}`)
        this.changepagenumber()
      }

       get = async (url) => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          this.renderproducts(result);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      

      renderproducts = (productsdata) => {
        let productshtml = "";
        for (let i = 0; i < productsdata.length; i++) {
          const product = productsdata[i];
          this.cartlist.includes(product._id)?
          productshtml += this.productcardadded(product):
          productshtml += this.productcard(product);
        }
        const productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = productshtml;
      };
    
      productcard = (product) => {
        const productshtml =
         `<div class="product-card">
              <div class="card-image-container">
                <img src="${product.image}">
              </div>
              <div class="product-desc">
                  <span>${product.title}</span>
                  <span>${product.price}</span>
              </div>
            <button class="add-cart-btn" onclick="products.addtocart(this, '${product._id}')"><i class="fa-solid fa-cart-plus"></i></button>
          </div>`;
          return productshtml;
      }

      productcardadded = (product)=> {
        const productshtml =
        `<div class="product-card">
             <div class="card-image-container">
               <img src="${product.image}">
             </div>
             <div class="product-desc">
                 <span>${product.title}</span>
                 <span>${product.price}</span>
             </div>
           <button class="add-cart-btn added-to-cart" onclick="products.addtocart(this, '${product._id}')"><i class="fa-solid fa-cart-plus"></i></button>
         </div>`;
         return productshtml;
     }

      

      

      IsInCart = (id)=>{
        const cartItems = JSON.parse(localStorage.getItem('cartitems'))
        return cartItems.includes(id)? false : true;
      }
      addtocart = (button, id) => {
        this.cartlist.includes(id) ? this.cartlist.splice(this.cartlist.indexOf(id), 1) : this.cartlist.push(id);
        button.classList.toggle("added-to-cart");
        this.setCounter();
        localStorage.setItem('cartitems', JSON.stringify(this.cartlist));
      };


      setCounter= ()=> {
        this.counter = this.cartlist.length;
        this.cartCounter.setAttribute('value', this.counter)

      }

    }
  

class SortAndFilter extends Products {
  constructor(pageUrl, pageNumber) {
    super();
    this.pageUrl = pageUrl;
    this.pageNumber = pageNumber;
    this.sort = null;
    this.alphabaticallyAtoZ = document.querySelector("#AtoZ");
    this.alphabaticallyZtoA = document.querySelector("#ZtoA");
    this.priceLowToHigh = document.querySelector("#lowToHigh");
    this.priceHighToLow = document.querySelector("#highToLow");
    this.allPriceCheckbox = document.querySelector("#price-all");
    this.priceCheckboxes = document.querySelectorAll(".pricebox");
    this.sortbtn = document.querySelector("#sorttext")
    this.selectedPrices = [];

    this.alphabaticallyAtoZ.addEventListener("click", () => {
      this.sort = "alphabaticallyAtoZ";
      this.getSortedResults();
      this.sortbtn.innerHTML = this.sort;
    });
    this.alphabaticallyZtoA.addEventListener("click", () => {
      this.sort = "alphabaticallyZtoA";
      this.getSortedResults();
      this.sortbtn.innerHTML = this.sort;
    });
    this.priceLowToHigh.addEventListener("click", () => {
      this.sort = "priceLowToHigh";
      this.getSortedResults();
      this.sortbtn.innerHTML = this.sort;

    });
    this.priceHighToLow.addEventListener("click", () => {
      this.sort = "priceHighToLow";
      this.getSortedResults();
      this.sortbtn.innerHTML = this.sort;
    });
    this.priceCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          this.allPriceCheckbox.checked = false;
        }
        this.updateSelectedPrices();
      });
    });
    this.allPriceCheckbox.addEventListener("change", () => {
      if (this.allPriceCheckbox.checked) {
        this.priceCheckboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      }
      this.updateSelectedPrices();
    });
  }

  getSortedResults() {
    const url = `${this.pageUrl}?page=${this.pageNumber}&sort=${this.sort}&range=${this.getRange()}`;
    this.get(url);
  }

  updateSelectedPrices() {
    this.selectedPrices = [];

    this.priceCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const priceRange = checkbox.value
        const priceValues = priceRange
          .split("-")
        this.selectedPrices.push(priceValues);
        // console.log(this.selectedPrices)

      }
    });

    this.getSortedResults();
  }

  getRange() {
    const flattenPrices = this.selectedPrices.flat();
    const lowestValue = Math.min(...flattenPrices);
    const highestValue = Math.max(...flattenPrices);
    return `${lowestValue}X${highestValue}`;
  }
}

const products = new Products();
products.get(`http://localhost:8080/shop?page=${this.page}`);
products.setCounter();
const sortAndFilter = new SortAndFilter("http://localhost:8080/shop", this.page);