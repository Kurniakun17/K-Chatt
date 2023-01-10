require('dotenv').config()

const auth = require('../models/index').auth
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async(req, res) => {
  try{
    let { username, password } = req.body

    const user = await auth.findOne({username: username})
  
    if(!user){
      return res.status(401).send({message: "Incorrect username or password!", status: false})
    }
  
    bcrypt.compare(password, user.password, (err, result) => {
      const maxAge = 2*60*24;
      if(err){
        return res.send(500).send({message: err.message})
      }
      if(result) {
        const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_KEY, {expiresIn: maxAge},)
        res.cookie("jwt", accessToken, {
          withCredentials: true,
          httpOnly: false,
          maxAge: maxAge*1000
        })
        return res.send({message:"login sucessfully", status: true})
      }
      return res.send({message: "Incorrect username or password!", status: false})
    })
  }catch(err){
    res.status(401).send(err.message)
  }
}

exports.register = async(req, res) => {
  const existingUsername = await auth.findOne({username: req.body.username})
  const existingEmail = await auth.findOne({email: req.body.email})

  if(!existingUsername && !existingUsername){
    const {password} = req.body
  
    bcrypt.hash(password, 10, (err, hash)=>{
      if(err){
        res.status(401).send({message: err.message})
      }

      req.body.password = hash
      
      auth.create(req.body)
        .then(()=>res.send({message: "account succesfully created!", status: true}))
        .catch(err => res.status(500).send({message: err.message, status: false}))
        return
    })
  }
  
  if (existingUsername){
    return res.status(401).send({message: "username has been used!", status: false}) 
  }
  
  if(existingEmail){
    return res.status(401).send({message: "Email has been used!", status: false})
  }
}

exports.validateToken = (req, res) => {
  const {token}
}