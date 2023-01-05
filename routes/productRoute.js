const productController = require('../controllers/productController')
const express = require('express')

const roleMiddleware = require('../customMiddlewares/roleMiddleware')

const router = express.Router()

router.route('/').post(roleMiddleware(['admin', 'seller']),productController.createProduct)
router.route('/:slug').get(productController.getProductSingle)
router.route('/').get(productController.getAllProducts)
router.route('/addCart').post(productController.addToCart)


module.exports = router