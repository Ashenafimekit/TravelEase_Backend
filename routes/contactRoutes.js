const express = require("express");
const router = express.Router();

const conactController = require("../controller/contactController")

router.post("/",conactController.contact)

module.exports = router;
