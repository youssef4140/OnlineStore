
function dashboard(){
    const xValues = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jun","Aug","Sep","Oct","Nov","Dec"];
    const yValues = [0, 200, 800, 600, 400, 550, 670, 1200, 300, 1100, 20,700];
    const barColors = "#ffd333";
    
    new Chart("income", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "Income in dollars"
        }
      }
    });
}
