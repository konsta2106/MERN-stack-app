const mongoose = require('mongoose')
require('dotenv').config()

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connected to DB')
      } catch (error) {
        console.log(error)
      }    
}

module.exports = {
    connection
}
