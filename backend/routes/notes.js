import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// @route   GET /api/notes/user/:userId
// @desc    Get all notes for a user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/notes
// @desc    Create a note
// @access  Public
router.post('/', async (req, res) => {
  const { title, content, category, userId } = req.body;
  
  try {
    const newNote = new Note({
      title,
      content,
      category,
      user: userId
    });
    
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/notes/:id
// @desc    Get a note by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Public
router.put('/:id', async (req, res) => {
  const { title, content, category } = req.body;
  
  try {
    let note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Update note
    note.title = title;
    note.content = content;
    note.category = category;
    note.updatedAt = Date.now();
    
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;