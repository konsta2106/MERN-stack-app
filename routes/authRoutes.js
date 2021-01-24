const express = require('express')
const passport = require('../auth/googleoauth')
const auth = require('../controllers/authControllers')
const requireLogin = require('../middlewares/requireLogin')

// Router
const router = express.Router()

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
router.get('/auth/google/callback', passport.authenticate('google'), auth.authRedirect)
router.get('/currentuser', auth.getUser)
router.get('/logout', auth.logout)

module.exports = router