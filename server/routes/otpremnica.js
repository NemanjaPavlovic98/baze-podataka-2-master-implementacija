const express = require("express");
const router = express.Router();
const controller = require("../controllers/otpremnica.controller");

router.get("/getOtpremnice", controller.getOtpremnice);


module.exports = router;