// Modules
const express = require('express')
require('./models/user')
const cookieSession = require('cookie-session')
const testRouter = require('./routes/testRoutes')
const authRouter = require('./routes/authRoutes')
const mongoose = require('./database/mongoose')
const passport = require('passport')

// Constants
const app = express()
const version = '/api/v1'
const port = process.env.PORT || 8000

// Connect to DB
mongoose.connection()

// Middlewares
app.use(cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [
        process.env.COOKIE_KEY
    ]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(version, authRouter)
app.use(version, testRouter)

// Listen to port
console.log(version)
app.listen(port, () => console.log(`Listening on port ${port}`))