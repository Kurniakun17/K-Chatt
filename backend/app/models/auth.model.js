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
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true,
      min: 8
    }
  })

  return mongoose.model("auth", AuthSchema)
}