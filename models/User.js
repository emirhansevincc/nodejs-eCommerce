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

UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', UserSchema)
module.exports = User