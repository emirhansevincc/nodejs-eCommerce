const userController = require('../controllers/userController')
const express = require('express')

const redirectMiddleware = require('../customMiddlewares/redirectMiddleware')

const router = express.Router()

router.route('/signup').post(userController.createUser)
router.route('/login').post(userController.login)
router.route('/logout').get(userController.logout)
router.route('/cart').get(redirectMiddleware, userController.getCartPage)

module.exports = router