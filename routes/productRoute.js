const productController = require('../controllers/productController')
const express = require('express')

const router = express.Router()

router.route('/').post(productController.createProduct)


module.exports = router