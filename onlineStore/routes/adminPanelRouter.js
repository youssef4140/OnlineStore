import express from "express";
import getDashboard from "../controllers/dashboardController.js";
import getProducts from "../controllers/adminProductsController.js";

const router = express.Router();


router.use(express.json());


router.get('/getDashboard/:startDate/:endDate', getDashboard);

router.get('/getProducts/:searchValue/:skip', getProducts);
router.get('/getProducts//:skip', getProducts);


export default router;
