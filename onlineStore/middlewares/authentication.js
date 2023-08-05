import jwt from "jsonwebtoken";
import usersModel from '../models/usersModel.js';


const secretKey = "secret-1234";

const exports = {};

exports.generateToken = (user)=>{

    const token = jwt.sign(user, secretKey);

    return token;
    
}

exports.verify = (req,res,next)=>{

    try{

        const [_, token] = req.headers.authorization?.split(" ");

        const decoded = jwt.verify(token, secretKey);

        if ( !usersModel.find(decoded.email) )  throw "user not found"  

        next();
    }
    catch (error){

        res.send("Not Authenticated, please login with authenticated user first")

    }
    
}

export default exports;
