const express = require('express')
const router = express.Router()
const surveyController = require('../controllers/surveyControllers')
const requireLogin = require('../middlewares/requireLogin')
const checkCredits = require('../middlewares/checkCredits')

router.post('/surveys', requireLogin, checkCredits, surveyController.createSurvey)
router.get('/surveys/feedback', surveyController.feedback)

module.exports = router