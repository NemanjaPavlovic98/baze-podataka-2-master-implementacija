const express = require("express");
const router = express.Router();
const controller = require("../controllers/ponuda.controller");

router.get("/getPonude", controller.getPonude);
router.post("/postPonuda", controller.postPonuda);
router.post("/deletePonuda", controller.deletePonuda);


module.exports = router;