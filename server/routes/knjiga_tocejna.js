const express = require("express");
const router = express.Router();
const controller = require("../controllers/knjiga_tocenja.controller");

router.get("/getKnjigaTocenja", controller.getKnjigaTocenja);
router.post("/postKnjigaTocenja", controller.postKnjigaTocenja);
router.get("/getKnjigaTocenjaOsnovno", controller.getKnjigaTocenjaOsnovno);
router.delete("/deleteKnjigaTocenja/:id", controller.deleteKnjigaTocenja);

module.exports = router;