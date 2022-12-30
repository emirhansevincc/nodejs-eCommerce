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

exports.getAllProducts = async(req, res) => {
    try {
        const products = await Product.find()
        res.status(200).render('index.ejs', {
            products,
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}

exports.getProductSingle = async(req, res) => {
    try {
        const product = await Product.findOne({slug: req.params.slug})
        res.status(200).render('single.ejs', {
            product,
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}