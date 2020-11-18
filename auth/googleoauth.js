const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
require('dotenv').config()

// Initiate user collection
const User = mongoose.model('users')

// Use of cookies
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})

// Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/v1/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then(existingUser => {
            if (existingUser) {
                console.log('User exist')
                done(null, existingUser)
            } else {
                new User({
                    googleId: profile.id
                })
                    .save()
                    .then(user => console.log(user))
                    .catch(error => console.log(error))
            }
        })
        .catch(error => console.log(error))
}))

module.exports = passport