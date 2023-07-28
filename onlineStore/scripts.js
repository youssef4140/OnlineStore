const xhr = new XMLHttpRequest();
xhr.open('GET', 'navbar.html');
xhr.onload = function() {
  if (xhr.status === 200) {
    const myComponentContainer = document.querySelector('#navbar');
    myComponentContainer.innerHTML = xhr.responseText;
  }
};
xhr.send();