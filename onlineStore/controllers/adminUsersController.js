import usersModel from "../models/usersModel.js";


const getUsers  =  async(req,res) => {

    try{
        const searchValue = req.params['searchValue'] || "";
        const skip = req.params['skip'];
    
        const users = await usersModel.find({"email" : {$regex : searchValue}}).limit(9).skip(skip);
    
        const count = await usersModel.countDocuments({"email" : {$regex : searchValue}});
    
        res.send({users: users, count:count});
    
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const addUser =  async(req,res) => {

    try{
        const user = req.body;

        const response = await usersModel.create(user)
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const editUser =  async(req,res) => {

    const id = req.params["id"];

    try{
        const user = req.body;

        const response = await usersModel.updateOne({_id : id}, user);
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}

const deleteUser =  async(req,res) => {

    const id = req.params["id"];

    try{
        const response = await usersModel.deleteOne({_id : id});
    
        res.send("success");
    }
    catch(error){
        res.status(400).send(error.toString());
    }

}






export  {getUsers, addUser, editUser, deleteUser};