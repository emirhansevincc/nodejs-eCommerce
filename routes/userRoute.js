const userController = require('../controllers/userController')
const express = require('express')

const router = express.Router()

router.route('/signup').post(userController.createUser)
router.route('/login').post(userController.login)
router.route('/logout').get(userController.logout)

module.exports = router