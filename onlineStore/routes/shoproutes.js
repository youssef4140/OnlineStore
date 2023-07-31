import express from "express";
import { Product } from "../models/productsModel.js";

export const router = express.Router();


router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
    console.log(products);
})