const Product = require('../models/Product')

exports.createProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({
            status: 'Success',
            product
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}