const Product = require('../models/Product')
const Category = require('../models/Category')

exports.createProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.redirect('/')
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}

exports.getAllProducts = async(req, res) => {
    try {
        const categoryQuery = req.query.categories
        const category = await Category.findOne({slug: categoryQuery})

        let filter = {}
        if(categoryQuery){
            filter = {category: category._id}
        }


        const products = await Product.find(filter).sort('-createdDate')


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