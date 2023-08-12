
const exports ={};

exports.adminVerify = async(req,res,next)=>{

    try{

        const role = res.locals.user.role;

        if (role === "admin" || role === "super admin"){
            next();
        }
        else{
            throw "not admin"
        }

    }
    catch (error){

        res.status(400).send("You are not authorized")

    }
    
}

exports.superAdminVerify = async(req,res,next)=>{

    try{

        const role = res.locals.user.role;

        if (role === "super admin"){
            next();
        }
        else{
            throw "not super admin"
        }

    }
    catch (error){

        res.status(400).send("You are not authorized")

    }
    
}

export default exports;