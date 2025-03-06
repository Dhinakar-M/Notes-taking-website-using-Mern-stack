import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';
import './NoteList.css';

const NoteList = ({ selectedCategory }) => {
  const { getNotesByCategory, loading, deleteNote } = useContext(NoteContext);
  const [editingNote, setEditingNote] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredNotes = getNotesByCategory(selectedCategory);

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  return (
    <div className="note-list-container">
      <div className="note-list-header">
        <h2>{selectedCategory === 'All' ? 'All Notes' : `${selectedCategory} Notes`}</h2>
        <span className="note-count">{filteredNotes.length} notes</span>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="no-notes">
          <p>No notes found in this category.</p>
        </div>
      ) : (
        <div className="note-grid">
          {filteredNotes.map(note => (
            <NoteItem
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <NoteForm
          note={editingNote}
          isEditing={!!editingNote}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default NoteList;