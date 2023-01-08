const mongoose = require("mongoose");

const Schema = mongoose.Schema

const noteSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: false,
  },
  backgroundColor: {
    type: String,
    required: false,
  },
  pinned: {
    type: Boolean,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('Note', noteSchema);