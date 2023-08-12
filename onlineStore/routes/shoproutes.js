import express from "express";
import ProductController from "../controllers/shop.js"
import CartController from "../controllers/cart.js"
import auth from '../middlewares/authentication.js';



export const router = express.Router();
router.use(express.json());


router.get("/", ProductController.findProducts.bind(ProductController));
router.get("/cart", CartController.findCart.bind(CartController));
router.get("/search", ProductController.findSearch.bind(ProductController));
router.get("/product", ProductController.findSingleProduct.bind(ProductController));
router.post("/checkout-session",auth.verify,CartController.checkoutSession.bind(CartController));