import React from 'react';
import '../styles/StatsSection.css';

const StatsSection = ({ stats, darkMode }) => {
  return (
    <section className={`stats-section ${darkMode ? 'dark' : ''}`}>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.totalModules}</h3>
            <p>Modules</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-content">
            <h3>{stats.totalChapters}</h3>
            <p>Chapitres</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completedChapters}</h3>
            <p>Complétés</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>{Math.round(stats.overallProgress)}%</h3>
            <p>Progression Global</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>{stats.streak}</h3>
            <p>Jours d'Étude</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.topicsLearned}</h3>
            <p>Sujets Étudiés</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
