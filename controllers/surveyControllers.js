const mongoose = require('mongoose')
const Survey = mongoose.model('survey')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates')
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')

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
        console.log(error)
        console.log(req.user)
    }

}

const feedback = async (req, res) => {
    res.send('Thank you for voting')
}

const webhooks = async (req, res) => {
    const p = new Path('/api/v1/surveys/:surveyId/:choice')
    _.chain(req.body)
        .map((event) => {
            const match = p.test(new URL(event.url).pathname)
            if (match) {
                return {
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice
                }
            }

        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice}) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                  $elemMatch: { email: email, responded: false }
                }
              }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
              }).exec()
        })
        .value()


    res.send({})
}

const listSurveys = async (req, res) => {
    const surveys = await Survey.find({ userId: req.user.id})
        .select({recipients: false})

    res.send(surveys)
}

module.exports = {
    createSurvey,
    feedback,
    webhooks,
    listSurveys,
}