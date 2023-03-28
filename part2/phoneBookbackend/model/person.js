const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

console.log("Connecting to", url)

mongoose
  .connect(url)
  .then((res) => {
    console.log("connected to MongoDB")
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
