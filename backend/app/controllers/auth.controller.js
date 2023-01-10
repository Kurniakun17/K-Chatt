const auth = require('../models').auth
const bcrypt = require('bcrypt')

exports.findUser = (req, res) => {
  try{
    let { username, password } = req.body
  
    const user = auth.findOne({username: username}).then(data=>data)
  
    if(!user){
      return res.status(401).send({message: "Incorrect username or password!", status: false})
    }
  
    bcrypt.compare(password, user.password, (err, result) => {
      if(result) {
        return res.send({message:"login sucessfully",status: true})
      }
      return res.send({message: "Incorrect username or password!", status: false})
    })
  }catch(err){
    res.status(401).send(err.message)
  }
}

exports.addUser = async(req, res) => {
  const existingUsername = await auth.findOne({username: req.body.username})
  const existingEmail = await auth.findOne({email: req.body.email})

  if(!existingUsername && !existingUsername){
    const {password} = req.body
  
    bcrypt.hash(password, 10, (err, hash)=>{
      req.body.password = hash
    })
  
    auth.create(req.body)
    .then(()=>res.send({message: "account succesfully created!", status: true}))
    .catch(err => res.status(500).send({message: err.message, status: false}))
    return
  }
  
  if (existingUsername){
    return res.status(401).send({message: "username has been used!", status: false}) 
  }
  
  if(existingEmail){
    return res.status(401).send({message: "Email has been used!", status: false})
  }
}

exports.getData = (req, res) => {
  auth.find().then(data => res.send({data: data}))
  .catch(err => res.status(500).send({message: err.message}))
}