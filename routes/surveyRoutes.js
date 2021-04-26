const express = require('express')
const router = express.Router()
const surveyController = require('../controllers/surveyControllers')
const requireLogin = require('../middlewares/requireLogin')
const checkCredits = require('../middlewares/checkCredits')

router.post('/surveys', requireLogin, checkCredits, surveyController.createSurvey)
router.get('/surveys/:surveyId/:choice', surveyController.feedback)
router.post('/surveys/webhooks', surveyController.webhooks)
router.get('/surveys', requireLogin, surveyController.listSurveys)

module.exports = router