import jwt from "jsonwebtoken";
import usersModel from '../models/usersModel.js';


const secretKey = "secret-1234";

const lastActive = async(req,res,next)=>{

    try{

        if (req.headers.authorization){
            console.log('ok')
            const [_, token] = req.headers.authorization?.split(" ");
        
            const decoded = jwt.verify(token, secretKey);
    
            if ( (await usersModel.countDocuments({email: decoded.email})) == 0 )  throw "user not found" 
    
            await usersModel.updateOne({email: decoded.email }, {lastActive: new Date()})
        }

    }
    catch (error){   

    }

    next();
}

export default lastActive;