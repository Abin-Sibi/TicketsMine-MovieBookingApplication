const TheatreModel = require("../Models/theatreModel");
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const { Types } = require("mongoose");
const multer = require('multer');
require ("dotenv").config()

const maxAge = 3*24*60*60
const createTheatreToken = (id,isApproved)=>{
    return jwt.sign({id,isApproved},process.env.theatreToken,{
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
        const token = createTheatreToken(user._id,user.isApproved);

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
        const token = createTheatreToken(user._id,user.isApproved);

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

    module.exports.addmovie = asyncHandler(async (req, res) => {
      const {values,theatreId,screenName}= req.body
      
        try {
          
          const data = await TheatreModel.findOne({
            Screens: { $elemMatch: { screenname: screenName } },
          }).select("Screens");

          const gotScreen = data.Screens.filter((val) => val.screenname === screenName);
          console.log(values,theatreId,screenName,gotScreen[0].screenname,"hihihihihiih")
          const updatingSeats = await TheatreModel.updateOne(
            {
              _id: theatreId.id,
              Screens: { $elemMatch: { screenname: gotScreen[0].screenname } },
            },
            { $push: { "Screens.$.showInfo": values } }
          );
          console.log("hhheeeeeeeeeee")
          // let screeninfo = await TheatreModel.updateOne({_id:theatreId},{$addToSet:{Movie:values}})
          console.log(gotScreen,'pppppppppp')
          //  console.log(screeninfo); 
          // res.json({id:screeninfo._id,status:true});
          res.json({ status: "true" });
        } catch (error) {
          res.send(error.status).json(error.message);
        }
      });

      // module.exports.getScreenShows = asyncHandler(async (req, res) => {
      //   const movieId= req.params.id
      //   const movieTitle = req.params.title
      //   const releasedate = req.params.releasedate
        
      //     try {
      //       console.log(movieId,movieTitle,releasedate,'the screhhhhhenifo')
      //       const data = await TheatreModel.find(
      //         { "Screens.showInfo.moviename": movieTitle },
      //         { "Screens.showInfo.$": 1, "Screens.screenname": 1,"application.name": 1 }
      //       );
      //       res.json({data})
      //     } catch (error) {
      //       res.send(error.status).json(error.message);
      //     }
      //   });

      // module.exports.getScreenShows = asyncHandler(async (req, res) => {
      //   const movieTitle = req.params.title;
      //   const releaseDate = req.params.releasedate;
      
      //   try {
      //     const data = await TheatreModel.aggregate([
      //       // Match documents where at least one screen shows the given movie
      //       {
      //         $match: {
      //           "Screens.showInfo.moviename": movieTitle
      //         }
      //       },
      //       // Unwind the Screens array so that each screen has its own document
      //       { $unwind: "$Screens" },
      //       // Match documents where the screen shows the given movie
      //       {
      //         $match: {
      //           "Screens.showInfo.moviename": movieTitle
      //         }
      //       },
      //       // Project only the screenname and the matching showInfo
      //       {
      //         $project: {
      //           "application.name":1,
      //           "Screens.screenname": 1,
      //           showInfo: {
      //             $filter: {
      //               input: "$Screens.showInfo",
      //               as: "show",
      //               cond: {
      //                 $and: [
      //                   { $eq: ["$$show.moviename", movieTitle] }
      //                 ]
      //               }
      //             }
      //           }
      //         }
      //       }
      //     ]);
      //     console.log(data,"ggggggggggggg")
      //     res.json({ data });
      //   } catch (error) {
      //     res.status(500).json({ error: "Internal server error" });
      //   }
      // });

      // module.exports.getScreenShows = asyncHandler(async (req, res) => {
      //   const movieId = req.params.id;
      //   const movieTitle = req.params.title;
      //   const releaseDate = req.params.releasedate;
      
      //   try {
      //     const data = await TheatreModel.aggregate([
      //       // Match documents where at least one screen shows the given movie
      //       {
      //         $match: {
      //           "Screens.showInfo.moviename": movieTitle
      //         }
      //       },
      //       // Unwind the Screens array so that each screen has its own document
      //       { $unwind: "$Screens" },
      //       // Match documents where the screen shows the given movie
      //       {
      //         $match: {
      //           "Screens.showInfo.moviename": movieTitle
      //         }
      //       },
      //       // Project only the application name, screenname, and matching showInfo
      //       {
      //         $project: {
      //           "application.name": 1,
      //           "Screens.screenname": 1,
      //           showInfo: {
      //             $filter: {
      //               input: "$Screens.showInfo",
      //               as: "show",
      //               cond: {
      //                 $and: [
      //                   { $eq: ["$$show.moviename", movieTitle] }
      //                 ]
      //               }
      //             }
      //           }
      //         }
      //       },
      //       // Group the documents by application name and combine the screen names
      //       {
      //         $group: {
      //           _id: "$application.name",
      //           Screens: {
      //             $push: {
      //               screenname: "$Screens.screenname",
      //               showInfo: {
      //                 $arrayElemAt: [
      //                   {
      //                     $filter: {
      //                       input: "$showInfo",
      //                       as: "show",
      //                       cond: {
      //                         $eq: ["$$show.moviename", "$Screens.screenname"]
      //                       }
      //                     }
      //                   },
      //                   0
      //                 ]
      //               }
      //             }
      //           }
      //         }
      //       }
      //     ]);
      
      //     res.json({ data });
      //   } catch (error) {
      //     res.status(500).json({ error: "Internal server error" });
      //   }
      // });

      module.exports.getScreenShows = asyncHandler(async (req, res) => {
        const movieId = req.params.id;
        const movieTitle = req.params.title;
        const releaseDate = req.params.releasedate;
      
        try {
          const data = await TheatreModel.aggregate([
            {
              $match: {
                "Screens.showInfo.moviename": movieTitle
              }
            },
            { $unwind: "$Screens" },
            {
              $match: {
                "Screens.showInfo.moviename": movieTitle
              }
            },
            {
              $project: {
                _id:1,
                "application.name": 1,
                "Screens.screenname": 1,
                showInfo: {
                  $filter: {
                    input: "$Screens.showInfo",
                    as: "show",
                    cond: {
                      $and: [
                        { $eq: ["$$show.moviename", movieTitle] }
                      ]
                    }
                  }
                }
              }
            },
            {
              $group: {
                _id: {
                  theatreId:"$_id",
                  applicationName: "$application.name",
                  screenName: "$Screens.screenname"
                },
                showInfo: { $push: "$showInfo" }
              }
            },
            {
              $group: {
                // theatreId:"$_id.theatreId",
                _id: "$_id.applicationName",
                screens: {
                  $push: {
                    theatreId:"$_id.theatreId",
                    screenname: "$_id.screenName",
                    showInfo: "$showInfo"
                  }
                }
              }
            }
          ]);
         console.log(data,'dddddddddddd')
          res.json({ data });
        } catch (error) {
          res.status(500).json({ error: "Internal server error" });
        }
      });
      

 module.exports.editmovie = asyncHandler(async(req,res)=>{
        const { edit,editValues, theatreId, screenName, showTime } = req.body;
        console.log(req.body)
        try{
           const data = await TheatreModel.updateOne(
          { _id: Types.ObjectId(theatreId.id), "Screens.screenname": screenName,"Screens.showInfo":{
            $elemMatch: {
                moviename: editValues.moviename,
                showtime: editValues.showtime
            }
        }
},
          { $set: { "Screens.$[s].showInfo.$[elem].ticketprice":edit.ticketprice,
                    "Screens.$[s].showInfo.$[elem].showtime": edit.showtime,
                    "Screens.$[s].showInfo.$[elem].moviename":edit.moviename} },
          { "arrayFilters": [ { "s.screenname": screenName },
          { "elem.showtime": editValues.showtime },
           ] }
        )
        res.json({data})
        }catch(error){
          console.log(error,"hihqqwwq")
          res.status(500).json({ error: "Internal server error" });
        }
       
        // return res.json({ status: true, message: 'Show added successfully' });
      });

      
      module.exports.removemovie = asyncHandler(async(req,res)=>{
        const { theatreId,delDetails} = req.body;
        console.log(req.body)
        try{
          const data = await TheatreModel.updateOne(
            { _id: Types.ObjectId(theatreId.id), "Screens.screenname": delDetails.screenname },
            { $pull: { "Screens.$.showInfo": { showtime: delDetails.showtime } } }
        )
        res.json({data})
        }catch(error){
          console.log(error,"hihqqwwq")
          res.status(500).json({ error: "Internal server error" });
        }
       
        // return res.json({ status: true, message: 'Show added successfully' });
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



  