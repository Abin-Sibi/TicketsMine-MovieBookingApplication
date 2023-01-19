const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken")
require("dotenv").config();

module.exports.checkUser =(req,res,next)=>{
    const token = req.cookies.userToken
    if(token){
       jwt.verify(token,process.env.userToken,async(err,decodedToken)=>{
        if(err){
            console.log("not verified")
            res.json({status:false})
            next();
        }else{
            const user = await User.findById(decodedToken.id)
            if(user){
            console.log("not verified")
            res.json({status:true,user:user.email})
            }
            else res.json({status:false})
            next();
        }
       })
    }else{
        res.json({status:false});
        next();
    }
}