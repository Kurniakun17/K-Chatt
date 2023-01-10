const auth = require('../models').auth

exports.findUser = (req, res) => {
  const { username, password } = req.body
  
  auth.find({username: username}).then(data=>{
    if(data[0].password === password){
      return res.send({status: true})
    }
    res.send({status: false})
  })
  .catch(err => res.send({status: false}))
}

exports.addUser = (req, res) => {
  auth.create(req.body)
  .then(()=>res.send({message: "account succesfully created!"}))
  .catch(err => res.status(500).send({message: err.message}))
}

exports.getData = (req, res) => {
  auth.find().then(data => res.send({data: data}))
  .catch(err => res.status(500).send({message: err.message}))
}