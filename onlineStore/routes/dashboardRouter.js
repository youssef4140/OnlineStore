import express from "express";
import getDashboard from "../controllers/dashboardController.js";

const router = express.Router();


router.use(express.json());


router.get('/', getDashboard);


export default router;
