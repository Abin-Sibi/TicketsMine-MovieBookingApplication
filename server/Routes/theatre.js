const { otpverifytheatre } = require("../Controllers/theatre");
const {register, login,application ,uploadLogo, didApply,addscreens,getscreens,addmovie,getScreenShows,editmovie,removemovie,theatrelogout} = require("../Controllers/theatre")
const {checkUser} = require("../Middlewares/theatreAuth")
var router = require("express").Router();

router.get("/theatrehome",checkUser)
router.post("/register",register)
router.post("/otpverifytheatre",otpverifytheatre)
router.post("/login",login)
router.get("/didApply/:id",didApply)
router.post("/application",application)
router.post("/addscreens",addscreens)
router.get("/getscreens/:id",getscreens)
router.get("/getScreenShows/:id/:title/:releasedate",getScreenShows)
router.post('/upload-file/:id',uploadLogo)
router.post('/addmovie',addmovie)
router.patch('/editmovie',editmovie)
router.patch('/removemovie',removemovie)
router.get("/logout",theatrelogout)

module.exports = router;