const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("Add password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@jasoncluster.hchz1z2.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

// const notes = [
//   {
//     content: "CSS is hard",
//     important: true
//   },
//   {
//     content: "MongoDB makes things easier",
//     important: false
//   }
// ]

// notes.forEach(n => {
//   const note = new Note(n)
//   note.save().then((res) => {
//     console.log(`note saved`);
//     mongoose.connection.close()
//   })
// })

console.log("Fetching all...")

Note.find({ important: true }).then((res) => {
  res.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
