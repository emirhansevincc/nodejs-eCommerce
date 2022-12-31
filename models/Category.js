const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug:{
        type: String,
        unique: true
    }
})

CategorySchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        strict: true,
        lower:true
    })
    next()
})

const Category = new mongoose.model('Category', CategorySchema)
module.exports = Category