// Modules
const express = require('express')
const test = require('../controllers/test')

// Constants
const router = express.Router()

// Routes
router.get('/', test.getTest)
router.get('/test', (req, res) => {
    res.sendStatus(200)
    console.log()
})

// Exports
module.exports = router