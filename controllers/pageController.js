exports.getIndexPage = async(req, res) => {
    res.status(200).render('index.ejs', {
    })
}

exports.getFashionPage = (req, res) => {
    res.status(200).render('fashion')
}