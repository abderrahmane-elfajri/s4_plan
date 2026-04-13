import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ currentPage, onPageChange, darkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pages = [
    { id: 'home', label: 'Accueil' },
    { id: 'dashboard', label: 'Tableau de Bord' },
    { id: 'standing', label: 'Standing' },
    { id: 'progress', label: 'Progression' },
    { id: 'revision', label: 'Révision' },
    { id: 'notes', label: 'Notes' }
  ];

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handlePageChange('home')}>
          <div className="logo-icon">📚</div>
          <span>MIP S4</span>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {pages.map(page => (
            <li key={page.id}>
              <button
                className={`nav-link ${(currentPage === page.id || (page.id === 'standing' && currentPage === 'standing-module')) ? 'active' : ''}`}
                onClick={() => handlePageChange(page.id)}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button 
            className="theme-toggle"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Mode Clair' : 'Mode Sombre'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
