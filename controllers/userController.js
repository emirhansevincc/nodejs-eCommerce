const User = require('../models/User')
const bcrypt = require('bcrypt');

exports.createUser = async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json({
            status: 'Success',
            user
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error
        })
    }
}

exports.login = async(req, res) => {
    try {
 
        // const {email, password} = req.body
        const email = req.body.email
        const password = req.body.password

        User.findOne({email: email}, (err, exist) => {
            if(exist){
                bcrypt.compare(password, exist.password, (err, ifSame) => {
                    if(ifSame){
                        req.session.userID = exist._id
                        res.status(200).redirect('/')
                    }
                })
            }else{
                console.log(err);
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error
        })
    }
}

exports.logout = async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}