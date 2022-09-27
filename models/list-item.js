const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listItemSchema = new Schema( {
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true })

const ListItem = mongoose.model('list-item', listItemSchema)
module.exports = ListItem

