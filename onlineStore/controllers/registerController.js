import usersModel from'../models/usersModel.js';
import auth from '../middlewares/authentication.js';
import yup, { date } from 'yup';


const formRegister  =  async(req,res) => {

    let user = req.body;
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

        await usersModel.create(user);
        
        user.id = (await usersModel.find({email: user.email}))[0].id;

        user.token = auth.generateToken({email: user.email});
            
        res.send(user);
        }

    }
    catch(error){
         res.status(400).send(error.toString());
    }

}

const googleRegister  =  async(req,res) => {



}

export {formRegister, googleRegister};