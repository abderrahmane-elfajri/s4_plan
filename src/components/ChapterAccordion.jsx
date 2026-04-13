import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../styles/ChapterAccordion.css';

const ChapterAccordion = ({ 
  chapter, 
  moduleColor,
  isCompleted,
  onToggleComplete,
  completedTopics,
  onToggleTopic,
  darkMode 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''} ${darkMode ? 'dark' : ''}`}>
      <button
        className={`accordion-header ${isCompleted ? 'completed' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ borderLeftColor: moduleColor }}
      >
        <div className="header-left">
          <ChevronDown 
            size={20} 
            className={`accordion-icon ${isOpen ? 'rotated' : ''}`}
          />
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggleComplete}
            onClick={(e) => e.stopPropagation()}
            className="chapter-checkbox"
          />
          <h4 className="chapter-title">{chapter.name}</h4>
          {isCompleted && <span className="completion-badge">✓ Terminé</span>}
        </div>
        <span className="topics-count">
          {chapter.topics.length} sujets
        </span>
      </button>

      {isOpen && (
        <div className="accordion-content">
          <div className="topics-list">
            {chapter.topics.map((topic, index) => (
              <label key={index} className="topic-item">
                <input
                  type="checkbox"
                  checked={completedTopics.has(`${chapter.id}-${index}`)}
                  onChange={() => onToggleTopic(`${chapter.id}-${index}`)}
                  className="topic-checkbox"
                />
                <span className="topic-name">{topic}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterAccordion;
