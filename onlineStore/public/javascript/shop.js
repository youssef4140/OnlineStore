
  const showsortlist =()=>{
    const listdropdown = document.querySelector(".sort-list");
    const chevronrotate = document.querySelector("#sort-chevron");
    listdropdown.classList.toggle("show");
    chevronrotate.classList.toggle("chevron-rotate");
  }


  const products = fetch('http://localhost:8080/shop')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));


    console.log(products)