
import express from "express";
import { Product } from "../models/productsModel.js";

class ProductController {
  constructor() {}

  async findProducts(req,res){
    if(parseInt(req.query.count) == 1) {
      const pcount = Product.countDocuments()
      res.json(pcount);

    };
    const page = parseInt(req.query.page) * 8;
    const sortquery = req.query.sort
    const sort ={
      alphabaticallyAtoZ : {title:1},
      alphabaticallyZtoA : {title:-1},
      priceLowToHigh: {price:1},
      priceHighToLow: {price:-1}
    }
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
    const products = await Product.find(pricefilter).skip(page).limit(9).sort(sort[sortquery])
    res.json(products);
  }

}


export default new ProductController();