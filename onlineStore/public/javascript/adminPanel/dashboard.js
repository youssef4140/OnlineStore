
function dashboard(){
    
    new Chart("income", {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jun","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
          backgroundColor: "#ffd333",
          data: [0, 200, 800, 600, 400, 550, 670, 1200, 300, 1100, 20,700]
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "Income in dollars in year 2023"
        }
      }
    });

    new Chart("sales", {
      type: "doughnut",
      data: {
        labels: ["Everyday carry", "Headwear", "Outerwear", "Packs & Luggage", "Patches & Pins","Shorts","Sweaters","Tees & Knits","Woven Shirts"],
        datasets: [{
          backgroundColor: [  "#b91d47","#00aba9","#2b5797","#e8c3b9","#1e7145","purple","blue","orange","brown"],
          data: [0, 200, 800, 600, 400, 550, 670, 1200, 300]
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


export default dashboard;