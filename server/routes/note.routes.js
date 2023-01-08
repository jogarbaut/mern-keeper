const NoteController = require('../controllers/note.controller');
const requireAuth = require('../middleware/requireAuth');

module.exports = (app) => {
  app.get('/api/note', requireAuth, NoteController.getAllNotes);
  app.get('/api/note/:id', requireAuth, NoteController.getNote);
  app.post('/api/note', requireAuth, NoteController.createNote);
  app.patch('/api/note/:id', requireAuth, NoteController.updateNote);
  app.delete('/api/note/:id', requireAuth, NoteController.deleteNote);
}