var express = require("express");
var router = express.Router();
const { adminLogin, moviePoster, applicationReject } = require("../controllers/admin");
const {
  getCompanies,
  applicationApprove,
  banTheatre,
  unbanTheatre,
  getAllTheatres,
  getApprovedCompanies,
  addmovies,
  TheaterList,
  topReserved,
  unblockUser,
  blockUser,
  reservationDetails,
  getAllUsers,
  adminlogout
} = require("../controllers/admin");
const {verifyAdminToken} = require('../Middlewares/AdminAuth')


/* GET users listing. */
router.get('/',verifyAdminToken)

router.post("/login", adminLogin);

router.get("/getCompaniesInfo", getCompanies);

router.get("/applicationApprove/:id", applicationApprove);

router.get("/applicationReject/:id", applicationReject);

router.get("/banTheatre/:id", banTheatre);

router.get("/unbanTheatre/:id", unbanTheatre);

router.get("/getApplicationList", getAllTheatres);

router.get("/getApprovedCompanies", getApprovedCompanies);

router.get("/getAllUsers", getAllUsers);

router.get("/blockUser/:id", blockUser);

router.get("/unblockUser/:id", unblockUser);

router.post("/addmovies",addmovies)

router.get("/reservationDetails", reservationDetails);

router.get("/topReserved", topReserved);

router.get("/theaterList",TheaterList);

router.post("/upload-moviePoster/:id",moviePoster)

router.get("/logout",adminlogout)



module.exports = router;