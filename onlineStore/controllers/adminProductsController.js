import { count } from "console";
import productsModel from "../models/productsModel.js";


const getProducts  =  async(req,res) => {

    const searchValue = req.params['searchValue'] || "";
    const skip = req.params['skip'];

    const products = await productsModel.find({"title" : {$regex : searchValue}}).limit(9).skip(skip);

    const count = await productsModel.countDocuments({"title" : {$regex : searchValue}});

    res.send({products: products, count:count});

}





export default getProducts;