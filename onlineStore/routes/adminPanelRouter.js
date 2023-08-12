import express from "express";
import getDashboard from "../controllers/dashboardController.js";
import {getProducts, addProduct, editProduct, deleteProduct} from "../controllers/adminProductsController.js";
import authentication from '../middlewares/authentication.js'
import authorization from '../middlewares/authorization.js'

const router = express.Router();


router.use(express.json());
router.use(authentication.verify, authorization.adminVerify);

router.get('/getDashboard/:startDate/:endDate', getDashboard);
router.get('/getProducts/:searchValue/:skip', getProducts);
router.get('/getProducts//:skip', getProducts);

router.post('/addProduct', addProduct);

router.put('/editProduct/:id', editProduct);

router.delete('/deleteProduct/:id', deleteProduct);


export default router;
