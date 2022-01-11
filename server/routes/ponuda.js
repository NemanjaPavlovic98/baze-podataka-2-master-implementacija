const express = require("express");
const router = express.Router();
const controller = require("../controllers/ponuda.controller");

router.get("/getPonude", controller.getPonude);
router.post("/postPonuda", controller.postPonuda);
router.post("/deletePonuda", controller.deletePonuda);
router.get("/getPonuda/:id", controller.getPonuda);
router.put("/updatePonuda/:id", controller.updatePonuda);


module.exports = router;