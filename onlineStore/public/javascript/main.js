let items = document.querySelectorAll(".collections .carousel .carousel-item");

items.forEach((el) => {
  const minPerSlide = 3;
  let next = el.nextElementSibling;
  for (var i = 0; i < minPerSlide; i++) {
    if (!next) {
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

// const card = document.getElementById("product-card");

// const getProducts = async () => {
//   let response = await fetch("https://fakestoreapi.com/products?limit=5");
//   const data = await response.json();
//   // console.log(data);
//   let a = ``;

//   data.forEach((el) => {
//     a += `
//     <div class="carousel-item active">
//     <div class="col-md-3">
//     <div class="card">
//                       <div class="image-wrapper">
//                         <img
//                           src=${el.image}
//                           class="card-img-top"
//                           alt="product image"
//                           />
//                           <button class="image-overlay">
//                           <i class="fa-solid fa-cart-plus"></i>
//                           </button>
//                           </div>
//                           <div class="card-body">
//                           <h6>${el.title}</h6>
//                           <p>${el.price}</p>
//                           </div>
//                           </div>
//                           </div>
//                           </div>
//                           `;
//   });
//   card.innerHTML = a;
// };
// getProducts();
