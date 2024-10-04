const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const user = require("../models/user");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getusers", userController.getusers);
router.delete("/deleteuser", userController.deleteuser);

module.exports = router;
