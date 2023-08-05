import express from "express";
import { formRegister, googleRegister } from '../controllers/registerController.js';

const router = express.Router();


router.use(express.json());


router.post('/register/form', formRegister);

router.post('/register/google', googleRegister);


export default router;
