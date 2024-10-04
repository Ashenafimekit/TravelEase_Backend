const express = require('express')
const router = express.Router()

const bookController = require('../controller/bookController')
const authenticateUser  = require('../middleware/authenticateUser ')
const authMiddleware = require('../middleware/authMiddleware');


router.post('/createbook',authenticateUser,bookController.createbook)
router.get('/getbook',authMiddleware('admin'), bookController.getbook)
router.get('/getbookhistory',authenticateUser, bookController.getbookhistory)
router.post('/takenseat',bookController.takenseat)
router.delete('/cancel',bookController.cancel)

module.exports = router