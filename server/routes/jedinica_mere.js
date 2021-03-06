const express = require("express");
const router = express.Router();
const controller = require("../controllers/jedinica_mere.controller");

router.get("/getJediniceMere", controller.getJedinicaMere);
router.post("/postJediniceMere", controller.postJedinicaMere);
router.put("/updateJedinicaMere/:id", controller.updateJedinicaMere);
router.delete("/deleteJedinicaMere/:id", controller.deleteJedinicaMere);

module.exports = router;