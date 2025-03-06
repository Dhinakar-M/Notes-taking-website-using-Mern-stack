import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import './NoteItem.css';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button className="edit-btn" onClick={() => onEdit(note)}>
            <Edit size={16} />
          </button>
          <button className="delete-btn" onClick={() => onDelete(note._id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="note-content">
        <p>{note.content}</p>
      </div>
      
      <div className="note-footer">
        <span className="note-category">{note.category}</span>
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteItem;