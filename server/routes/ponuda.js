const express = require("express");
const router = express.Router();
const controller = require("../controllers/ponuda.controller");

router.get("/getPonude", controller.getPonude);


module.exports = router;