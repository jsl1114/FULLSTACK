const mongoose = require("mongoose")

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log("invalid inputs")
  process.exit(1)
}

const pw = process.argv[2]

const url = `mongodb+srv://admin:${pw}@jasoncluster.hchz1z2.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.set("strictQuery", false)
mongoose.connect(url).then(console.log("connected"))


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})
const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  Person.find({}).then((persons) => {
    const max = persons.length
    const newPerson = new Person({
      name: name,
      number: number,
      id: max + 1,
    })
    newPerson.save().then((res) => {
      console.log(`Added ${name} number ${number} to phonebook.`)
      mongoose.connection.close()
    })
  })
}

if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    console.log("phonebook:")
    res.forEach((p) => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}
