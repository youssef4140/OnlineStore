const card = document.getElementById("product-card");
const newSeasonBtn = document.getElementById("new-season");
const onSaleBtn = document.getElementById("on-sale");
const teenKitsBtn = document.getElementById("teens-kits");

const getProducts = async (url) => {
  let response = await fetch(url);
  const data = await response.json();
  console.log(data);

  renderProducts(data);

  // btn();
};

const renderProducts = (data) => {
  let a = ``;

  data.forEach((el) => {
    // child = document.createElement("div");
    // child.classList.add("carousel-item");
    // child.classList.toggle("active");
    // card.appendChild(child);
    a += `
    <div class="">
    <div class="card">
                      <div class="image-wrapper">
                        <img
                          src=${el.image}
                          class="card-img-top"
                          alt="product image"
                          />
                          <button class="image-overlay">
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
  card.innerHTML = a;
};

// const btn = () => {
//   console.log("newseasonBtn clicked");
//   if (
//     newSeasonBtn.clicked == true ||
//     onSaleBtn.clicked == false ||
//     teenKitsBtn.clicked == false
//   ) {
//     newSeasonBtn.classList.add("clicked");
//   } else if (
//     newSeasonBtn.clicked == false &&
//     onSaleBtn.clicked == true &&
//     teenKitsBtn.clicked == false
//   ) {
//     onSaleBtn.classList.add("clicked");
//   } else if (
//     newSeasonBtn.clicked == false &&
//     onSaleBtn.clicked == false &&
//     teenKitsBtn.clicked == true
//   ) {
//     teenKitsBtn.classList.add("clicked");
//   }
// };

// let items = document.querySelectorAll(".collections .carousel .carousel-item");
// items.forEach((el) => {
//   const minPerSlide = 3;
//   let next = el.nextElementSibling;
//   for (var i = 0; i < minPerSlide; i++) {
//     if (!next) {
//       next = items[0];
//     }
//     let cloneChild = next.cloneNode(true);
//     el.appendChild(cloneChild.children[0]);
//     next = next.nextElementSibling;
//   }
// });

getProducts("http://localhost:8080/shop?page=0");

newSeasonBtn.addEventListener("click", () => {
  getProducts("http://localhost:8080/shop?page=0");
  onSaleBtn.classList.remove("click");
  teenKitsBtn.classList.remove("clicked");
  newSeasonBtn.classList.add("clicked");
});

teenKitsBtn.addEventListener("click", () => {
  getProducts("http://localhost:8080/shop?page=1");
  teenKitsBtn.classList.add("clicked");
  newSeasonBtn.classList.remove("clicked");
  onSaleBtn.classList.remove("click");
});

onSaleBtn.addEventListener("click", () => {
  getProducts("http://localhost:8080/shop?page=2");

  onSaleBtn.classList.add("click");
  teenKitsBtn.classList.remove("clicked");
  newSeasonBtn.classList.remove("clicked");
});
