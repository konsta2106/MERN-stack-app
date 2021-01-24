//
const getUser = (req, res) => {
    res.send(req.user)
}

const logout = (req, res) => {
    req.logout()
    res.redirect('/')
}

const authRedirect = (req, res) => {
    res.redirect('/surveys')
}

module.exports = {
    getUser,
    logout,
    authRedirect
}
