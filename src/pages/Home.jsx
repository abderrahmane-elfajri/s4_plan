import React from 'react';
import { modules } from '../data/siteData';
import ModuleCard from '../components/ModuleCard';
import '../styles/Home.css';

const Home = ({ onPageChange, progress, darkMode }) => {
  const stats = {
    totalModules: modules.length,
    totalChapters: modules.reduce((sum, m) => sum + m.chapters.length, 0),
    completedChapters: Object.values(progress).reduce((sum, p) => sum + p.completedChapters.size, 0)
  };

  return (
    <div className={`home-page ${darkMode ? 'dark' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Plateforme d'Étude MIP S4</h1>
            <h2>Développement Informatique</h2>
            <p className="hero-subtitle">
              Votre assistant d'études complet pour maîtriser tous les modules du semestre 4
            </p>
            <p className="hero-description">
              Organisez votre révision, traquez votre progression et préparez-vous aux examens avec confiance.
            </p>

            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => onPageChange('dashboard')}
              >
                Commencer à Étudier
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => onPageChange('dashboard')}
              >
                Voir les Modules
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-placeholder">
              <div className="floating-card card-1">📚</div>
              <div className="floating-card card-2">💻</div>
              <div className="floating-card card-3">📊</div>
              <div className="floating-card card-4">✅</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{stats.totalModules}</div>
            <div className="stat-label">Modules d'Étude</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.totalChapters}</div>
            <div className="stat-label">Chapitres Totaux</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {Math.round((stats.completedChapters / stats.totalChapters) * 100)}%
            </div>
            <div className="stat-label">Progression Globale</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">Difficile</div>
            <div className="stat-label">Module Challengeant</div>
          </div>
        </div>
      </section>

      {/* Featured Modules */}
      <section className="featured-modules">
        <h2>Tous les Modules du Semestre</h2>
        <div className="modules-grid">
          {modules.map(module => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={progress[module.id] || { completedChapters: new Set(), completedTopics: new Set() }}
              onSelect={() => onPageChange('module-details', module.id)}
              darkMode={darkMode}
            />
          ))}
        </div>
      </section>

      {/* Motivational Section */}
      <section className="motivation-section">
        <div className="motivation-container">
          <h2>🌟 Pourquoi Cette Plateforme?</h2>
          <div className="motivation-grid">
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <h3>Tout en Un Endroit</h3>
              <p>Tous les modules, chapitres et sujets du S4 organisés logiquement</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Tracer Votre Progrès</h3>
              <p>Voyez votre progression et restez motivé vers vos objectifs</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💡</div>
              <h3>Prendre des Notes</h3>
              <p>Annotez et révisez les sujets difficiles quand vous en avez besoin</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⏰</div>
              <h3>Plan d'Étude</h3>
              <p>Suivez un calendrier optimisé pour une étude efficace</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Prêt à commencer votre voyage d'étude?</h2>
          <p>Navigrez à votre tableau de bord et explorez les modules dès maintenant</p>
          <button 
            className="btn btn-large"
            onClick={() => onPageChange('dashboard')}
          >
            Aller au Tableau de Bord →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
