const mongoose = require('mongoose')

const model = new mongoose.Schema({
  username: {
    type: String,
    minLength: 5,
    required: true,
  },
  favoriteGenre: {
    type: String,
  },
})

module.exports = mongoose.model('User', model)
