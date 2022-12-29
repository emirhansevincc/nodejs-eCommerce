const express = require('express')
const pageRoute = require('./routes/pageRoute')
const mongoose = require("mongoose");
const productRoute = require('./routes/productRoute')
const bodyParser = require('body-parser')

const app = express()

// Database Connection
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/Ecommerce');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Template Engine
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/', pageRoute)
app.use('/products', productRoute)


const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);    
})