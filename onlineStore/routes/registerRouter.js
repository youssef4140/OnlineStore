import express from "express";
import { formRegister, googleRegister } from '../controllers/registerController.js';

const router = express.Router();


router.use(express.json());


router.post('/form', formRegister);

router.post('/google', googleRegister);


export default router;
