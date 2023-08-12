
async function dashboard(){

  const spinner = document.getElementById("spinner");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const totalSells = document.getElementById("totalSells");
  const totalOrders = document.getElementById("totalOrders");
  const averageOrderValue = document.getElementById("averageOrderValue");
  const activeUser = document.getElementById("activeUser");
  

  async function getDashboard(){

    const response =  await fetch(`/adminPanel/getDashboard/${startDate.value}/${endDate.value}`);

    const dash = await response.json();

    totalSells.innerHTML = "$" + dash.totalSells;
    totalOrders.innerHTML = dash.totalOrders;
    averageOrderValue.innerHTML = "$" + dash.averageOrderValue;
    activeUser.innerHTML = dash.activeUsers;

    renderYearSales(dash.yearChart, new Date(endDate.value).getFullYear());

    renderCategoriesSales(dash.categoriesSales);

    renderLastOrders(dash.lastOrders);

    spinner.classList.add("hidden");

  }


  endDate.valueAsDate = new Date();
  await getDashboard();

  startDate.onchange = ()=>{
    
    if(new Date(startDate.value) > new Date(endDate.value)){
      startDate.valueAsDate = new Date(endDate.value);
    }

    spinner.classList.remove("hidden");
    getDashboard();
  };

  endDate.onchange = ()=>{

    if(new Date(endDate.value) < new Date(startDate.value)){
      endDate.valueAsDate = new Date(startDate.value);
    }

    spinner.classList.remove("hidden");
    getDashboard();
  };

}


function renderYearSales(yearChart, year){

  new Chart("yearSales", {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jun","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        backgroundColor: "#ffd333",
        data: yearChart
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: `sales in dollars in year ${year}`
      }
    }
  });

}

function renderCategoriesSales(categoriesSales){

    //["Everyday carry", "Headwear", "Outerwear", "Packs & Luggage", "Patches & Pins","Shorts","Sweaters","Tees & Knits","Woven Shirts"]

    new Chart("categoriesSales", {
      type: "doughnut",
      data: {
        labels: Object.keys(categoriesSales),
        datasets: [{
          backgroundColor: [  "#b91d47","#00aba9","#2b5797","#e8c3b9","#1e7145","purple","blue","orange","brown"],
          data: Object.values(categoriesSales)
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: false,
          text: "Sales by category"
        }
      }
    });

}


function renderLastOrders(lastOrders){

  let html = "";

  for (const order of lastOrders){
    html += `
    <tr>
      <td>${order.shippingInfo.first_name + " " + order.shippingInfo.last_name}</td>
      <td class= "${order.status}" >${order.status}</td>
      <td>${order.paymentMethod}</td>
      <td>${order.shippingInfo.country}</td>
      <td>${"$" + order.totalPrice}</td>
    </tr>
  `;
  }

  document.getElementById("lastOrders").innerHTML = html;

}


export default dashboard;