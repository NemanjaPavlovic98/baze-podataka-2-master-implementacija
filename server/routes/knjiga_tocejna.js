const express = require("express");
const router = express.Router();
const controller = require("../controllers/knjiga_tocenja.controller");

router.get("/getKnjigaTocenja", controller.getKnjigaTocenja);
router.post("/postKnjigaTocenja", controller.postKnjigaTocenja);

module.exports = router;