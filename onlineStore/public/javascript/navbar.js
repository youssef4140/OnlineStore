class Navbar {
  constructor(){
    this.closeBtn = document.querySelector(".closebtn");
    this.dropdownContent = document.querySelector(".dropdown-content-bars");
    this.dropbtnbars = document.querySelector(".dropbtn-bars");
    this.cartBtn = document.querySelectorAll(".expandCart");
    this.cart = document.querySelector(".cart-container");
    this.searchBar = document.querySelector(".searchBar");
    this.searchBox = document.querySelector(".search-box");
    this.searchResult = document.querySelector(".search-result");
    this.searchProducts = document.querySelector(".search-result-product-container");


    this.closeBtn.addEventListener("click", ()=> {
      this.dropdownContent.style.display = "none";
    });
    
    this.dropbtnbars.addEventListener("click", ()=> {
      this.dropdownContent.style.display = "block";
    });

    this.cartBtn.forEach((btn)=> {
      btn.addEventListener("click", ()=>{
        this.cart.classList.toggle("cart-container-expands")
    })
    });

    document.addEventListener("click", (event)=>{
      if(!this.searchResult.contains(event.target)){
        this.searchResult.classList.remove("search-result-found");
      }
    })


    this.searchBar.addEventListener("keyup", (event)=>{
      this.searchResultFound(event)

      })
}

async searchResultFound(event){
  const inputValue = event.target.value
     await this.getSearch(inputValue);
  if(inputValue ){
    this.searchBar.classList.add("search-box-active") 
  }
  if ((this.searchResult.classList.contains("search-result-found")& !inputValue) ) {
    this.searchResult.classList.remove("search-result-found");
  }else{
    this.searchResult.classList.add("search-result-found");
  } 
}

async getSearch(inputValue) {
  try {
    const response = await fetch(`http://localhost:8080/shop/search?search=${inputValue}`);
    const result = await response.json();
    // console.log(result);
    this.renderSearch(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

renderSearch(result) {
  let searchHTML = '';
  for (let i = 0; i < result.length; i++) {
    const searchResult = result[i];
    searchHTML += this.searchProduct(searchResult);
  }
  this.searchProducts = document.querySelector(".search-result-product-container");

  this.searchProducts.innerHTML = searchHTML;
}

searchProduct(product) {
  const productHTML= `<div class="search-product-card">
      <div class="search-product-image">
      <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="search-product-description">
      <div class="search-product-title"><span >${product.title}</span></div>
      <span class="search-product-price">${product.price}</span>
      </div>
  
  </div>`;
  return productHTML;
}






}



const navbar = new Navbar();





