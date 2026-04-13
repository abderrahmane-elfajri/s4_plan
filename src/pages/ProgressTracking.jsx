import React from 'react';
import { modules } from '../data/siteData';
import ProgressCard from '../components/ProgressCard';
import '../styles/ProgressTracking.css';

const ProgressTracking = ({ progress, darkMode }) => {
  const stats = modules.map(module => {
    const moduleProgress = progress[module.id] || { completedChapters: new Set(), completedTopics: new Set() };
    const totalChapters = module.chapters.length;
    const completedChapters = moduleProgress.completedChapters.size;
    const totalTopics = module.chapters.reduce((sum, c) => sum + c.topics.length, 0);
    const completedTopics = moduleProgress.completedTopics.size;

    return {
      ...module,
      completedChapters,
      totalChapters,
      completedTopics,
      totalTopics,
      percent: (completedChapters / totalChapters) * 100
    };
  });

  // Sort by progress
  const sortedByProgress = [...stats].sort((a, b) => b.percent - a.percent);
  const hardestModule = sortedByProgress[sortedByProgress.length - 1];
  const mostAdvancedModule = sortedByProgress[0];

  const totalChapters = modules.reduce((sum, m) => sum + m.chapters.length, 0);
  const completedChaptersTotal = Object.values(progress).reduce((sum, p) => sum + p.completedChapters.size, 0);
  const overallProgress = (completedChaptersTotal / totalChapters) * 100;

  const totalTopics = modules.reduce((sum, m) => sum + m.chapters.reduce((s, c) => s + c.topics.length, 0), 0);
  const completedTopicsTotal = Object.values(progress).reduce((sum, p) => sum + p.completedTopics.size, 0);

  return (
    <div className={`progress-tracking ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="page-header">
        <h1>📈 Suivi de Progression</h1>
        <p>Analysez vos progrès par module et identifiez les domaines d'amélioration</p>
      </div>

      {/* Overall Stats */}
      <section className="overall-stats">
        <h2>Progression Globale</h2>
        <div className="stats-grid">
          <ProgressCard
            label="Chapitres"
            current={completedChaptersTotal}
            total={totalChapters}
            color="#3B82F6"
            icon="📚"
            darkMode={darkMode}
          />
          <ProgressCard
            label="Sujets"
            current={completedTopicsTotal}
            total={totalTopics}
            color="#10B981"
            icon="⭐"
            darkMode={darkMode}
          />
          <ProgressCard
            label="Modules Actifs"
            current={stats.filter(s => s.completedChapters > 0).length}
            total={modules.length}
            color="#F59E0B"
            icon="🎯"
            darkMode={darkMode}
          />
          <ProgressCard
            label="Complétude Globale"
            current={Math.round(overallProgress)}
            total={100}
            color="#8B5CF6"
            icon="✨"
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* Module-by-Module Progress */}
      <section className="module-progress-section">
        <h2>Progression par Module</h2>
        <div className="module-progress-list">
          {stats.map(module => (
            <div key={module.id} className={`module-progress-item ${darkMode ? 'dark' : ''}`}>
              <div className="progress-header">
                <div className="module-info">
                  <h3>{module.name}</h3>
                  <p className="module-meta">
                    {module.completedChapters}/{module.totalChapters} chapitres • 
                    {module.completedTopics}/{module.totalTopics} sujets
                  </p>
                </div>
                <div className="progress-stats">
                  <span className="percent">{Math.round(module.percent)}%</span>
                  <span className={`status ${module.percent === 100 ? 'completed' : module.percent >= 50 ? 'good' : 'started'}`}>
                    {module.percent === 100 && '✅ Complété'}
                    {module.percent < 100 && module.percent >= 50 && '⏳ En cours'}
                    {module.percent < 50 && module.percent > 0 && '🚀 Commencé'}
                    {module.percent === 0 && '⬜ Non commencé'}
                  </span>
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${module.percent}%`,
                      backgroundColor: module.color
                    }}
                  />
                </div>
              </div>

              <div className="difficulty-badge">
                {module.difficulty === 'easy' && '🟢 Facile'}
                {module.difficulty === 'medium' && '🟡 Moyen'}
                {module.difficulty === 'hard' && '🔴 Difficile'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="insights-section">
        <h2>📊 Informations et Perspectives</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Module le Plus Avancé</h3>
            <p className="insight-module">{mostAdvancedModule.name}</p>
            <p className="insight-percent">{Math.round(mostAdvancedModule.percent)}% complété</p>
            <p className="insight-text">🎉 Excellent travail! Continuez ainsi!</p>
          </div>

          <div className="insight-card">
            <h3>Module le Plus Difficile</h3>
            <p className="insight-module">{hardestModule.name}</p>
            <p className="insight-percent">{Math.round(hardestModule.percent)}% complété</p>
            <p className="insight-text">
              {hardestModule.percent === 0 
                ? '💪 C\'est votre priorité à étudier'
                : '⚠️ Nécessite plus d\'attention'}
            </p>
          </div>

          <div className="insight-card">
            <h3>Momentum d'Étude</h3>
            <p className="insight-number">
              {stats.filter(s => s.completedChapters > 0).length}/{modules.length}
            </p>
            <p className="insight-text">
              modules avec du progrès - vous êtes sur la bonne voie!
            </p>
          </div>

          <div className="insight-card">
            <h3>Estimation de Temps (Restant)</h3>
            <p className="insight-number">
              ~{Math.round((totalChapters - completedChaptersTotal) * 0.75)}h
            </p>
            <p className="insight-text">
              pour terminer tous les chapitres (à 45 min par chapitre)
            </p>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="recommendations">
        <h2>💡 Recommandations</h2>
        <ul className="recommendations-list">
          <li>
            ✅ Vous avez une bonne progression. Continuez à étudier régulièrement pour maintenir le momentum.
          </li>
          <li>
            🎯 Concentrez-vous sur {hardestModule.name} pour renforcer vos compétences dans les domaines difficiles.
          </li>
          <li>
            📚 Revisitez les chapitres complétés il y a longtemps pour renforcer votre mémoire.
          </li>
          <li>
            ⏰ Maintenez votre rythme d'étude de 1-2 heures par jour pour rester à jour.
          </li>
          <li>
            🔍 Utilisez la section Notes pour enregistrer les concepts clés et les doutes.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ProgressTracking;
