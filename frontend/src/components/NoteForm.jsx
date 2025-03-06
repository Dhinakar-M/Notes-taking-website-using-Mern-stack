import React, { useState, useEffect, useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { X } from 'lucide-react';
import './NoteForm.css';

const NoteForm = ({ note, onClose, isEditing }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  
  const { addNote, updateNote, categories } = useContext(NoteContext);

  useEffect(() => {
    if (note && isEditing) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setCategory(note.category || '');
    }
  }, [note, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category.trim()) {
      setError('All fields are required');
      return;
    }
    
    const noteData = {
      title,
      content,
      category
    };
    
    let result;
    if (isEditing && note) {
      result = await updateNote(note._id, noteData);
    } else {
      result = await addNote(noteData);
    }
    
    if (result) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setError('');
  };

  return (
    <div className="note-form-overlay">
      <div className="note-form">
        <div className="note-form-header">
          <h2>{isEditing ? 'Edit Note' : 'Create New Note'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="category-input">
              <input
                type="text"
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter or select category"
                list="categories"
              />
              <datalist id="categories">
                {categories.map((cat, index) => (
                  <option key={index} value={cat} />
                ))}
              </datalist>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Note content"
              rows="6"
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {isEditing ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;