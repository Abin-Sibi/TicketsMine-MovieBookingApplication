const asyncHandler = require("express-async-handler");
const { trusted, Types } = require("mongoose");

const AdminModel = require("../Models/admin");
const movies = require("../Models/movies");
const Application = require("../Models/theatreModel");
const User = require('../Models/UserModel')
const { generateAdminToken } = require("../utils/generateToken");
const multer = require("multer");
const theatreModel = require("../Models/theatreModel");

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const Admin = await AdminModel.findOne({ email: email });
    if (!Admin) {
      res.json("Admin not found");
    } else {
      if (Admin.password !== password) {
        res.json("Please check your password");
      } else {
        let id = Admin._id;
        let tokenGenereted = await generateAdminToken(id);
        res.cookie("adminToken", tokenGenereted).json({
          id: Admin._id,
          email: Admin.email,
          token: tokenGenereted,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error?.status).json(error.message);
  }
});

const getCompanies = asyncHandler(async (req, res) => {
  try {
    const data = await Application.aggregate([
      {
        $match: {
          application:{$ne:null}
        },
      },
    ]);
    // const data = await Application.find({application:{$exists:true}})
    console.log(data,"getcompanies");
    res.json(data);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

const applicationApprove = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Application.findByIdAndUpdate(
      { _id: id },
      { isApproved: true }
    );
    res.json({ status: true });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

const applicationReject = asyncHandler(async(req,res)=>{
  try {
    const id = req.params.id;
    const result = await Application.findOneAndUpdate(
    {_id:id},
    {
      isRejected:true
    }
    ) 
    res.json({ status: true });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
})

const getAllTheatres = asyncHandler(async(req,res)=>{
  try {
    const companyData = await Application.find()
    console.log(companyData,"company getalltheatres")
    res.json(companyData)
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})

const getApprovedCompanies = asyncHandler(async(req,res)=>{
  try {
    const approvedData = await Application.find({isApproved:true})
    console.log("get approved comp ",approvedData)
    res.json(approvedData)
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})



const blockUser = asyncHandler(async(req,res)=>{
  try {
    let id = req.params.id
    await User.findByIdAndUpdate({_id:Types.ObjectId(id)},{isBlocked:true})
    res.json({status:true})
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})
const unblockUser = asyncHandler(async(req,res)=>{
  try {
    let id = req.params.id
    await User.findByIdAndUpdate({_id:Types.ObjectId(id)},{isBlocked:false})
    res.json({status:true})
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})

const adminlogout = asyncHandler(async(req,res)=>{
  console.log("jjjjjjjjjjjjjjjjjj")
  try{
    res.clearCookie("adminToken",{path:"/"})
    res.json({status:true})
  }catch{
    res.json({status:false})
  }
})

const addmovies = asyncHandler(async(req,res)=>{
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh")
  try {
    const moviedata = await movies(req.body).save()
    res.json({moviedata,status:true})
  } catch (error) {
    res.send(error.status).json(error.message)
  }
})


const moviePoster = asyncHandler(async(req,res)=>{
  try {
    console.log("Image route top movieposter");
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
      console.log("Image route movieposter");
  } catch (error) {
    console.log("Image end catcherr");
      res.status(error.status).json(error.message);
  }
})

module.exports = { adminLogin, getCompanies, applicationApprove,applicationReject ,getAllTheatres,getApprovedCompanies ,blockUser,unblockUser,addmovies,moviePoster,adminlogout};


