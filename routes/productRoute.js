const productController = require('../controllers/productController')
const express = require('express')

const roleMiddleware = require('../customMiddlewares/roleMiddleware')

const router = express.Router()

router.route('/').post(roleMiddleware(['admin']),productController.createProduct)
router.route('/:slug').get(productController.getProductSingle)
router.route('/').get(productController.getAllProducts)


module.exports = router