
let searchElement;
let newButton;
let modal;
let grayBack;
let addProduct;
let saveProduct;
let spinner;
let productsElement;
let skip;
let productToEdit;
let productToDelete;

async function products(){

    searchElement = document.getElementById("search");
    newButton = document.getElementById("new");
    modal = document.getElementById("modal");
    grayBack = document.getElementById("grayBack");
    addProduct = document.getElementById("addProduct");
    saveProduct = document.getElementById("saveProduct");
    spinner = document.getElementById("spinner");
    productsElement = document.getElementById("products");
    skip = 0;

    await getProducts();

    searchElement.onkeyup = ()=>{
        skip = 0;
        getProducts();
    }

    newButton.onclick = ()=>{

        modal.classList.remove("hidden");
        grayBack.classList.remove("hidden");
        addProduct.classList.remove("hidden");
        saveProduct.classList.add("hidden");

        fillForm({image:"", title:"", description:"", category : "men's clothing", price: 0});

    }
    
    grayBack.onclick = ()=>{
        modal.classList.add("hidden");
        grayBack.classList.add("hidden");
    }

    addProduct.onclick = async()=>{

        const formData = new FormData(modal);
        const data = JSON.stringify(Object.fromEntries(formData))

        const response = await fetch(`/adminPanel/addProduct`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
          });

        if (response.status >= 400 && response.status < 600) {
            alert(await response.text());
        }
        else{
            modal.classList.add("hidden");
            grayBack.classList.add("hidden");
            getProducts();
        }

    }

    saveProduct.onclick = async()=>{

        const formData = new FormData(modal);
        const data = JSON.stringify(Object.fromEntries(formData))

        const response = await fetch(`/adminPanel/editProduct/${productToEdit._id}`,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
          });

        if (response.status >= 400 && response.status < 600) {
            alert(await response.text());
        }
        else{
            modal.classList.add("hidden");
            grayBack.classList.add("hidden");
            getProducts();
        }

    }

}


async function getProducts(){

    spinner.classList.remove("hidden");

    const response =  await fetch(`/adminPanel/getProducts/${searchElement.value}/${skip}`);
    
    if (response.status >= 400 && response.status < 600) {
        alert(await response.text());
    }

    const resJson = await response.json()
    
    const products = resJson.products;

    const productCount = resJson.count;

    spinner.classList.add("hidden");

    renderProducts(products, productCount);

    const nextElement = document.getElementById("next");
    const previousElement = document.getElementById("previous");

    nextElement.onclick = ()=>{
        skip+= 9;
        getProducts();
    }
    previousElement.onclick = ()=>{
        skip-= 9;
        getProducts();
    }

    for(const key in products){

        const editButton = document.getElementById("edit" + key);
        const deleteButton = document.getElementById("delete" + key);

        editButton.onclick = ()=>{
            fillForm(products[key]);
            modal.classList.remove("hidden");
            grayBack.classList.remove("hidden");
            productToEdit = products[key];
            addProduct.classList.add("hidden");
            saveProduct.classList.remove("hidden");
        }

        deleteButton.onclick = async()=>{

            productToDelete = products[key];

            const response = await fetch(`/adminPanel/deleteProduct/${productToDelete._id}`,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              });
    
            if (response.status >= 400 && response.status < 600) {
                alert(await response.text());
            }
            else{
                getProducts();
            }
        }

    }


}

function renderProducts(products, productCount){

    let html = "";

    for (const [index, product] of products.entries()){
      html += `
        <tr>
            <td>
                <img src="${product.image}" alt="">
            </td>
            <td>
                ${product.title}
            </td>
            <td>
                ${product.description.slice(0,100) + " ..."}
            </td>
            <td>
                ${product.category}
            </td>
            <td>
                ${"$" + product.price}
            </td>
            <td>
                <i class="fa-regular fa-pen-to-square" id="edit${index}"></i>
            </td>
            <td>
                <i class="fa-solid fa-trash-arrow-up" id="delete${index}"></i>
            </td>
        </tr>
    `;
    }

    html += `
            <tr >
                <td colspan="3">
                    <button id="previous" ${(skip-9 < 0)? "disabled":""} >Previous</button>
                    <button id="next" ${(skip+9 >= productCount)? "disabled":"false"} >Next</button>
                </td>
                <td colspan="4">
                    Showing ${skip +1} to ${(skip +9 > productCount)? productCount:skip +9 }
                     of ${productCount}
                </td>
            </tr>
    `;

  
    productsElement.innerHTML = html;

}
 
function fillForm(data){

    const keys =  ["image", "title", "description", "category", "price"];

    for(const key of keys){

        const element = document.getElementById(key);
        element.value = data[key];

    }
}
  
  
  
export default products;