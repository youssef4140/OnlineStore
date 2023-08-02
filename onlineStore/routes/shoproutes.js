import express from "express";
import ProductController from "../controllers/shop.js"


export const router = express.Router();

router.get("/", ProductController.findProducts.bind(ProductController));