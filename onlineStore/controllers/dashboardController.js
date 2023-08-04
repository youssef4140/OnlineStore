import ordersModel from "../models/ordersModel.js";



const getDashboard  =  async(req,res) => {

    const orders = await ordersModel.find({})

    const totalSells = await ordersModel.aggregate([
        { $group: { _id : null, sum : { $sum: "$totalPrice" } } }
    ]);

    res.send(orders);
}


async function getOrders(){

    

}





export default getDashboard;