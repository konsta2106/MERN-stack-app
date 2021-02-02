const mongoose = require('mongoose')
const Survey = mongoose.model('survey')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates')

const createSurvey = async (req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
        title: title,
        body: body,
        subject: subject,
        recipients: recipients.split(',').map(email => {
            return { email: email.trim() }
        }),
        userId: req.user.id,
        dateSent: Date.now()
    })

    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
        await mailer.sent()
        await survey.save()
        req.user.credits -= 1
        const user = await req.user.save()
    
        res.send(user)
    } catch (error) {
        res.status(422).send(error)
    }

}

const feedback = async (req, res) => {
    res.send('Thank you for voting')
}

module.exports = {
    createSurvey,
    feedback
}