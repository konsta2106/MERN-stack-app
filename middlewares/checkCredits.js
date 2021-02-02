module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(401).send({
            error: 400,
            message: 'Not enough credits'
        })
    }
    next()
}