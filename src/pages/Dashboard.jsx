import React, { useState } from 'react';
import { modules } from '../data/siteData';
import ModuleCard from '../components/ModuleCard';
import StatsSection from '../components/StatsSection';
import SearchBar from '../components/SearchBar';
import '../styles/Dashboard.css';

const Dashboard = ({ progress, onPageChange, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const stats = {
    totalModules: modules.length,
    totalChapters: modules.reduce((sum, m) => sum + m.chapters.length, 0),
    completedChapters: Object.values(progress).reduce((sum, p) => sum + p.completedChapters.size, 0),
    overallProgress: (Object.values(progress).reduce((sum, p) => sum + p.completedChapters.size, 0) / 
                      modules.reduce((sum, m) => sum + m.chapters.length, 0)) * 100,
    streak: 5,
    topicsLearned: Object.values(progress).reduce((sum, p) => sum + p.completedTopics.size, 0)
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = 
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
    
    return matchesSearch && matchesDifficulty;
  });

  const handleSelectModule = (moduleId) => {
    onPageChange('module-details', moduleId);
  };

  return (
    <div className={`dashboard-page ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="dashboard-header">
        <h1>📊 Mon Tableau de Bord</h1>
        <p>Gérez votre apprentissage et traquez votre progression</p>
      </div>

      {/* Stats Section */}
      <StatsSection stats={stats} darkMode={darkMode} />

      {/* Search and Filter */}
      <section className="search-filter-section">
        <SearchBar darkMode={darkMode} onSearch={setSearchTerm} />
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${difficultyFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('all')}
          >
            Tous les Modules
          </button>
          <button
            className={`filter-btn ${difficultyFilter === 'easy' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('easy')}
          >
            🟢 Facile
          </button>
          <button
            className={`filter-btn ${difficultyFilter === 'medium' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('medium')}
          >
            🟡 Moyen
          </button>
          <button
            className={`filter-btn ${difficultyFilter === 'hard' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('hard')}
          >
            🔴 Difficile
          </button>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="modules-section">
        <div className="section-header">
          <h2>Modules du Semestre</h2>
          <span className="module-count">{filteredModules.length} modules</span>
        </div>

        {filteredModules.length > 0 ? (
          <div className="modules-grid">
            {filteredModules.map(module => (
              <ModuleCard
                key={module.id}
                module={module}
                progress={progress[module.id] || { completedChapters: new Set(), completedTopics: new Set() }}
                onSelect={() => handleSelectModule(module.id)}
                darkMode={darkMode}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Aucun module trouvé correspondant à votre recherche</p>
          </div>
        )}
      </section>

      {/* Today's Focus */}
      <section className="todays-focus">
        <h2>🎯 Focus d'Aujourd'hui</h2>
        <div className="focus-cards">
          <div className="focus-card">
            <h3>Module Prioritaire</h3>
            <p className="focus-module">POO C++ • Héritage</p>
            <p className="focus-time">⏱️ 1-2 heures</p>
          </div>
          <div className="focus-card">
            <h3>Sujet Difficile</h3>
            <p className="focus-module">Analyse Numérique • Systèmes Linéaires</p>
            <p className="focus-time">⏱️ 1.5 heures</p>
          </div>
          <div className="focus-card">
            <h3>Révision Rapide</h3>
            <p className="focus-module">Web 2 • React JS</p>
            <p className="focus-time">⏱️ 30 minutes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
