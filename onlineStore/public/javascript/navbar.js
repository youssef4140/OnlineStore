const closeBtn = document.querySelector(".closebtn");
const dropdownContent = document.querySelector(".dropdown-content-bars");
const dropbtnbars = document.querySelector(".dropbtn-bars"); 

closeBtn.addEventListener("click", function() {
  dropdownContent.style.display = "none";
});

dropbtnbars.addEventListener("click", function() {
  dropdownContent.style.display = "block";


});