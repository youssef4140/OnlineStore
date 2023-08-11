
async function products(){

    const values = {skip:0};
    
    const searchElement = document.getElementById("search");
    
    getProducts(values);

    searchElement.onkeyup = ()=>{
        getProducts(values);
    }

}


async function getProducts(values){

    const searchElement = document.getElementById("search");
    const spinner = document.getElementById("spinner");

    spinner.classList.remove("hidden");

    const response =  await fetch(`/adminPanel/getProducts/${searchElement.value}/${values.skip}`);

    const resJson = await response.json()
    
    const products = resJson.products;

    const productCount = resJson.count;

    spinner.classList.add("hidden");

    renderProducts(products, productCount, values);

    const nextElement = document.getElementById("next");
    const previousElement = document.getElementById("previous");


    nextElement.disabled = (values.skip+9 >= productCount)? true:false;
    previousElement.disabled = (values.skip-9 < 0)? true:false;

    nextElement.onclick = ()=>{
        values.skip+= 9;
        getProducts(values);
    }
    previousElement.onclick = ()=>{
        values.skip-= 9;
        getProducts(values);
    }


}

function renderProducts(products, productCount, values){

    const productsElement = document.getElementById("products");

    let html = "";

    for (const product of products){
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
                <i class="fa-regular fa-pen-to-square"></i>
            </td>
            <td>
                <i class="fa-solid fa-trash-arrow-up"></i>
            </td>
        </tr>
    `;
    }

    html += `
            <tr >
                <td colspan="3">
                    <button id="previous" >Previous</button>
                    <button id="next" >Next</button>
                </td>
                <td colspan="4">
                    Showing ${values.skip +1} to ${(values.skip +9 > productCount)? productCount:values.skip +9 }
                     of ${productCount}
                </td>
            </tr>
    `;

  
    productsElement.innerHTML = html;

}
  
  
  
  
export default products;