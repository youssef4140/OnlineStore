import express from "express";
import getDashboard from "../controllers/dashboardController.js";
import {getProducts, addProduct, editProduct, deleteProduct} from "../controllers/adminProductsController.js";
import {getOrders, addOrder, editOrder, deleteOrder} from "../controllers/adminOrdersController.js";
import {getUsers, addUser, editUser, deleteUser} from "../controllers/adminUsersController.js";
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


router.get('/getOrders/:searchValue/:skip', getOrders);
router.get('/getOrders//:skip', getOrders);
router.post('/addOrder', addOrder);
router.put('/editOrder/:id', editOrder);
router.delete('/deleteOrder/:id', deleteOrder);

router.get('/getUsers/:searchValue/:skip', authorization.superAdminVerify, getUsers);
router.get('/getUsers//:skip', authorization.superAdminVerify, getUsers);
router.post('/addUser', authorization.superAdminVerify, addUser);
router.put('/editUser/:id', authorization.superAdminVerify, editUser);
router.delete('/deleteUser/:id', authorization.superAdminVerify, deleteUser);


export default router;
