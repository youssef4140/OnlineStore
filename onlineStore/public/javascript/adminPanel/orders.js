
let searchElement;
let modal;
let grayBack;
let saveOrder;
let spinner;
let ordersElement;
let skip;
let orderToEdit;
let orderToDelete;

async function orders(){

    searchElement = document.getElementById("search");
    modal = document.getElementById("modal");
    grayBack = document.getElementById("grayBack");
    saveOrder = document.getElementById("saveOrder");
    spinner = document.getElementById("spinner");
    ordersElement = document.getElementById("orders");
    skip = 0;

    await getOrders();

    searchElement.onkeyup = ()=>{
        skip = 0;
        getOrders();
    }
    
    grayBack.onclick = ()=>{
        modal.classList.add("hidden");
        grayBack.classList.add("hidden");
    }

    saveOrder.onclick = async()=>{

        const formData = new FormData(modal);
        const data = JSON.stringify(Object.fromEntries(formData))

        const response = await fetch(`/adminPanel/editOrder/${orderToEdit._id}`,{
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
            getOrders();
        }

    }

}


async function getOrders(){

    spinner.classList.remove("hidden");

    const response =  await fetch(`/adminPanel/getOrders/${searchElement.value}/${skip}`);
    
    if (response.status >= 400 && response.status < 600) {
        alert(await response.text());
    }

    const resJson = await response.json()
    
    const orders = resJson.orders;

    const orderCount = resJson.count;

    spinner.classList.add("hidden");

    renderOrders(orders, orderCount);

    const nextElement = document.getElementById("next");
    const previousElement = document.getElementById("previous");

    nextElement.onclick = ()=>{
        skip+= 9;
        getOrders();
    }
    previousElement.onclick = ()=>{
        skip-= 9;
        getOrders();
    }

    for(const key in orders){

        const editButton = document.getElementById("edit" + key);
        const deleteButton = document.getElementById("delete" + key);

        editButton.onclick = ()=>{
            fillForm(orders[key]);
            modal.classList.remove("hidden");
            grayBack.classList.remove("hidden");
            orderToEdit = orders[key];
        }

        deleteButton.onclick = async()=>{

            orderToDelete = orders[key];

            const response = await fetch(`/adminPanel/deleteOrder/${orderToDelete._id}`,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              });
    
            if (response.status >= 400 && response.status < 600) {
                alert(await response.text());
            }
            else{
                getOrders();
            }
        }

    }


}

function renderOrders(orders, orderCount){

    let html = "";

    for (const [index, order] of orders.entries()){
      html += `
        <tr>
            <td>
                ${order.date}
            </td>
            <td>
                ${order.shippingInfo.first_name + " " +order.shippingInfo.last_name }
            </td>
            <td>
                ${"$" + order.totalPrice}
            </td>
            <td>
                ${order.status}
            </td>
            <td>
                ${order.shippingInfo.address1}
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
                    <button id="next" ${(skip+9 >= orderCount)? "disabled":"false"} >Next</button>
                </td>
                <td colspan="4">
                    Showing ${skip +1} to ${(skip +9 > orderCount)? orderCount:skip +9 }
                     of ${orderCount}
                </td>
            </tr>
    `;

  
    ordersElement.innerHTML = html;

}
 
function fillForm(data){

    const keys =  ["totalPrice", "shippingMethod", "paymentMethod", "status"];

    for(const key of keys){

        const element = document.getElementById(key);
        element.value = data[key];

    }
}
  
  
  
export default orders;