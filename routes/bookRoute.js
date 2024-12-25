const express = require('express')
const router = express.Router()

const bookController = require('../controller/bookController')
const authenticateUser  = require('../middleware/authenticateUser ')
const authMiddleware = require('../middleware/authMiddleware');


router.post('/createbook',authenticateUser,bookController.createbook)
router.get('/getbook',authMiddleware(), bookController.getbook)
router.get('/getbookhistory',authenticateUser, bookController.getbookhistory)
router.post('/getbookStats', bookController.getbookStats)
router.post('/getbookStats2', bookController.getbookStats2)
router.post('/takenseat',bookController.takenseat)
router.delete('/cancel',bookController.cancel)

module.exports = router