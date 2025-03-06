import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import './Home.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);

  const toggleNoteForm = () => {
    setIsNoteFormOpen(!isNoteFormOpen);
  };

  return (
    <div className="home-container">
      <Sidebar 
        setSelectedCategory={setSelectedCategory} 
        selectedCategory={selectedCategory}
        toggleNoteForm={toggleNoteForm}
      />
      <div className="main-content">
        <NoteList selectedCategory={selectedCategory} />
      </div>
      
      {isNoteFormOpen && (
        <NoteForm 
          onClose={() => setIsNoteFormOpen(false)} 
          isEditing={false}
        />
      )}
    </div>
  );
};

export default Home;