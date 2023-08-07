import express from "express";
import { formLogin, googleLogin, forgetPassword} from '../controllers/loginController.js';

const router = express.Router();


router.use(express.json());


router.post('/form', formLogin);

router.post('/google', googleLogin);

router.post('/forgetPassword', forgetPassword);


export default router;