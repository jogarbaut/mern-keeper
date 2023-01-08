const Note = require("../models/note.model");

// Create a new note
module.exports.createNote = async (req, res) => {
  const {
    title,
    body,
    backgroundColor,
    pinned,
  } = req.body;

  try {
    const user_id = req.user._id;
    const note = await Note.create({
      title,
      body,
      backgroundColor,
      pinned,
      user_id
    })
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Get all notes
module.exports.getAllNotes = async (req, res) => {
  const user_id = req.user._id;
  const notes = await Note.find({ user_id }).sort({createdAt: -1})
  res.status(200).json(notes)
}

// Get single note
module.exports.getNote = async (req, res) => {
  const note = await Note.findOne({_id: req.params.id})
  if (!note) {
    return res.status(400).json({error: 'Note does not exist'})
  }
  res.status(200).json(note)
}

// Update a note
module.exports.updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate({_id: req.params.id}, {
    ...req.body
  })
  if (!note) {
    return res.status(400).json({error: 'Note does not exist'})
  }
  res.status(200).json(note)
}

// Delete a note
module.exports.deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({_id: req.params.id})
  if (!note) {
    return res.status(400).json({error: 'Note does not exist'})
  }
  res.status(200).json(note)
}