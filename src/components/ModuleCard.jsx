import React from 'react';
import { modules, difficultyColors } from '../data/siteData';
import '../styles/ModuleCard.css';

const ModuleCard = ({ module, progress, onSelect, darkMode }) => {
  const totalChapters = module.chapters.length;
  const completedChapters = progress.completedChapters.size;
  const progressPercent = (completedChapters / totalChapters) * 100;

  const diffColor = difficultyColors[module.difficulty];

  return (
    <div className={`module-card ${darkMode ? 'dark' : ''}`} onClick={onSelect}>
      <div className="card-header">
        <div className="card-title-section">
          <h3>{module.name}</h3>
          <span 
            className="difficulty-badge"
            style={{
              backgroundColor: diffColor.bg,
              color: diffColor.text,
              borderColor: diffColor.badge
            }}
          >
            {module.difficulty === 'easy' && '🟢 Facile'}
            {module.difficulty === 'medium' && '🟡 Moyen'}
            {module.difficulty === 'hard' && '🔴 Difficile'}
          </span>
        </div>
        <div className="card-meta">
          <span className="chapters-count">📚 {totalChapters} chapitres</span>
          <span className="credits">⏱️ {module.credits} crédits</span>
        </div>
      </div>

      <p className="card-description">{module.description}</p>

      <div className="card-progress">
        <div className="progress-info">
          <span>{completedChapters}/{totalChapters} chapitres terminés</span>
          <span className="progress-percent">{Math.round(progressPercent)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: module.color
            }}
          />
        </div>
      </div>

      <button className="card-cta" onClick={onSelect}>
        Voir le module →
      </button>
    </div>
  );
};

export default ModuleCard;
