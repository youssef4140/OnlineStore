import ordersModel from "../models/ordersModel.js";
import usersModel from "../models/usersModel.js";



const getDashboard  =  async(req,res) => {

    const startDate = new Date(req.params['startDate']);
    const endDate = new Date(req.params['endDate']);

    const dashboard = {};

    const dateFilter = { $gte: startDate, $lte: endDate };

    dashboard.lastOrders = await ordersModel.find({date:dateFilter}).sort({date:1}).limit(5);

    let totalSells = await ordersModel.aggregate([
        { $match: {date: dateFilter} },
        { $group: { _id : null , sum : { $sum: "$totalPrice" } } }
    ]);

    dashboard.totalSells = totalSells[0]?.sum || 0;

    dashboard.totalOrders = await ordersModel.countDocuments({date: dateFilter});

    dashboard.averageOrderValue = (dashboard.totalSells / dashboard.totalOrders) || 0;
    dashboard.averageOrderValue = dashboard.averageOrderValue.toFixed(2);

    dashboard.activeUsers = await usersModel.countDocuments({ lastActive:{ $gte: startDate} });

    dashboard.yearChart = await getYearChart(endDate.getFullYear());

    dashboard.categoriesSales = await getCategoriesSales(dateFilter);

    res.send(dashboard);
}


async function getYearChart(year){

    const yearOrders = [];

    for ( let m=1; m<=12; m++ ){

        const dateFilter = { $gte: new Date(`${year}-${m}-01`) 
        , $lte: new Date(`${year}-${m}-30`) }

        let totalSells = await ordersModel.aggregate([
            { $match: {date: dateFilter} },
            { $group: { _id : null , sum : { $sum: "$totalPrice" } } }
        ]);
    
        totalSells = totalSells[0] || {sum : 0};

        yearOrders.push(totalSells.sum);

    }

    return yearOrders;
}

async function getCategoriesSales(dateFilter){

    const categoriesSales = {};

    const categoriesShort = ["men", "electronics", "jewelery", "women"];
    const categories = ["men's clothing", "electronics", "jewelery", "women's clothing"];

    for( let [key, cat] of categoriesShort.entries()){

        const orders =  await ordersModel.aggregate([
            // Unwind the products array in each order
            { $unwind: "$products" },
            // Perform a lookup to get the actual product details
            { "$addFields": { "product_id": { "$toObjectId": "$products._id" }}},
            {
              $lookup: {
                from: "products", // Collection name
                localField: "product_id",
                foreignField: "_id",
                as: "productDetails"
              }
            },
            // Unwind the productDetails array to get a separate document for each product
            { $unwind: "$productDetails" },
    
            {
                $project: {
                  _id: 1,
                  "productDetails.category": 1,
                  date : 1
                }

              },
    
              {
                $match: { "productDetails.category": {$regex : cat}, date : dateFilter }
              },
              {
                $count: "count"
              }
          ]);

          categoriesSales[categories[key]] = orders[0]?.count || 0;

    }
   
    
      return categoriesSales

}





export default getDashboard;