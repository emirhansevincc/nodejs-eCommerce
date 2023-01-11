const Product = require('../models/Product')

const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
    res.status(200).render('index.ejs', {
    })
}
exports.getFashionPage = (req, res) => {
    res.status(200).render('fashion')
}

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register.ejs')
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login.ejs')
}

exports.sendEmail = async(req, res) => {

    try {

        const mail = `
        <h2>Ecommerce Shop</h2>
        <hr/>
        <h3>From: ${req.body.name} / ${req.body.email}</h3>
        <br/>
        <p>MESSAGE : ${req.body.message}</p>
        `

        // create reusable transporter object using the default SMTP transport
        let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'emirhansvncc@gmail.com', // generated ethereal user
            pass: 'hwymyjtrsdmborlh', // generated ethereal password
        },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '<emirhansvncc@gmail.com>', // sender address
        to: "emirhan.sevinc22@hacettepe.edu.tr", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `${mail}`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        req.flash("success", "We Received your mail successfuly");
        await res.status(200).redirect('/')
        
    } catch (error) {
        req.flash("error", "We cannot get your mail!");
        await res.status(200).redirect('/')

    }
    
}