import productsModel from "../models/productsModel.js";


const getProducts  =  async(req,res) => {

    try{
        const searchValue = req.params['searchValue'] || "";
        const skip = req.params['skip'];
    
        const products = await productsModel.find({"title" : {$regex : searchValue}}).limit(9).skip(skip);
    
        const count = await productsModel.countDocuments({"title" : {$regex : searchValue}});
    
        res.send({products: products, count:count});
    
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const addProduct =  async(req,res) => {

    try{
        const product = req.body;

        const response = await productsModel.create(product)
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const editProduct =  async(req,res) => {

    const id = req.params["id"];

    try{
        const product = req.body;

        const response = await productsModel.updateOne({_id : id}, product);
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const deleteProduct =  async(req,res) => {

    const id = req.params["id"];

    try{
        const response = await productsModel.deleteOne({_id : id});
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}






export  {getProducts, addProduct, editProduct, deleteProduct};