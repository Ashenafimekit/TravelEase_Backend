const express = require("express");
const router = express.Router();

const busController = require("../controller/busController");

router.post("/addbus",busController.addbus)
router.get("/getbus",busController.getbus)
router.post("/filter",busController.filter)

module.exports = router;
