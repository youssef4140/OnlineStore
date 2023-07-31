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
