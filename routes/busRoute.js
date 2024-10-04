const express = require("express");
const router = express.Router();

const busController = require("../controller/busController");
const authMiddleware = require('../middleware/authMiddleware');


router.post("/addbus",authMiddleware('admin'),busController.addbus)
router.get("/getbus",busController.getbus)
router.post("/filter",busController.filter)
router.get("/getbusadmin" ,busController.getbusadmin)
router.delete("/deletebus", busController.deletebus)
router.post("/searchbus", busController.searchbus)

module.exports = router;
