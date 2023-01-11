const userController = require('../controllers/userController')
const express = require('express')

const redirectMiddleware = require('../customMiddlewares/redirectMiddleware')

const { body, validationResult } = require('express-validator');

const router = express.Router()

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').isEmail().withMessage('Please Enter Your Email')
        .custom((value) => {
            return User.findOne({email: value}).then(userDoc => {
                if(userDoc){
                    return Promise.reject('Email already exists')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please Enter Your Password'),

    ]
    ,userController.createUser)
router.route('/login').post(userController.login)
router.route('/logout').get(userController.logout)
router.route('/cart').get(redirectMiddleware, userController.getCartPage)

module.exports = router