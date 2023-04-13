const UserModel = require("../Models/UserModel");
const Movies = require("../Models/movies")
require ("dotenv").config()
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const { Types } = require("mongoose");
const multer = require('multer')
const bcrypt = require('bcrypt');
const Reservation = require("../Models/ReservationModel");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const generateQR = require("../utils/generateQr");




 const serviceID = process.env.serviceID
 const accountSID = process.env.accountSID
 const authToken =process.env.authToken

 const client = require("twilio")(accountSID, authToken);

const maxAge = 3*24*60*60
const createToken = (id,name)=>{
    return jwt.sign({id,name},process.env.userToken,{
        expiresIn:maxAge,
    })
};

const handleErrors = (err)=>{
    let errors = {email:"",password:"",phone:""};
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

    if(err.message ==="The number is not registered")
    errors.phone ="The number is not registered"

    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

// module.exports.register = async (req,res,next)=>{
//     try{
//         const {name,email,phone,password} = req.body;
//         let isBlocked = false;
//         const user = await UserModel.create({name,email,phone,password,isBlocked});
//         const token = createToken(user._id);

//         res.cookie("jwt",token,{
//          withCredectials:true,
//          httpOnly:false,
//          maxAge:maxAge *1000,
//         });
//         res.status(201).json({user:user._id,created:true})
//  }catch(err){
//        console.log("this is the error in jwt",err)
//        const errors = handleErrors(err);
//        res.json({errors, created:false});
//  }
// }

module.exports.register = async (req,res,next)=>{
  try{
      const {name,email,phone,password} = req.body;
      const useremail = await UserModel.findOne({email:email})
      if(!useremail){
        const user = await UserModel.findOne({phone:phone})
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

module.exports.otpverify = async (req,res,next)=>{
  try {
    const { otp,name,email,phone,password } = req.body;
    console.log('userrnnum','orgnum')
    const user = await UserModel.findOne({phone:phone})
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
        const user = await UserModel.create({name,email,phone,password,isBlocked});
        const token = createToken(user._id,user.name);

        res.cookie("userToken",token,{
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
        const user = await UserModel.login(email,password);
        const token = createToken(user._id,user.name);

        res.cookie("userToken",token,{
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

module.exports.mobile = async (req,res,next)=>{
  try {
    console.log("number", req.body.number);
    const user = await UserModel.findOne({phone:req.body.number})
    if(user){
      client.verify
      .services(serviceID)
      .verifications.create({
        to: `+91${req.body.number}`,
        channel: "sms",
      })
      .then((resp) => {
        console.log("response", resp);
        res.status(200).json(resp);
      });
    }else{
      throw Error("The number is not registered");
    }
  } catch (err) {
   console.log(err,"error in try")
   const errors = handleErrors(err);
       res.json({errors, created:false});
  }
}

module.exports.otp = async (req,res,next)=>{
  try {
    const { otp, userNumber ,number} = req.body;
    console.log(userNumber,'userrnnum',number,'orgnum')
    const user = await UserModel.findOne({phone:number})
  console.log(user,'userinfo')
  console.log("otp ", otp);
  client.verify
    .services(serviceID)
    .verificationChecks.create({
      to: userNumber,
      code: otp,
    })
    .then((resp) => {
      console.log("otp res", resp);
      if (resp.valid) {
        const token = createToken(user._id,user.name);
         console.log('token',token,'userid',user._id)
        res.cookie("userToken",token,{
         withCredectials:true,
         httpOnly:false,
         maxAge:maxAge*1000,
        });
        res.status(200).json({resp,user:user._id,created:true})
      }
      res.json({resp, message: "Expire Otp" });
    });
  } catch (err) {
   console.log(err,"error in try")
   const errors = handleErrors(err);
       res.json({errors, created:false});
  }
}

module.exports.otpforgotpassword = async (req,res,next)=>{
  try {
    const { otp, userNumber ,number} = req.body;
    console.log(userNumber,'userrnnum',number,'orgnum')
    const user = await UserModel.findOne({phone:number})
  console.log(user,'userinfo')
  console.log("otp ", otp);
  client.verify
    .services(serviceID)
    .verificationChecks.create({
      to: userNumber,
      code: otp,
    })
    .then((resp) => {
      console.log("otp res", resp);
      if (resp.valid) {
        
        res.status(200).json({resp,user:user._id})
      }
      res.json({resp, message: "Expire Otp" });
    });
  } catch (err) {
   console.log(err,"error in try")
   const errors = handleErrors(err);
       res.json({errors, created:false});
  }
}

module.exports.newpassword = asyncHandler(async (req, res) => {
  const {confirmpass,state}= req.body
  console.log(confirmpass,state,'qqqqqqqqqqqq')
    try {
      console.log("ttttttttttttttt")
      const salt = await bcrypt.genSalt();
       const newpassword= await bcrypt.hash(confirmpass,salt)
       console.log("wwwwwwwwwwwwwwww",newpassword)
      let info = await UserModel.updateOne({phone:state},{$set:{password:newpassword}})
     console.log(info);
      res.json({id:info._id,status:true});
    } catch (error) {
      res.send(error.status).json(error.message);
    }
  });


module.exports.fetchUser = asyncHandler(async (req, res) => {
    try {
      const userData = await UserModel.find();
      res.json(userData);
    } catch (error) {
      res.send(error.status).json(error.message);
    }
  });


module.exports.getMovies = asyncHandler(async(req,res)=>{
  try{
   const movies = await Movies.find()
   res.json(movies);
  }catch(error){ 
    res.send(error.status).json(error.message);
  }
})

module.exports.getmovieById = asyncHandler(async(req,res)=>{
  try{
    
    let id = req.params.id
   const movie = await Movies.findById(id)
   console.log(movie)
   res.json(movie);
  }catch(error){
    res.send(error.status).json(error.message);
  }
})

module.exports.getSeatsInformation = asyncHandler(async (req, res) => {
  try {
    console.log('qwehlkreikjdndksjsl][[]]]{[')
    const { date, movieId,showtime, theatreid  } = req.body;
    console.log("in get seat infromation", date, movieId, theatreid, showtime);
    const data = await Reservation.aggregate([
      {
        $match: {
          $and: [
            {
              showDate: date,
            },
            {
              movieId: Types.ObjectId(movieId),
            },
            {
              cinemaId: Types.ObjectId(theatreid),
            },
            {
              startAt: showtime,
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          seats: {
            $push: "$seats",
          },
        },
      },
    ]);

    let seat = [];
    if (data.length === 0) {
      res.json({ seat: false });
    } else {
      if (data[0].seats.length != 0) {
        for (let i = 0; i < data[0].seats.length; i++) {
          for (let j = 0; j < data[0].seats[i].length; j++) {
            seat.push(data[0].seats[i][j]);
          }
        }
      }
    }
    console.log(data,'ksksksksksksk');
    res.json(seat);
  } catch (error) {
    console.log(error);
  }
});

module.exports.reservation = asyncHandler(async (req, res) => {
 
  try {
    const { paymentId, total } = req.body;
    console.log(paymentId, total,'payemnt totoal,',req.body)

    const payment = await stripe.paymentIntents.create({
      amount: total,
      currency: "INR",
      description: "TicketsMine",
      payment_method: paymentId,
      confirm: true,
    });
    console.log(payment,'payment huheowwee')
    const data = await Reservation(req.body).save();
    const qrcode = await generateQR(
      "http//:localhost:3000/reservation/" + data._id
    );
    // console.log('payment successfull',qrcode)
    await Reservation.findByIdAndUpdate(data._id,{$set:{qrcode:qrcode}})
    res.json({ status: "payment successfull", data, qrcode });
  } catch (error) {

    console.log("paymenterror",error);
  }
});

module.exports.reviews = asyncHandler(async(req,res)=>{
  try{
    const {message,rating,movieId,userId} = req.body
    const user = await UserModel.findById(userId.id)
    const posting = await Movies.findOneAndUpdate(
      { _id: movieId },
      {
        $push: {
          Review: {
            userName: user.name,
            rating: rating,
            message: message,
            date:new Date()
          },
        },
      }
    )
    console.log(posting)
  }catch(error){
   console.log(error,'this is the error from catch reviews')
  }
})

module.exports.getReview = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;

    const data = await Movies.findOne({ _id: id })
    
    // console.log(data?.Review?.reverse())
    res.status(200).json(data?.Review?.reverse());
  } catch (error) {}
});

module.exports.getUserHistory = asyncHandler(async(req,res)=>{
  try {
    let id = req.params.id  
    console.log(id,'666666')  
    Reservation.find({userId:id})
    .populate('movieId cinemaId').sort({bookedDate:-1})
    .exec((err, reservations) => {
      if (err) {
        console.log(err,'000');
      } else {
        
        res.status(200).json(reservations)
      }
    });
  } catch (error) {
    console.log(error,'444444444')
  }
})

module.exports.userlogout = asyncHandler(async(req,res)=>{
    console.log("jjjjjjjjjjjjjjjjjj")
    try{
      res.clearCookie("userToken",{path:"/"})
      res.json({status:true})
    }catch{
      res.json({status:false})
    }
})
  