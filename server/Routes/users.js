
const {register, login ,mobile,otp,otpverify,otpforgotpassword,newpassword,userlogout, getMovies,getmovieById} = require("../Controllers/AuthControllers")
const {checkUser} = require("../Middlewares/AuthMiddlewares")
var router = require("express").Router();

router.get("/",checkUser)
router.post("/register",register)
router.post("/login",login)
router.post("/mobile",mobile)
router.post("/otp",otp)
router.post("/otpverify",otpverify)
router.post("/otpforgotpassword",otpforgotpassword)
router.post("/newpassword",newpassword)
router.get("/getMovies",getMovies)
router.get("/getmovieById/:id",getmovieById)
router.get("/logout",userlogout)

module.exports = router;
