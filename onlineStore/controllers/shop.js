
import express from "express";
import { Product } from "../models/productsModel.js";

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

  async findCart(req, res){
    try{
      const cartQuery = req.query.cart
      if(cartQuery){
        const cart = await Product.find({_id:{ $in: cartQuery.split('-')}})
        // console.log(cart);
        res.json(cart);
        res.end();
      } else {
        res.send("empty query");
        res.end();
      }

    }  catch (error) {
      console.error("Error:", error);
    }


  }

}


export default new ProductController();