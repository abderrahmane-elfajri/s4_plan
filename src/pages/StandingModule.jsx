import React from 'react';
import { modules } from '../data/siteData';
import '../styles/StandingModule.css';

const StandingModule = ({ moduleId, progress, darkMode, onPageChange }) => {
  const module = modules.find((m) => m.id === Number(moduleId));

  if (!module) {
    return (
      <div className={`standing-module-page ${darkMode ? 'dark' : ''}`}>
        <div className="not-found">Module introuvable</div>
      </div>
    );
  }

  const moduleProgress = progress[module.id] || {
    completedChapters: new Set(),
    completedTopics: new Set(),
    notes: []
  };

  const totalChapters = module.chapters.length;
  const completedChapters = moduleProgress.completedChapters.size;
  const totalTopics = module.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0);
  const completedTopics = moduleProgress.completedTopics.size;
  const completion = totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const predictedGrade = ((completion / 100) * 20).toFixed(2);

  const resourcesByModule = {
    'POO C++': [
      { title: 'CPPReference', url: 'https://en.cppreference.com/w/' },
      { title: 'LearnCpp', url: 'https://www.learncpp.com/' },
      { title: 'HackerRank C++', url: 'https://www.hackerrank.com/domains/cpp' },
      { title: 'OOP YouTube', url: 'https://www.youtube.com/results?search_query=oop+c%2B%2B' }
    ],
    'Web 2': [
      { title: 'MDN Docs', url: 'https://developer.mozilla.org/' },
      { title: 'React Learn', url: 'https://react.dev/learn' },
      { title: 'JavaScript.info', url: 'https://javascript.info/' },
      { title: 'Frontend Mentor', url: 'https://www.frontendmentor.io/challenges' }
    ],
    'Analyse Numérique': [
      { title: 'MIT OCW Numerical', url: 'https://ocw.mit.edu/search/?q=numerical+analysis' },
      { title: 'Khan Academy Math', url: 'https://www.khanacademy.org/math' },
      { title: 'Wolfram Examples', url: 'https://www.wolframalpha.com/examples/mathematics/' },
      { title: 'Numerical Methods YouTube', url: 'https://www.youtube.com/results?search_query=numerical+methods' }
    ],
    'BDR': [
      { title: 'SQLBolt', url: 'https://sqlbolt.com/' },
      { title: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/' },
      { title: 'W3Schools SQL', url: 'https://www.w3schools.com/sql/' },
      { title: 'DB Design YouTube', url: 'https://www.youtube.com/results?search_query=database+design' }
    ],
    'Structures de Données': [
      { title: 'Visualgo', url: 'https://visualgo.net/en' },
      { title: 'LeetCode', url: 'https://leetcode.com/problemset/' },
      { title: 'GFG DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
      { title: 'DSA YouTube', url: 'https://www.youtube.com/results?search_query=data+structures+algorithms' }
    ],
    SE2: [
      { title: 'OSTEP Book', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
      { title: 'MIT OS', url: 'https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/' },
      { title: 'Linux Kernel Docs', url: 'https://www.kernel.org/doc/html/latest/' },
      { title: 'OS YouTube', url: 'https://www.youtube.com/results?search_query=operating+systems' }
    ],
    Français: [
      { title: 'TV5 Monde', url: 'https://apprendre.tv5monde.com/fr' },
      { title: 'Lawless French', url: 'https://www.lawlessfrench.com/grammar/' },
      { title: 'Français Facile', url: 'https://www.francaisfacile.com/' },
      { title: 'French Lessons YouTube', url: 'https://www.youtube.com/results?search_query=french+grammar' }
    ]
  };

  const resources = resourcesByModule[module.name] || [];

  return (
    <div className={`standing-module-page ${darkMode ? 'dark' : ''}`}>
      <section className="module-hero" style={{ borderTopColor: module.color }}>
        <div className="hero-top">
          <button className="back-btn" onClick={() => onPageChange('standing')}>
            Retour Standing
          </button>
          <button className="open-course-btn" onClick={() => onPageChange('module-details', module.id)}>
            Ouvrir Cours
          </button>
        </div>

        <h1>{module.name} - Pro Standing</h1>
        <p>{module.description}</p>
      </section>

      <section className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Progression</span>
          <strong>{completion}%</strong>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Note Prédite</span>
          <strong>{predictedGrade}/20</strong>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Chapitres</span>
          <strong>{completedChapters}/{totalChapters}</strong>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Sujets</span>
          <strong>{completedTopics}/{totalTopics}</strong>
        </div>
      </section>

      <section className="progress-wrap">
        <div className="progress-head">
          <h3>Progression du module</h3>
          <span>{completion}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completion}%`, backgroundColor: module.color }}></div>
        </div>
      </section>

      <section className="resources-wrap">
        <h3>Ressources Premium</h3>
        <div className="resource-grid">
          {resources.map((resource) => (
            <a key={resource.title} href={resource.url} target="_blank" rel="noreferrer" className="resource-item">
              {resource.title}
            </a>
          ))}
        </div>
      </section>

      <section className="chapter-wrap">
        <h3>Chapitres du module</h3>
        <div className="chapter-list">
          {module.chapters.map((chapter, index) => {
            const done = moduleProgress.completedChapters.has(chapter.id);
            return (
              <div key={chapter.id} className={`chapter-row ${done ? 'done' : ''}`}>
                <span className="ch-index">{index + 1}</span>
                <span className="ch-name">{chapter.name}</span>
                <span className="ch-state">{done ? 'Terminé' : 'En cours'}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default StandingModule;
