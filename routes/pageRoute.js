const pageController = require('../controllers/pageController')
const productController = require('../controllers/productController')

const express = require('express')

const router = express.Router()

router.route('/').get(productController.getAllProducts)
router.route('/fashion').get(pageController.getFashionPage)
router.route('/register').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)

module.exports = router