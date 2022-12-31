const userController = require('../controllers/userController')
const express = require('express')

const router = express.Router()

router.route('/signup').post(userController.createUser)

module.exports = router