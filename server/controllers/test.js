//
const getTest = (req, res) => {
    res.send({
        "test": "ok"
    })
}

const getUser = (req, res) => {
    res.send(req.user)
}

const logout = (req, res) => {
    req.logout()
    res.send(req.user)
}

module.exports = {
    getTest,
    getUser,
    logout
}
