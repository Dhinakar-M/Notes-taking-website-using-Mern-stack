import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotes();
    }
  }, [isAuthenticated, user]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/notes/user/${user.id}`);
      setNotes(res.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(res.data.map(note => note.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
      setLoading(false);
    }
  };

  const addNote = async (noteData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/notes', {
        ...noteData,
        userId: user.id
      });
      
      setNotes([...notes, res.data]);
      
      // Update categories if new category
      if (!categories.includes(res.data.category)) {
        setCategories([...categories, res.data.category]);
      }
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note');
      return null;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/notes/${id}`, noteData);
      
      setNotes(notes.map(note => (note._id === id ? res.data : note)));
      
      // Update categories
      const uniqueCategories = [...new Set([...notes.map(note => note.category), res.data.category])];
      setCategories(uniqueCategories);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
      return null;
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      const updatedNotes = notes.filter(note => note._id !== id);
      setNotes(updatedNotes);
      
      // Update categories
      const uniqueCategories = [...new Set(updatedNotes.map(note => note.category))];
      setCategories(uniqueCategories);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
      return false;
    }
  };

  const getNotesByCategory = (category) => {
    if (!category || category === 'All') {
      return notes;
    }
    return notes.filter(note => note.category === category);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        categories,
        loading,
        error,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote,
        getNotesByCategory
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};