const express = require('express')
const passport = require('../auth/googleoauth')
const test = require('../controllers/test')

// Router
const router = express.Router()

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
router.get('/auth/google/callback', passport.authenticate('google'))
router.get('/currentuser', test.getUser)
router.get('/logout', test.logout)

module.exports = router