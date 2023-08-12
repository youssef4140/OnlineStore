import usersModel from'../models/usersModel.js';
import auth from '../middlewares/authentication.js';
import googleVerify from '../services/googleVerify.js';
import nodemailer  from 'nodemailer';

import yup from 'yup';
import user from '../models/usersModel.js';


const formLogin  =  async(req,res) => {

    let user = req.body;

    const vScheme = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required()
    }).noUnknown();

    try{
        vScheme.validateSync(user, {strict: true});

        if ( (await usersModel.countDocuments({email: user.email, password:user.password})) > 0 ){

            sendUser(res, user.email);

            }
        else{
            throw "incorrect email or password"
        }
        

    }
    catch(error){
         res.status(400).send(error.toString());
    }

}

const googleLogin  =  async(req,res) => { 

    try{

        const googleEmail = await googleVerify(req.body.credential).catch(
            (error)=>{throw 'not verified'} 
            );

        if ( (await usersModel.countDocuments({email: googleEmail.email})) > 0 ){
                sendUser(res, googleEmail.email);
            }
            else{
                throw "email is not registred, please create account first"
            }
    }
    catch(error){
         res.status(400).send(error.toString());
    }
}



async function sendUser(res, userEmail){

    const foundUser = await usersModel.findOne({email: userEmail}).lean();

    foundUser.token = auth.generateToken({email: userEmail, role: foundUser.role});
    foundUser.id = foundUser._id;
    
    res.cookie('token', foundUser.token).send(foundUser);
}


const forgetPassword  =  async(req,res) => {

    if ( (await usersModel.countDocuments({email: req.body.email})) > 0 ){
        
        const foundUser = await usersModel.find({email: req.body.email}).lean();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'email@gmail.com', //will be implemented in production 
              pass: 'password' // //will be implemented in production 
            }
          });
          
          let mailOptions = {
            from: 'email@gmail.com',
            to: foundUser.email,
            subject: 'your password',
            text: `your password is ${foundUser.password}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {

            } else {
            }
          });

        }


   res.send("your password is sent to your email")

}

export {formLogin, googleLogin, forgetPassword};