import React from 'react';
import '../styles/Footer.css';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">MIP S4 Study Platform</span>
          </div>
          <p className="footer-description">
            Plateforme d'étude complète pour les étudiants du MIP S4 Développement Informatique à l'Université Hassan II.
          </p>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#dashboard">Tableau de Bord</a></li>
            <li><a href="#revision">Révision</a></li>
            <li><a href="#notes">Notes</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Ressources</h4>
          <ul>
            <li><a href="#progress">Ma Progression</a></li>
            <li><a href="#planner">Planificateur d'Étude</a></li>
            <li><a href="#modules">Tous les Modules</a></li>
            <li><a href="#tips">Conseil d'Étude</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Université Hassan II</h4>
          <p className="uni-info">
            MIP - Licence Développement Informatique<br />
            Cycle Ingénieur S4<br />
            Casablanca, Maroc
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} MIP S4 Study Platform. Créé avec ❤️ pour les étudiants.</p>
        <p>Ressource éducative non officielle - Pour usage personnel seulement</p>
      </div>
    </footer>
  );
};

export default Footer;
