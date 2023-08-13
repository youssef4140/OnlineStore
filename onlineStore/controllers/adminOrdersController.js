import ordersModel from "../models/ordersModel.js";


const getOrders  =  async(req,res) => {

    try{
        const searchValue = req.params['searchValue'] || "";
        const skip = req.params['skip'];
    
        const orders = await ordersModel.find({"shippingInfo.first_name" : {$regex : searchValue}}).limit(9).skip(skip);
    
        const count = await ordersModel.countDocuments({"shippingInfo.first_name" : {$regex : searchValue}});
    
        res.send({orders: orders, count:count});
    
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const addOrder =  async(req,res) => {

    try{
        const order = req.body;

        const response = await ordersModel.create(order)
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const editOrder =  async(req,res) => {

    const id = req.params["id"];

    try{
        const order = req.body;

        const response = await ordersModel.updateOne({_id : id}, order);
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const deleteOrder =  async(req,res) => {

    const id = req.params["id"];

    try{
        const response = await ordersModel.deleteOne({_id : id});
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}






export  {getOrders, addOrder, editOrder, deleteOrder};