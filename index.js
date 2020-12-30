// Modules
const express = require('express')
require('./models/user')
const cookieSession = require('cookie-session')
const testRouter = require('./routes/testRoutes')
const authRouter = require('./routes/authRoutes')
const billingRouter = require('./routes/billingRoutes')
const mongoose = require('./database/mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

// Constants
const app = express()
const version = '/api/v1'
const port = process.env.PORT || 8000

// Connect to DB
mongoose.connection()

// Middlewares
app.use(bodyParser.json())
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
app.use(version, billingRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        resizeBy.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Listen to port
console.log(version)
app.listen(port, () => console.log(`Listening on port ${port}`))