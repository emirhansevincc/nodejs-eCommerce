const express = require('express')
const pageRoute = require('./routes/pageRoute')
const mongoose = require("mongoose");
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

// Database Connection
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/Ecommerce');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'my_keyboard_key',
    resave: false,
    saveUninitialized: true,
}))

// Template Engine
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


global.ifUserIn = null
app.use('*', (req, res, next) => {
    ifUserIn = req.session.userID
    next()
})
app.use('/', pageRoute)
app.use('/products', productRoute)
app.use('/category', categoryRoute)
app.use('/users', userRoute)


const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);    
})