const express = require("express");
const router = express.Router();
const controller = require("../controllers/jedinica_mere.controller");

router.get("/getJediniceMere", controller.getJedinicaMere);
router.post("/postJediniceMere", controller.postJedinicaMere);

module.exports = router;