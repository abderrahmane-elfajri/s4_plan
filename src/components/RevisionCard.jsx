import React, { useState } from 'react';
import { Trash2, Edit2, Check } from 'lucide-react';
import '../styles/RevisionCard.css';

const RevisionCard = ({ 
  topic,
  module,
  difficulty = 'medium',
  onRemove,
  darkMode 
}) => {
  const [isDone, setIsDone] = useState(false);

  const diffColors = {
    easy: '#10B981',
    medium: '#F59E0B',
    hard: '#EF4444'
  };

  return (
    <div className={`revision-card ${isDone ? 'completed' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="card-header">
        <div className="card-title">
          <button 
            className="checkbox-btn"
            onClick={() => setIsDone(!isDone)}
          >
            {isDone && <Check size={18} />}
          </button>
          <div>
            <h4>{topic}</h4>
            <p className="module-name">{module}</p>
          </div>
        </div>

        <span 
          className="difficulty-tag"
          style={{ backgroundColor: diffColors[difficulty] }}
        >
          {difficulty === 'easy' && '🟢'}
          {difficulty === 'medium' && '🟡'}
          {difficulty === 'hard' && '🔴'}
        </span>
      </div>

      {isDone && (
        <div className="completion-message">
          ✨ Sujet révisé avec succès!
        </div>
      )}

      <button
        className="remove-btn"
        onClick={onRemove}
        title="Supprimer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default RevisionCard;
