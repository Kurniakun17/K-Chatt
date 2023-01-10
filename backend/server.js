const express = require('express')
const db = require('./app/models')
const cors = require('cors')
const routers = express.Router()
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/auth', require('./app/routes/auth.route.js'))

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

db.mongoose.connect(db.url, mongooseConfig)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))