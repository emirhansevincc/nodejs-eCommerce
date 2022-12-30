const productController = require('../controllers/productController')
const express = require('express')

const router = express.Router()

router.route('/').post(productController.createProduct)
router.route('/:slug').get(productController.getProductSingle)


module.exports = router