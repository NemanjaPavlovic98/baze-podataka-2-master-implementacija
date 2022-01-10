const express = require("express");
const router = express.Router();
const controller = require("../controllers/mesto.controller");

router.get("/getMesta", controller.getMesta);
router.post("/postMesto", controller.postMesto);
router.get("/getUlica", controller.getUlica);
router.get("/getAdresa", controller.getAdresa);
router.get("/getOdrediste", controller.getAllSum);
router.delete("/deleteMesto/:id", controller.deleteMesto);
router.put("/updateMesto/:id", controller.updateMesto);


module.exports = router;