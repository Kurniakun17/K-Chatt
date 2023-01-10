const db = require('../config/database')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

module.exports = {
  url: db.url,
  mongoose: mongoose,
  auth: require('./auth.model')(mongoose)
}