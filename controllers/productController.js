const Product = require('../models/Product')
const Category = require('../models/Category')
const User = require('../models/User')

exports.createProduct = async(req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            user: req.session.userID,
            category: req.body.category,
        })
        req.flash("success", `${product.name} created successfully`);
        res.redirect('/')
        
    } catch (error) {
        req.flash("error", `${product.name} is not created successfully !`);
        res.redirect('/')

    }
}

exports.getAllProducts = async(req, res) => {
    try {
        const categoryQuery = req.query.categories
        const category = await Category.findOne({slug: categoryQuery})
        const searchQuery = req.query.search

        let filter = {}
        if(categoryQuery){
            filter = {category: category._id}
        }

        if(searchQuery){
            filter = { name: searchQuery }
        } else if(!searchQuery && !categoryQuery){
            filter = { name: '', category: null }
        }

        const products = await Product.find({
            $or: [
                {name: {$regex: '.*' + filter.name + '.*', $options: 'i'}},
                {category: filter.category},
            ]
        }).sort('-createdDate').populate(['category', 'user'])

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
        const user = await User.findById(req.session.userID)
        const product = await Product.findOne({slug: req.params.slug})
        res.status(200).render('single.ejs', {
            product,
            user
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}

exports.addToCart = async(req, res) => {
    try {
        const user = await User.findById(req.session.userID)
        await user.products.push({_id: req.body.product_single_id})
        await user.save()

        res.status(200).redirect('/users/cart')
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const user = await User.findById(req.session.userID)
        await user.products.pull({_id: req.body.course_id})
        await user.save()

        res.status(200).redirect('/users/cart')
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}