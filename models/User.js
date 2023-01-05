const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        enum: ['customer', 'admin', 'seller'],
        type: String,
        default: 'customer'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        this.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User