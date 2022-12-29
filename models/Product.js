const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        required: true,
        unique: true,
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
})

const Product = new mongoose.model('Product', ProductSchema)
module.exports = Product