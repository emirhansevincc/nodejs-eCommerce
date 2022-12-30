const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        required: true,
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    slug:{
        type: String,
        unique: true
    }
})

ProductSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        strict: true,
        lower:true
    })
    next()
})

const Product = new mongoose.model('Product', ProductSchema)
module.exports = Product