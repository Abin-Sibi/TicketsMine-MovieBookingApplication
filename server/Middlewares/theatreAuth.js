const TheatreModel = require("../Models/theatreModel");
const jwt = require("jsonwebtoken")
require("dotenv").config();

module.exports.checkUser =(req,res,next)=>{
    const token = req.cookies.theatreToken
    if(token){
       jwt.verify(token,process.env.theatreToken,async(err,decodedToken)=>{
        if(err){
            res.json({status:false})
            next();
        }else{
            const user = await TheatreModel.findById(decodedToken.id)
            if(user)
            res.json({status:true,user:user.email})
            else res.json({status:false})
            next();
        }
       })
    }else{
        res.json({status:false});
        next();
    }
}