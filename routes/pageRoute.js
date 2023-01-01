const pageController = require('../controllers/pageController')
const productController = require('../controllers/productController')

const userMiddleware = require('../customMiddlewares/userMiddleware')

const express = require('express')

const router = express.Router()

router.route('/').get(productController.getAllProducts)
router.route('/fashion').get(pageController.getFashionPage)
router.route('/register').get(userMiddleware, pageController.getRegisterPage)
router.route('/login').get(userMiddleware, pageController.getLoginPage)

module.exports = router