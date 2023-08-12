import usersModel from'../models/usersModel.js';
import auth from '../middlewares/authentication.js';
import googleVerify from '../services/googleVerify.js';

import yup from 'yup';


const formRegister  =  async(req,res) => {

    let user = req.body;

    createUser(res, user);

}

const googleRegister  =  async(req,res) => { 

   const googleEmail = await googleVerify(req.body.credential).catch(
     (error)=>{res.status(400).send('not verified')} 
     );

    const user = {
        firstName: googleEmail.given_name,
        lastName: googleEmail.family_name,
        email: googleEmail.email,
        password: googleEmail.iat.toString()
    }

    createUser(res, user);
}



async function createUser(res, user){

    user.lastActive = new Date();
    
    const vScheme = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(6 , "password must be at least 6 character"),
        lastActive: yup.date().required()
    }).noUnknown();

    try{
        vScheme.validateSync(user, {strict: true});

        if ( (await usersModel.countDocuments({email: user.email})) > 0 ){ throw "this email is already registred" }
    
        else{

        user.role = "customer";

        await usersModel.create(user);
        
        user.id = (await usersModel.findOne({email: user.email})).id;

        user.token = auth.generateToken({email: user.email, role: user.role});
            
        res.cookie('token', user.token).send(user);
        }

    }
    catch(error){
         res.status(400).send(error.toString());
    }

}

export {formRegister, googleRegister};