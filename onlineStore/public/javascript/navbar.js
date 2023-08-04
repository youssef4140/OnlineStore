const closeBtn = document.querySelector(".closebtn");
const dropdownContent = document.querySelector(".dropdown-content-bars");
const dropbtnbars = document.querySelector(".dropbtn-bars");
// const dropdownbtn = document.querySelector(".store-drp-btn"); 


closeBtn.addEventListener("click", function() {
  dropdownContent.style.display = "none";
});

dropbtnbars.addEventListener("click", function() {
  dropdownContent.style.display = "block";
});


const expandCart = ()=> {
  const cart = document.querySelector(".cart-container");
  cart.classList.toggle("cart-container-expands")
}






