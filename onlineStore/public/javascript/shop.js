let page = 0;

const changepagenumber = () => {
  const pagenumber = document.querySelector(".page-number");
  pagenumber.innerHTML = page + 1;
}

const pagedown = ()=> {
  if (page > 0) page --;
  console.log(page)
  get(`http://localhost:8080/shop?page=${page}`)
  changepagenumber()
}

const pageup =  ()=> {
  page++
  console.log(page)
  get(`http://localhost:8080/shop?page=${page}`)
  changepagenumber()

}

  
  const showsortlist =()=>{
    const listdropdown = document.querySelector(".sort-list");
    const chevronrotate = document.querySelector("#sort-chevron");
    listdropdown.classList.toggle("show");
    chevronrotate.classList.toggle("chevron-rotate");
  }

  


  const get = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      renderproducts(result);
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  get(`http://localhost:8080/shop?page=${page}`);


  const renderproducts = (productsdata) => {
    let productshtml = "";
    for (let i = 0; i < productsdata.length; i++) {
      const product = productsdata[i];
      productshtml += `<div class="product-card">
                   <div class="card-image-container">
                   <img src="${product.image}">
  
               </div>
                   <div class="product-desc">
                       <span>${product.title}</span>
                       <span>${product.price}</span>
                   </div>
                  <button class="add-cart-btn" onclick="addtocart(this, '${product._id}')"><i class="fa-solid fa-cart-plus"></i></button>
  
  
  
               </div>`;
    }
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = productshtml;
  };
  
  const cartlist = [];
  const addtocart = (button, id) => {
    cartlist.includes(id) ? cartlist.splice(cartlist.indexOf(id), 1) : cartlist.push(id);
    button.classList.toggle("added-to-cart");
    const counter = document.querySelector(".fa-bag-shopping");
    counter.setAttribute('value', cartlist.length)
    localStorage.setItem('cartitems', cartlist);
    console.log(localStorage.getItem('cartitems')); 
    // console.log(cartlist);
  };




class SortAndFilter {
  constructor(pageUrl, pageNumber) {
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
    get(url);
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

// Example usage:
const sortAndFilter = new SortAndFilter("http://localhost:8080/shop", page);