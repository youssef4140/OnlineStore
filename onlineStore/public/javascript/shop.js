let page = 0;

const changepagenumber = () => {
  const pagenumber = document.querySelector(".page-number");
  pagenumber.innerHTML = page + 1;
};

const pagedown = () => {
  if (page > 0) page--;
  console.log(page);
  get(`http://localhost:8080/shop?page=${page}`);
  changepagenumber();
};

const pageup = async () => {
  page++;
  console.log(page);
  get(`http://localhost:8080/shop?page=${page}`);
  changepagenumber();
};

const showsortlist = () => {
  const listdropdown = document.querySelector(".sort-list");
  const chevronrotate = document.querySelector("#sort-chevron");
  listdropdown.classList.toggle("show");
  chevronrotate.classList.toggle("chevron-rotate");
};

const getcount = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};
const get = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    renderproducts(result);
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
             <button class="add-cart-btn"><i class="fa-solid fa-cart-plus"></i></button>
             </div>`;
  }
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = productshtml;
};

// sorting
let sort;

const alphabaticallyAtoZ = document.querySelector("#AtoZ");
const alphabaticallyZtoA = document.querySelector("#ZtoA");
const priceLowToHigh = document.querySelector("#lowToHigh");
const priceHighToLow = document.querySelector("#highToLow");

alphabaticallyAtoZ.addEventListener("click", function () {
  sort = "alphabaticallyAtoZ";
  get(`http://localhost:8080/shop?page=${page}&sort=${sort}`);
});
alphabaticallyZtoA.addEventListener("click", function () {
  sort = "alphabaticallyZtoA";
  get(`http://localhost:8080/shop?page=${page}&sort=${sort}`);
});
priceLowToHigh.addEventListener("click", function () {
  sort = "priceLowToHigh";
  get(`http://localhost:8080/shop?page=${page}&sort=${sort}`);
});
priceHighToLow.addEventListener("click", function () {
  sort = "priceHighToLow";
  get(`http://localhost:8080/shop?page=${page}&sort=${sort}`);
});

class Filter {
  constructor() {
    this.allPriceCheckbox = document.querySelector("#price-all");
    this.priceCheckboxes = document.querySelectorAll(".pricebox");
    this.selectedPrices = [];

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

  updateSelectedPrices() {
    this.selectedPrices = [];

    this.priceCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const priceRange = checkbox.nextElementSibling.textContent;
        const priceValues = priceRange
          .split(" - ")
          .map((value) => parseInt(value.replace("$", "")));
        this.selectedPrices.push(priceValues);
      }
    });

    const flattenPrices = this.selectedPrices.flat();
    console.log(flattenPrices);

    const lowestValue = Math.min(...flattenPrices);
    const highestValue = Math.max(...flattenPrices);

    console.log("Lowest" + lowestValue);
    console.log("Highest" + highestValue);
    get(
      `http://localhost:8080/shop?page=${page}&sort=${sort}&range=${lowestValue}X${highestValue}`
    );
  }
}

const filter = new Filter();
