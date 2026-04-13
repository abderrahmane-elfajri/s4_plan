import React from 'react';
import { modules } from '../data/siteData';
import '../styles/StudyPlanner.css';

const StudyPlanner = ({ progress, darkMode }) => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  const weekPlan = [
    { day: 'Lundi', subjects: ['POO C++', 'Web 2'] },
    { day: 'Mardi', subjects: ['Analyse Numérique', 'BDR'] },
    { day: 'Mercredi', subjects: ['Structures de Données', 'SE2'] },
    { day: 'Jeudi', subjects: ['POO C++', 'Analyse Numérique'] },
    { day: 'Vendredi', subjects: ['Web 2', 'BDR'] },
    { day: 'Samedi', subjects: ['Révision Générale', 'Sujets Difficiles'] },
    { day: 'Dimanche', subjects: ['Repos / Révision Légère'] }
  ];

  return (
    <section className={`study-planner ${darkMode ? 'dark' : ''}`}>
      <div className="planner-header">
        <h2>📅 Planificateur d'Étude Hebdomadaire</h2>
        <p>Organisation optimale pour maximiser votre apprentissage</p>
      </div>

      <div className="week-grid">
        {weekPlan.map((day, index) => (
          <div key={index} className="day-card">
            <h3 className="day-name">{day.day}</h3>
            <ul className="subjects-list">
              {day.subjects.map((subject, idx) => (
                <li key={idx} className="subject-item">
                  <span className="subject-icon">
                    {index === 6 ? '☀️' : '📚'}
                  </span>
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
            <div className="day-time">
              {index === 6 ? '2-3 heures' : '3-4 heures'}
            </div>
          </div>
        ))}
      </div>

      <div className="study-tips">
        <h3>💡 Conseils pour une Étude Efficace</h3>
        <ul>
          <li>✓ Étudiez le matin quand vous êtes le plus concentré</li>
          <li>✓ Faites des pauses de 10 minutes toutes les 50 minutes</li>
          <li>✓ Allez du plus facile au plus difficile</li>
          <li>✓ Révisez les sujets précédents avant les nouveaux</li>
          <li>✓ Pratiquez régulièrement - la consistance est clé</li>
          <li>✓ Dormez bien avant les jours d'étude intensives</li>
        </ul>
      </div>
    </section>
  );
};

export default StudyPlanner;
