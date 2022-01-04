const express = require("express");
const router = express.Router();
const controller = require("../controllers/jedinica_mere.controller");

router.get("/getJediniceMere", controller.getJedinicaMere);

module.exports = router;