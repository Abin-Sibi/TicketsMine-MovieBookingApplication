var express = require("express");
var router = express.Router();
const { adminLogin, moviePoster, applicationReject } = require("../controllers/admin");
const {
  getCompanies,
  applicationApprove,
  getAllTheatres,
  getApprovedCompanies,
  addmovies,
  adminlogout
} = require("../controllers/admin");
const {verifyAdminToken} = require('../Middlewares/AdminAuth')


/* GET users listing. */
router.get('/',verifyAdminToken)

router.post("/login", adminLogin);

router.get("/getCompaniesInfo", getCompanies);

router.get("/applicationApprove/:id", applicationApprove);

router.get("/applicationReject/:id", applicationReject);

router.get("/getApplicationList", getAllTheatres);

router.get("/getApprovedCompanies", getApprovedCompanies);

router.post("/addmovies",addmovies)

router.post("/upload-moviePoster/:id",moviePoster)

router.get("/logout",adminlogout)



module.exports = router;