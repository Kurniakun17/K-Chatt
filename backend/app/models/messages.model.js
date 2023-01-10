module.exports = mongoose => {
  const messagesSchema = mongoose.Schema({
    text:{
      type: String,
      min: 1,
    },
    from:{
      type: String,
      min: 4
    }
  })

  return mongoose.model("messages", messagesSchema)
} 