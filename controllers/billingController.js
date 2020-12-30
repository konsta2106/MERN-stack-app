const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
require('dotenv').config()
const mongoose = require('mongoose')

const stripeCharge = async (req, res) => {
    try {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'eur',
            source: req.body.id,
            description: '5e for 5 credits',
        });
        req.user.credits += 5
        const user = await req.user.save()
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    stripeCharge
}