const express = require('express')
const db = require('./app/models/index.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const socket = require('socket.io')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
  origin:["http://localhost:5173"],
  credentials: true
}))
app.use(cookieParser())

app.use('/auth', require('./app/routes/auth.route.js'))
app.use('/messages', require('./app/routes/messages.route.js'))

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

db.mongoose.connect(db.url, mongooseConfig)

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const io = socket(server, {
  cors:{
    origin:"http://localhost:5173",
    credentials: true
  }
}) 

io.on('connection', socket => {
  socket.on("send-msg", data => {
    console.log("ketrigger gais");
    socket.broadcast.emit("received-msg", data)
  })
})