import React, { useState } from 'react';
import { modules } from '../data/siteData';
import RevisionCard from '../components/RevisionCard';
import '../styles/Revision.css';

const Revision = ({ progress, darkMode }) => {
  const [revisionTopics, setRevisionTopics] = useState([
    { id: 1, topic: 'Héritage en POO', module: 'POO C++', difficulty: 'hard' },
    { id: 2, topic: 'Systèmes Linéaires', module: 'Analyse Numérique', difficulty: 'hard' },
    { id: 3, topic: 'Normalisation BDR', module: 'BDR', difficulty: 'medium' },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleRemoveRevisionTopic = (id) => {
    setRevisionTopics(revisionTopics.filter(t => t.id !== id));
  };

  const handleAddRevisionTopic = (topic) => {
    setRevisionTopics([
      ...revisionTopics,
      {
        id: Date.now(),
        topic: topic,
        module: 'Module',
        difficulty: 'medium'
      }
    ]);
  };

  // Get all difficult topics from modules
  const difficultTopics = [];
  modules.forEach(module => {
    module.chapters.forEach(chapter => {
      // Last few topics are usually harder
      chapter.topics.slice(-2).forEach(topic => {
        difficultTopics.push({
          id: `${module.id}-${chapter.id}-${topic}`,
          topic: topic,
          chapter: chapter.name,
          module: module.name,
          difficulty: module.difficulty,
          color: module.color
        });
      });
    });
  });

  const totalChapters = modules.reduce((sum, m) => sum + m.chapters.length, 0);
  const completedChaptersTotal = Object.values(progress).reduce((sum, p) => sum + p.completedChapters.size, 0);
  const overallProgress = (completedChaptersTotal / totalChapters) * 100;

  // Determine exam preparation status
  let examStatus = '⭐ Bon';
  let examStatusColor = '#10B981';
  if (overallProgress < 30) {
    examStatus = '🔴 Urgent';
    examStatusColor = '#EF4444';
  } else if (overallProgress < 60) {
    examStatus = '🟡 Modéré';
    examStatusColor = '#F59E0B';
  } else if (overallProgress < 80) {
    examStatus = '🟢 Solide';
    examStatusColor = '#10B981';
  } else {
    examStatus = '✨ Excellent';
    examStatusColor = '#8B5CF6';
  }

  const filteredTopics = selectedFilter === 'all' 
    ? revisionTopics 
    : revisionTopics.filter(t => t.difficulty === selectedFilter);

  return (
    <div className={`revision-page ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="page-header">
        <h1>🔄 Révision et Préparation aux Examens</h1>
        <p>Concentrez-vous sur les sujets clés et les domaines difficiles</p>
      </div>

      {/* Exam Preparation Banner */}
      <section className="exam-preparation">
        <div className="exam-card" style={{ borderLeftColor: examStatusColor }}>
          <div className="exam-content">
            <h3>État de Préparation aux Examens</h3>
            <div className="exam-status" style={{ color: examStatusColor }}>
              <span className="status-big">{examStatus}</span>
              <p className="status-desc">{Math.round(overallProgress)}% du matériel révisé</p>
            </div>
          </div>
          <button className="focus-btn" onClick={() => document.querySelector('.focus-grid')?.scrollIntoView({ behavior: 'smooth' })}>
            Voir les Priorités →
          </button>
        </div>
      </section>

      {/* Revision Focus Areas */}
      <section className="focus-areas">
        <h2>🎯 Domaines de Concentration</h2>
        <div className="focus-grid">
          <div className="focus-card">
            <h3>Sujets Difficiles</h3>
            <p className="focus-count">8 sujets</p>
            <p className="focus-desc">Nécessitent davantage d'étude</p>
          </div>
          <div className="focus-card">
            <h3>Révision Générale</h3>
            <p className="focus-count">15 chapitres</p>
            <p className="focus-desc">À revoir avant l'examen</p>
          </div>
          <div className="focus-card">
            <h3>Vérifiez la Compréhension</h3>
            <p className="focus-count">5 algorithmes</p>
            <p className="focus-desc">Vérifiez votre compréhension</p>
          </div>
        </div>
      </section>

      {/* Quick Revision Checklist */}
      <section className="revision-checklist">
        <h2>✅ Checklist de Révision Rapide</h2>
        <div className="checklist">
          {/* POO */}
          <div className="checklist-section">
            <h3>POO C++</h3>
            <ul>
              <li><input type="checkbox" /> Classes et constructeurs</li>
              <li><input type="checkbox" /> Héritage et polymorphisme</li>
              <li><input type="checkbox" /> Association entre classes</li>
              <li><input type="checkbox" /> Encapsulation</li>
            </ul>
          </div>

          {/* Web 2 */}
          <div className="checklist-section">
            <h3>Web 2</h3>
            <ul>
              <li><input type="checkbox" /> JavaScript fondamentaux</li>
              <li><input type="checkbox" /> DOM et événements</li>
              <li><input type="checkbox" /> React et Hooks</li>
              <li><input type="checkbox" /> Zustand et état global</li>
            </ul>
          </div>

          {/* BDR */}
          <div className="checklist-section">
            <h3>BDR</h3>
            <ul>
              <li><input type="checkbox" /> Modélisation MCD/MLD</li>
              <li><input type="checkbox" /> Normalisation</li>
              <li><input type="checkbox" /> Requêtes SQL</li>
              <li><input type="checkbox" /> Contraintes et intégrité</li>
            </ul>
          </div>

          {/* SE2 */}
          <div className="checklist-section">
            <h3>SE2</h3>
            <ul>
              <li><input type="checkbox" /> Processus et threads</li>
              <li><input type="checkbox" /> Ordonnancement</li>
              <li><input type="checkbox" /> Gestion mémoire</li>
              <li><input type="checkbox" /> Synchronisation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Revision Cards Section */}
      <section className="revision-cards-section">
        <div className="section-header">
          <h2>📌 Mes Sujets de Révision</h2>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              Tous
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'hard' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('hard')}
            >
              🔴 Difficile
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'medium' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('medium')}
            >
              🟡 Moyen
            </button>
          </div>
        </div>

        {filteredTopics.length > 0 ? (
          <div className="revision-cards-grid">
            {filteredTopics.map(topic => (
              <RevisionCard
                key={topic.id}
                topic={topic.topic}
                module={topic.module}
                difficulty={topic.difficulty}
                onRemove={() => handleRemoveRevisionTopic(topic.id)}
                darkMode={darkMode}
              />
            ))}
          </div>
        ) : (
          <div className="no-revision-topics">
            <p>Aucun sujet de révision pour ce filtre</p>
          </div>
        )}
      </section>

      {/* Exam Tips */}
      <section className="exam-tips">
        <h2>💡 Conseils pour l'Examen</h2>
        <div className="tips-container">
          <div className="tip">
            <span className="tip-number">1</span>
            <div>
              <h4>Dormez bien la nuit avant</h4>
              <p>L'école est toujours importante - ne sacrifiez pas votre sommeil pour étudier</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-number">2</span>
            <div>
              <h4>Lisez les questions attentivement</h4>
              <p>Comprenez ce qui est demandé avant de répondre</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-number">3</span>
            <div>
              <h4>Organisez votre réponse</h4>
              <p>Planifiez vos réponses, surtout pour les questions de synthèse</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-number">4</span>
            <div>
              <h4>Gérez votre temps</h4>
              <p>Allouez du temps clairement à chaque question</p>
            </div>
          </div>
        </div>
      </section>

      {/* Last Minute Prep */}
      <section className="last-minute-prep">
        <h2>⏰ Préparation de Dernière Minute</h2>
        <div className="last-minute-content">
          <div className="last-minute-card">
            <h3>30 Minutes Avant l'Examen</h3>
            <ul>
              <li>Relisez vos notes clés et vos formules</li>
              <li>Respirez profondément et calmez-vous</li>
              <li>Regroupez vos fournitures d'examen</li>
            </ul>
          </div>
          <div className="last-minute-card">
            <h3>Pendant l'Examen</h3>
            <ul>
              <li>Lisez toutes les questions en premier</li>
              <li>Commencez par les questions que vous connaissez</li>
              <li>Vérifiez vos réponses si vous avez le temps</li>
            </ul>
          </div>
          <div className="last-minute-card">
            <h3>Après l'Examen</h3>
            <ul>
              <li>Ne regrettez pas - c'est fini maintenant</li>
              <li>Prenez du repos adéquat</li>
              <li>Passez à l'examen suivant</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Revision;
