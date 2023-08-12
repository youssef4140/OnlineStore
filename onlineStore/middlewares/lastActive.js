import jwt from "jsonwebtoken";
import usersModel from '../models/usersModel.js';


const secretKey = "secret-1234";

const lastActive = async(req,res,next)=>{

    try{

        if (req.cookies.token){

            const token = req.cookies.token;
            const decoded = jwt.verify(token, secretKey);
    
            await usersModel.updateOne({email: decoded.email }, {lastActive: new Date()})
        }

    }
    catch (error){   

    }

    next();
}

export default lastActive;