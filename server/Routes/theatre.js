const { otpverifytheatre } = require("../Controllers/theatre");
const {register, login,application ,uploadLogo, didApply,addscreens,getscreens,theatrelogout} = require("../Controllers/theatre")
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
router.post('/upload-file/:id',uploadLogo)
router.get("/logout",theatrelogout)

module.exports = router;