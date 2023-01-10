const Messages = require('../models/index').messages
exports.sendMessage = (req, res) => {
  Messages.create(req.body)
  .then(data => {
    return res.send({messages: "message sent"})
  })
  .catch(err => res.status(500).send({message: err.message}))
}

exports.getMessages = (req, res) => {
  Messages.find()
  .then(data => res.send({messages: "messages sucessfully retrieved", data:data}))
  .catch(err => res.status(500).send({messaegs: err.message}))
}