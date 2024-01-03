const express = require('express');
// const authUser = require('../middleware/userAuthentication');
const {createNote,
  getNote,
  getNoteById,
  updateNote, deleteNote, shareNote} = require('../controllers/notes');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', createNote);
router.get('/', getNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.post('/:id/share', shareNote);

module.exports = router;
