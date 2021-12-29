const express = require("express");
const router = express.Router();
const controller = require("../controllers/mesto.controller");

router.get("/getMesta", controller.getMesta);
router.get("/getUlica", controller.getUlica);
router.get("/getAdresa", controller.getAdresa);
router.get("/getOdrediste", controller.getAllSum);


module.exports = router;