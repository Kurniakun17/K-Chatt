const {isEmail} = require('validator')
module.exports = mongoose => {
  const AuthSchema = mongoose.Schema({
    username:{
      type: String,
      required: true,
      min: 4,
      max: 20,
      unique: true,
    },
    email:{
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate:{
        validator: isEmail,
        message: props => `${props.value} is not a valid email`
      }
    },
    password:{
      type: String,
      required: true,
      min: 6
    }
  })

  return mongoose.model("auth", AuthSchema)
}