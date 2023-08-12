import jwt from "jsonwebtoken";
import usersModel from '../models/usersModel.js';


const secretKey = "secret-1234";

const exports = {};

exports.generateToken = (user)=>{

    const token = jwt.sign(user, secretKey);

    return token;
    
}

exports.verify = async(req,res,next)=>{

    try{
        // const [_, token] = req.headers.authorization?.split(" ");
        
        const token = req.cookies.token;
        const decoded = jwt.verify(token, secretKey);

        res.locals.user = decoded;


        next();
    }
    catch (error){

        res.status(400).send("Not Authenticated, please login with authenticated user first")

    }
    
}

export default exports;
