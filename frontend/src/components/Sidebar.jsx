import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NoteContext } from '../context/NoteContext';
import { LogOut, User, Plus } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ setSelectedCategory, selectedCategory, toggleNoteForm }) => {
  const { user, logout } = useContext(AuthContext);
  const { categories } = useContext(NoteContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes App</h2>
        <div className="user-info">
          <User size={18} />
          <span>{user?.name || 'User'}</span>
        </div>
      </div>
      
      <div className="sidebar-content">
        <button className="new-note-btn" onClick={toggleNoteForm}>
          <Plus size={18} />
          <span>New Note</span>
        </button>
        
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li 
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => setSelectedCategory('All')}
            >
              All Notes
            </li>
            {categories.map((category, index) => (
              <li 
                key={index}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;