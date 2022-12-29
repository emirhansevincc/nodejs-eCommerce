const pageController = require('../controllers/pageController')
const productController = require('../controllers/productController')

const express = require('express')

const router = express.Router()

router.route('/').get(productController.getAllProducts)
router.route('/fashion').get(pageController.getFashionPage)


module.exports = router