const express = require("express");
const router = express.Router();
const controller = require("../controllers/otpremnica.controller");

router.get("/getOtpremnice", controller.getOtpremnice);
router.post("/postOtpremnica", controller.postOtpremnica);


module.exports = router;