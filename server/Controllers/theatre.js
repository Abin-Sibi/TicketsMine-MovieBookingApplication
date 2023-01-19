const TheatreModel = require("../Models/theatreModel");
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const { Types } = require("mongoose");
const multer = require('multer')
require ("dotenv").config()

const maxAge = 3*24*60*60
const createTheatreToken = (id)=>{
    return jwt.sign({id},process.env.theatreToken,{
        expiresIn:maxAge,
    })
};


const serviceID = process.env.serviceID
const accountSID = process.env.accountSID
const authToken =process.env.authToken

const client = require("twilio")(accountSID, authToken);

const handleErrors = (err)=>{
    let errors = {email:"",password:""};
    if(err.message ==="Incorrect Email")
    errors.email ="That email is not Registered"

    if(err.message ==="Incorrect password")
    errors.email ="That password is incorrect"

    if(err.code===11000){
        errors.email = "Email is already Exists"
        return errors;
    }

    if(err.message ==="You are blocked by admin")
    errors.email ="You are blocked by admin"

    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.register = async (req,res,next)=>{
    try{
      const {name,email,phone,password} = req.body;
      const useremail = await TheatreModel.findOne({email:email})
      if(!useremail){
        const user = await TheatreModel.findOne({phone:phone})
        if(!user){
          client.verify
          .services(serviceID)
          .verifications.create({
            to: `+91${phone}`,
            channel: "sms",
          })
          .then((resp) => {
            console.log("response", resp);
            res.status(200).json(resp);
          });
        }else{
          throw Error("This number is already registered");
        }
      }else{
        throw Error("This email already exists");
      }
 }catch(err){
       console.log("this is the error in jwt",err)
       const errors = handleErrors(err);
       res.json({errors, created:false});
 }
}

module.exports.otpverifytheatre = async (req,res,next)=>{
  try {
    const { otp,name,email,phone,password } = req.body;
    console.log('userrnnum','orgnum')
    const user = await TheatreModel.findOne({phone:phone})
  console.log(user,'userinfo')
  console.log("otp ", otp);
  client.verify
    .services(serviceID)
    .verificationChecks.create({
      to: `+91${phone}`,
      code: otp,
    })
    .then(async(resp) => {
      console.log("otp res", resp);
      if (resp.valid) {
        let isBlocked = false;
        const user = await TheatreModel.create({name,email,phone,password,isBlocked});
        const token = createTheatreToken(user._id);

        res.cookie("theatreToken",token,{
         withCredectials:true,
         httpOnly:false,
         maxAge:maxAge *1000,
        });
       return res.status(200).json({resp,user:user._id,created:true})
      }
      res.json({resp, message: "Expire Otp" });
    });
  } catch (err) {
   console.log(err,"error in try")
   const errors = handleErrors(err);
       res.json({errors, created:false});
  }
}

module.exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await TheatreModel.login(email,password);
        const token = createTheatreToken(user._id);

        res.cookie("theatreToken",token,{
         withCredectials:true,
         httpOnly:false,
         maxAge:maxAge*1000,
        });
        res.status(200).json({user:user._id,created:true})
 }catch(err){
       console.log("this is the error in jwt",err)
       const errors = handleErrors(err);
       res.json({errors, created:false});
 }
}

module.exports.application = asyncHandler(async (req, res) => {
  const {datas,userId}= req.body
    try {
      let info = await TheatreModel.updateOne({_id:userId},{$set:{application:datas}})
      // console.log(data);
      res.json({id:info._id,status:true});
    } catch (error) {
      res.send(error.status).json(error.message);
    }
  });

  module.exports.didApply = asyncHandler(async (req, res) => {
    try {
      let id = req.params.id;
      console.log("abin")
      let info = await TheatreModel.findOne({ _id: Types.ObjectId(id) });
      console.log("abin123",info)
      if (info.application) res.json(info);
      else {
        console.log("i have application");
        res.json({ status: false });
      }
    } catch (error) {
        console.log("abin")
      res.status(error.status).json(error.message);
    }
  });

  module.exports.uploadLogo = asyncHandler(async (req, res) => {
    try {
      // multer configaration
      console.log("Image route top");
      const upload = multer({
        storage: multer.diskStorage({
          destination: "./public/uploads/",
          filename: function (req, file, cb) {
            cb(null, req.imageName);
          },
        }),
      }).single("image");
  
      req.imageName = `${req.params.id}.jpg`;
      upload(req, res, (err) => {
        console.log(err +"++++++++++++++++");
      });
      //
      res.json("done");
      console.log("Image route end");
    } catch (error) {
        console.log("Image end catcherr");
      res.status(error.status).json(error.message);
    }
  });

  // const addscreens = asyncHandler(async(req,res)=>{
  //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh")
  //   try {
  //     const moviedata = await movies(req.body).save()
  //     res.json({moviedata,status:true})
  //   } catch (error) {
  //     res.send(error.status).json(error.message)
  //   }
  // })

  module.exports.getscreens = asyncHandler(async(req,res)=>{
    try {
      console.log('hhhhhhhhhhhh',req.params.id)
      const theatreId = req.params.id
      const screeninfo = await TheatreModel.findOne({_id:theatreId})
      console.log("qqqqqqqqqqqqqqqqqiiiiiiiiiiiii",screeninfo,'lllllll',screeninfo.Screens)
      res.json({status:true,screen:screeninfo.Screens})
    } catch (error) {
      
    }
  })

  module.exports.addscreens = asyncHandler(async (req, res) => {
    const {datas,userId}= req.body
    console.log(datas,'the screenifo')
      try {
        let screeninfo = await TheatreModel.updateOne({_id:userId},{$addToSet:{Screens:datas}})
         console.log(screeninfo);
        res.json({id:screeninfo._id,status:true});
      } catch (error) {
        res.send(error.status).json(error.message);
      }
    });


module.exports.theatrelogout = asyncHandler(async(req,res)=>{
  console.log("jjjjjjjjjjjjjjjjjj")
  try{
    res.clearCookie("theatreToken",{path:"/"})
    res.json({status:true})
  }catch{
    res.json({status:false})
  }
})



  