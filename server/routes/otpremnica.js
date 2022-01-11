const express = require("express");
const router = express.Router();
const controller = require("../controllers/otpremnica.controller");

router.get("/getOtpremnice", controller.getOtpremnice);
router.post("/postOtpremnica", controller.postOtpremnica);
router.delete("/deleteOtpremnica/:id", controller.deleteOtpremnica);
router.put("/updateOtpremnica/:id", controller.updateOtpremnica);


module.exports = router;