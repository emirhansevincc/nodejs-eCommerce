module.exports = (getRole) => {
    return (req, res, next) => {
        const role = req.body.role
        if(getRole.includes(role)){next()}
        else{ res.status(401).send('There is a problem!') }
    }
}