exports.getIndexPage = (req, res) => {
    res.status(200).render('index')
}

exports.getFashionPage = (req, res) => {
    res.status(200).render('fashion')
}