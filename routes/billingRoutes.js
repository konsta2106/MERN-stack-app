// Modules
const express = require('express')
const billingController = require('../controllers/billingController')
const requireLogin = require('../middlewares/requireLogin')

// Constants
const router = express.Router()

// Routes
router.post('/stripe', requireLogin, billingController.stripeCharge)


// Exports
module.exports = router