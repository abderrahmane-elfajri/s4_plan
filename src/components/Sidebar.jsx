import React from 'react';
import { modules } from '../data/siteData';
import '../styles/Sidebar.css';

const Sidebar = ({ currentPage, onPageChange, onSelectModule, selectedModuleId, darkMode }) => {
  const isModuleDetailsPage = currentPage === 'module-details';

  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar-header">
        <h3>Modules</h3>
      </div>

      <div className="sidebar-content">
        {modules.map(module => (
          <button
            key={module.id}
            className={`sidebar-item ${
              isModuleDetailsPage && selectedModuleId === module.id ? 'active' : ''
            }`}
            onClick={() => {
              onPageChange('module-details', module.id);
            }}
            style={{
              borderLeftColor: isModuleDetailsPage && selectedModuleId === module.id ? module.color : 'transparent'
            }}
          >
            <span className="module-icon">📖</span>
            <span className="module-name">{module.shortName}</span>
            <span className="module-difficulty">
              {module.difficulty === 'easy' && '⭐'}
              {module.difficulty === 'medium' && '⭐⭐'}
              {module.difficulty === 'hard' && '⭐⭐⭐'}
            </span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="study-tip">
          <span className="tip-icon">💡</span>
          <p className="tip-text">Conseil: Étudier 30 mins par jour est plus efficace que 4 heures une fois par semaine.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
