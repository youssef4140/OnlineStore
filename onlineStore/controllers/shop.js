
import express from "express";
import  Product  from "../models/productsModel.js";

class ProductController {
  constructor() {
    this.sort ={
      alphabaticallyAtoZ : {title:1},
      alphabaticallyZtoA : {title:-1},
      priceLowToHigh: {price:1},
      priceHighToLow: {price:-1}
    }
  }

  async findProducts(req,res){
    const page = parseInt(req.query.page) * 8;
    const sortquery = req.query.sort
    let pricefilter;
    if(req.query.range){
      let pricerange;
      pricerange = req.query.range.split("X")
      if (pricerange[0] !== 'Infinity') {
        pricefilter =  { price: { $gte: pricerange[0], $lte: pricerange[1] } }
      }
      if(pricerange[0] === 'infinity'){
        pricefilter = null;
      }
    }
    const products = await Product.find(pricefilter).skip(page).limit(9).sort(this.sort[sortquery])
    res.json(products);
    res.end();

  }


  async findSearch(req, res){
    const searchQuery = req.query.search;
    try{
      const searchResult = await Product.find({title:{$regex:new RegExp(searchQuery, 'i')}});
    res.json(searchResult);

    } catch (error){
      console.error("Error:", error);

    }
  }


  async findSingleProduct(req,res){
    const productId = req.query.id
    console.log('result:',productId)
    try{
      const product = await Product.findById(productId);
      console.log(product);
      res.json(product);
    }catch (error){
      console.error("Error:", error);
    }
  }

}


export default new ProductController();