const Category = require('../models/Category')

exports.createCategory = async(req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).redirect('/users/cart')
        req.flash("success", `Category '${category.name}' is created.`);
        
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error
        })
    }
}

exports.deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        req.flash("error", `Category '${category.name}' is deleted.`);
        res.status(200).redirect('/users/cart')
        
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error
        })
    }
}