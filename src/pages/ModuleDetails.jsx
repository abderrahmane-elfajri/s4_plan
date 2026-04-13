import React, { useState } from 'react';
import { modules, importanceColors } from '../data/siteData';
import ChapterAccordion from '../components/ChapterAccordion';
import { S4_DRIVE_URL } from '../data/resourcesData';
import '../styles/ModuleDetails.css';

const ModuleDetails = ({ moduleId, progress, onUpdateProgress, darkMode }) => {
  const module = modules.find(m => m.id === parseInt(moduleId));
  const moduleProgress = progress[moduleId] || { completedChapters: new Set(), completedTopics: new Set(), notes: [] };

  if (!module) {
    return <div className="error-message">Module not found</div>;
  }

  const totalChapters = module.chapters.length;
  const completedChapters = moduleProgress.completedChapters.size;
  const progressPercent = (completedChapters / totalChapters) * 100;

  const totalTopics = module.chapters.reduce((sum, c) => sum + c.topics.length, 0);
  const completedTopics = moduleProgress.completedTopics.size;

  const impColor = importanceColors[module.importance];

  const resourcesByModule = {
    'POO C++': {
      lecture: [
        { label: 'CPPReference', url: 'https://en.cppreference.com/w/' },
        { label: 'LearnCpp', url: 'https://www.learncpp.com/' },
        { label: 'cplusplus.com Tutorial', url: 'https://cplusplus.com/doc/tutorial/' }
      ],
      video: [
        { label: 'OOP in C++ (YouTube)', url: 'https://www.youtube.com/results?search_query=object+oriented+programming+c%2B%2B' },
        { label: 'C++ Classes and Objects', url: 'https://www.youtube.com/results?search_query=c%2B%2B+classes+objects' },
        { label: 'C++ Inheritance', url: 'https://www.youtube.com/results?search_query=c%2B%2B+inheritance+tutorial' }
      ],
      practice: [
        { label: 'HackerRank C++', url: 'https://www.hackerrank.com/domains/cpp' },
        { label: 'Codeforces Problems', url: 'https://codeforces.com/problemset' },
        { label: 'LeetCode C++', url: 'https://leetcode.com/problemset/' }
      ],
      quiz: [
        { label: 'GeeksforGeeks OOP MCQ', url: 'https://www.geeksforgeeks.org/oops-object-oriented-design-interview-questions/' },
        { label: 'W3Schools C++ Quiz', url: 'https://www.w3schools.com/cpp/cpp_quiz.asp' },
        { label: 'InterviewBit OOP Questions', url: 'https://www.interviewbit.com/oops-interview-questions/' }
      ]
    },
    'Web 2': {
      lecture: [
        { label: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
        { label: 'JavaScript.info', url: 'https://javascript.info/' },
        { label: 'React Official Docs', url: 'https://react.dev/learn' }
      ],
      video: [
        { label: 'Modern JavaScript (YouTube)', url: 'https://www.youtube.com/results?search_query=modern+javascript+course' },
        { label: 'React for Beginners', url: 'https://www.youtube.com/results?search_query=react+for+beginners' },
        { label: 'DOM and Events', url: 'https://www.youtube.com/results?search_query=dom+events+javascript' }
      ],
      practice: [
        { label: 'Frontend Mentor', url: 'https://www.frontendmentor.io/challenges' },
        { label: 'CodePen Challenges', url: 'https://codepen.io/challenges' },
        { label: 'freeCodeCamp Projects', url: 'https://www.freecodecamp.org/learn/' }
      ],
      quiz: [
        { label: 'W3Schools JS Quiz', url: 'https://www.w3schools.com/js/js_quiz.asp' },
        { label: 'React Quiz (W3Schools)', url: 'https://www.w3schools.com/react/react_quiz.asp' },
        { label: 'GeeksforGeeks JS Quiz', url: 'https://www.geeksforgeeks.org/javascript-interview-questions-and-answers/' }
      ]
    },
    'Analyse Numérique': {
      lecture: [
        { label: 'MIT OCW Numerical Analysis', url: 'https://ocw.mit.edu/search/?q=numerical+analysis' },
        { label: 'Paul’s Math Notes', url: 'https://tutorial.math.lamar.edu/' },
        { label: 'Khan Academy Math', url: 'https://www.khanacademy.org/math' }
      ],
      video: [
        { label: 'Numerical Methods Course', url: 'https://www.youtube.com/results?search_query=numerical+methods+course' },
        { label: 'Newton Method Tutorial', url: 'https://www.youtube.com/results?search_query=newton+raphson+method' },
        { label: 'Linear Systems Numerical', url: 'https://www.youtube.com/results?search_query=numerical+linear+algebra' }
      ],
      practice: [
        { label: 'Wolfram Math Examples', url: 'https://www.wolframalpha.com/examples/mathematics/' },
        { label: 'Symbolab Practice', url: 'https://www.symbolab.com/' },
        { label: 'Math StackExchange', url: 'https://math.stackexchange.com/' }
      ],
      quiz: [
        { label: 'Numerical Analysis MCQ', url: 'https://www.sanfoundry.com/1000-numerical-methods-questions-answers/' },
        { label: 'Engineering Mathematics MCQ', url: 'https://www.geeksforgeeks.org/engineering-mathematics/' },
        { label: 'Testbook Numerical Aptitude', url: 'https://testbook.com/objective-questions/mcq-on-numerical-methods--5eea6a1039140f30f369e88c' }
      ]
    },
    BDR: {
      lecture: [
        { label: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/' },
        { label: 'W3Schools SQL', url: 'https://www.w3schools.com/sql/' },
        { label: 'SQL Tutorial', url: 'https://www.sqltutorial.org/' }
      ],
      video: [
        { label: 'Database Design (YouTube)', url: 'https://www.youtube.com/results?search_query=database+design+tutorial' },
        { label: 'SQL Full Course', url: 'https://www.youtube.com/results?search_query=sql+full+course' },
        { label: 'Normalization Explained', url: 'https://www.youtube.com/results?search_query=database+normalization' }
      ],
      practice: [
        { label: 'SQLBolt', url: 'https://sqlbolt.com/' },
        { label: 'DB Fiddle', url: 'https://www.db-fiddle.com/' },
        { label: 'HackerRank SQL', url: 'https://www.hackerrank.com/domains/sql' }
      ],
      quiz: [
        { label: 'SQL Quiz (W3Schools)', url: 'https://www.w3schools.com/sql/sql_quiz.asp' },
        { label: 'DBMS MCQ', url: 'https://www.geeksforgeeks.org/dbms/' },
        { label: 'Sanfoundry DBMS Quiz', url: 'https://www.sanfoundry.com/1000-dbms-questions-answers/' }
      ]
    },
    'Structures de Données': {
      lecture: [
        { label: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
        { label: 'Visualgo', url: 'https://visualgo.net/en' },
        { label: 'Programiz DSA', url: 'https://www.programiz.com/dsa' }
      ],
      video: [
        { label: 'DSA Full Course', url: 'https://www.youtube.com/results?search_query=data+structures+and+algorithms+course' },
        { label: 'Sorting Algorithms', url: 'https://www.youtube.com/results?search_query=sorting+algorithms+explained' },
        { label: 'Trees and Graphs', url: 'https://www.youtube.com/results?search_query=trees+and+graphs+data+structures' }
      ],
      practice: [
        { label: 'LeetCode', url: 'https://leetcode.com/problemset/' },
        { label: 'Codeforces', url: 'https://codeforces.com/problemset' },
        { label: 'HackerRank DSA', url: 'https://www.hackerrank.com/domains/data-structures' }
      ],
      quiz: [
        { label: 'DSA MCQ', url: 'https://www.geeksforgeeks.org/data-structure-multiple-choice-questions/' },
        { label: 'Algorithms Quiz', url: 'https://www.w3schools.com/dsa/dsa_quiz.php' },
        { label: 'Interview Questions DSA', url: 'https://www.interviewbit.com/data-structure-interview-questions/' }
      ]
    },
    SE2: {
      lecture: [
        { label: 'OSTEP Book', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
        { label: 'MIT OS Course', url: 'https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/' },
        { label: 'Linux Kernel Docs', url: 'https://www.kernel.org/doc/html/latest/' }
      ],
      video: [
        { label: 'Operating Systems Course', url: 'https://www.youtube.com/results?search_query=operating+systems+course' },
        { label: 'Processes and Threads', url: 'https://www.youtube.com/results?search_query=process+vs+thread' },
        { label: 'Memory Management', url: 'https://www.youtube.com/results?search_query=memory+management+operating+system' }
      ],
      practice: [
        { label: 'OS Questions GFG', url: 'https://www.geeksforgeeks.org/operating-systems/' },
        { label: 'Linux Command Practice', url: 'https://linuxjourney.com/' },
        { label: 'Unix Shell Practice', url: 'https://www.learnshell.org/' }
      ],
      quiz: [
        { label: 'OS MCQ', url: 'https://www.sanfoundry.com/1000-operating-system-questions-answers/' },
        { label: 'Process Scheduling Quiz', url: 'https://www.geeksforgeeks.org/operating-systems-process-scheduling-set-1/' },
        { label: 'OS Interview Questions', url: 'https://www.interviewbit.com/operating-system-interview-questions/' }
      ]
    },
    Français: {
      lecture: [
        { label: 'Lawless French Grammar', url: 'https://www.lawlessfrench.com/grammar/' },
        { label: 'Le Point du FLE', url: 'https://www.lepointdufle.net/' },
        { label: 'TV5 Monde', url: 'https://apprendre.tv5monde.com/fr' }
      ],
      video: [
        { label: 'French Grammar Lessons', url: 'https://www.youtube.com/results?search_query=french+grammar+lessons' },
        { label: 'French Pronunciation', url: 'https://www.youtube.com/results?search_query=french+pronunciation+tutorial' },
        { label: 'French Writing Skills', url: 'https://www.youtube.com/results?search_query=french+writing+skills' }
      ],
      practice: [
        { label: 'Français Facile Exercises', url: 'https://www.francaisfacile.com/' },
        { label: 'Conjugaison Reverso', url: 'https://conjugator.reverso.net/conjugation-french.html' },
        { label: 'TV5 Exercises', url: 'https://apprendre.tv5monde.com/fr/exercices' }
      ],
      quiz: [
        { label: 'French Quiz (Test Languages)', url: 'https://www.testlanguages.com/french-level-test/' },
        { label: 'French Grammar Quiz', url: 'https://www.proprofs.com/quiz-school/topic/french-grammar' },
        { label: 'French Vocabulary Quiz', url: 'https://www.quia.com/shared/french/' }
      ]
    }
  };

  const moduleResources = resourcesByModule[module.name] || {
    lecture: [],
    video: [],
    practice: [],
    quiz: []
  };

  const handleToggleChapter = (chapterId) => {
    const newCompleted = new Set(moduleProgress.completedChapters);
    if (newCompleted.has(chapterId)) {
      newCompleted.delete(chapterId);
    } else {
      newCompleted.add(chapterId);
    }
    onUpdateProgress(moduleId, { ...moduleProgress, completedChapters: newCompleted });
  };

  const handleToggleTopic = (topicId) => {
    const newCompleted = new Set(moduleProgress.completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    onUpdateProgress(moduleId, { ...moduleProgress, completedTopics: newCompleted });
  };

  return (
    <div className={`module-details ${darkMode ? 'dark' : ''}`}>
      {/* Module Header */}
      <header className="module-header" style={{ backgroundColor: module.color }}>
        <div className="header-content">
          <h1>{module.name}</h1>
          <p className="header-description">{module.description}</p>

          <div className="header-info">
            <span 
              className="importance-badge"
              style={{
                backgroundColor: impColor.bg,
                color: impColor.text,
                borderColor: impColor.badge
              }}
            >
              Importance: {module.importance.toUpperCase()}
            </span>
            <span className="credits-badge">
              {module.credits} Crédits
            </span>
          </div>
        </div>
      </header>

      <div className="module-content">
        {/* Overview Section */}
        <section className="overview-section">
          <h2>Aperçu du Module</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Chapitres Totaux</h3>
              <p className="big-number">{totalChapters}</p>
              <p className="small-text">chapitres à couvrir</p>
            </div>
            <div className="overview-card">
              <h3>Sujets Totaux</h3>
              <p className="big-number">{totalTopics}</p>
              <p className="small-text">sujets individuels</p>
            </div>
            <div className="overview-card">
              <h3>Chapitres Terminés</h3>
              <p className="big-number">{completedChapters}/{totalChapters}</p>
              <p className="small-text">{Math.round(progressPercent)}% complété</p>
            </div>
            <div className="overview-card">
              <h3>Sujets Étudiés</h3>
              <p className="big-number">{completedTopics}/{totalTopics}</p>
              <p className="small-text">{Math.round((completedTopics / totalTopics) * 100)}% maîtrisé</p>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="progress-section">
          <div className="progress-header">
            <h3>Progression du Module</h3>
            <span className="progress-percent">{Math.round(progressPercent)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: module.color
              }}
            />
          </div>
          <p className="progress-text">
            {completedChapters} sur {totalChapters} chapitres complétés
          </p>
        </section>

        {/* Chapters List */}
        <section className="chapters-section">
          <div className="section-header">
            <h2>Chapitres du Module</h2>
            <p className="section-subtitle">Cliquez sur un chapitre pour voir les sujets</p>
          </div>

          <div className="chapters-list">
            {module.chapters.map(chapter => (
              <ChapterAccordion
                key={chapter.id}
                chapter={chapter}
                moduleColor={module.color}
                isCompleted={moduleProgress.completedChapters.has(chapter.id)}
                onToggleComplete={() => handleToggleChapter(chapter.id)}
                completedTopics={moduleProgress.completedTopics}
                onToggleTopic={handleToggleTopic}
                darkMode={darkMode}
              />
            ))}
          </div>
        </section>

        {/* Learning Objectives */}
        <section className="learning-objectives-section">
          <h3>🎓 Objectifs d'Apprentissage</h3>
          <div className="objectives-grid">
            {module.name === 'POO C++' && (
              <>
                <div className="objective-card">
                  <h4>✓ Concepts POO</h4>
                  <p>Comprendre classes, héritage, polymorphisme et encapsulation</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Syntaxe C++</h4>
                  <p>Maîtriser C++ orienté objet et templates</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Programmation</h4>
                  <p>Créer des applications structurées et maintenables</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Design Patterns</h4>
                  <p>Appliquer les patterns de conception courants</p>
                </div>
              </>
            )}
            {module.name === 'Web 2' && (
              <>
                <div className="objective-card">
                  <h4>✓ JavaScript Moderne</h4>
                  <p>ES6+, async/await, et manipulation DOM</p>
                </div>
                <div className="objective-card">
                  <h4>✓ React + Hooks</h4>
                  <p>Créer des composants réactifs et gérer l'état</p>
                </div>
                <div className="objective-card">
                  <h4>✓ APIs Web</h4>
                  <p>Intégration REST, Fetch API et WebSockets</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Responsive Design</h4>
                  <p>Design mobile-first et CSS moderne</p>
                </div>
              </>
            )}
            {module.name === 'Analyse Numérique' && (
              <>
                <div className="objective-card">
                  <h4>✓ Méthodes Numériques</h4>
                  <p>Résolution d'équations et systèmes linéaires</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Interpolation</h4>
                  <p>Approximation de fonctions et polynômes</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Dérivation Numérique</h4>
                  <p>Calcul de dérivées et différences finies</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Implémentation</h4>
                  <p>Coder les algorithmes en C++</p>
                </div>
              </>
            )}
            {module.name === 'BDR' && (
              <>
                <div className="objective-card">
                  <h4>✓ Modélisation</h4>
                  <p>MCD/MLD et entité-association</p>
                </div>
                <div className="objective-card">
                  <h4>✓ SQL</h4>
                  <p>Requêtes SELECT, INSERT, UPDATE, DELETE</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Normalisation</h4>
                  <p>Formes normales et design relationnel</p>
                </div>
                <div className="objective-card">
                  <h4>✓ Transactions</h4>
                  <p>ACID et gestion des contraintes</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Resources */}
        <section className="resources-section">
          <h3>📖 Ressources & Matériaux</h3>
          <div className="resources-grid">
            <div className="resource-card">
              <span className="resource-icon">📚</span>
              <h4>Lecture Principale</h4>
              <ul>
                <li>
                  <a className="resource-link" href={S4_DRIVE_URL} target="_blank" rel="noreferrer">Drive S4 (Supports Officiels)</a>
                </li>
                {moduleResources.lecture.map((item) => (
                  <li key={item.label}>
                    <a className="resource-link" href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="resource-card">
              <span className="resource-icon">🎥</span>
              <h4>Vidéos Tutoriels</h4>
              <ul>
                {moduleResources.video.map((item) => (
                  <li key={item.label}>
                    <a className="resource-link" href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="resource-card">
              <span className="resource-icon">💻</span>
              <h4>Exercices Pratiques</h4>
              <ul>
                {moduleResources.practice.map((item) => (
                  <li key={item.label}>
                    <a className="resource-link" href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="resource-card">
              <span className="resource-icon">🧪</span>
              <h4>Tests & Quizz</h4>
              <ul>
                {moduleResources.quiz.map((item) => (
                  <li key={item.label}>
                    <a className="resource-link" href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Study Tips */}
        <section className="study-tips-section">
          <h3>📚 Conseils d'Étude pour {module.name}</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">🎯</span>
              <h4>Approche Recommandée</h4>
              <p>
                {module.difficulty === 'easy' && 'Commencez par une lecture rapide, puis pratiquez avec des exercices.'}
                {module.difficulty === 'medium' && 'Étudier progressivement, en maîtrisant chaque concept avant de passer au suivant.'}
                {module.difficulty === 'hard' && 'Allez lentement, prenez des notes détaillées et pratiquez beaucoup d\'exercices.'}
              </p>
            </div>

            <div className="tip-card">
              <span className="tip-icon">⏰</span>
              <h4>Durée d'Étude Suggérée</h4>
              <p>
                {module.difficulty === 'easy' && '2-3 heures par semaine'}
                {module.difficulty === 'medium' && '4-5 heures par semaine'}
                {module.difficulty === 'hard' && '6-8 heures par semaine'}
              </p>
            </div>

            <div className="tip-card">
              <span className="tip-icon">🔑</span>
              <h4>Points Clés</h4>
              <p>
                {module.difficulty === 'easy' && 'Comprenez d\'abord, mémorisez ensuite.'}
                {module.difficulty === 'medium' && 'L\'application pratique est essentielle.'}
                {module.difficulty === 'hard' && 'Travaillez sur des problèmes complexes régulièrement.'}
              </p>
            </div>

            <div className="tip-card">
              <span className="tip-icon">📊</span>
              <h4>Format d'Exam</h4>
              <p>
                {module.difficulty === 'easy' && 'QCM et exercices simples (60% pratique)'}
                {module.difficulty === 'medium' && 'Exercices et problèmes mixtes (50/50)'}
                {module.difficulty === 'hard' && 'Problèmes complexes et démonstrations (70%)'}
              </p>
            </div>

            <div className="tip-card">
              <span className="tip-icon">⭐</span>
              <h4>Stratégie Efficace</h4>
              <p>
                {module.difficulty === 'easy' && 'Réviser régulièrement, faire tous les exercices'}
                {module.difficulty === 'medium' && 'Comprendre en profondeur, appliquer sur projets'}
                {module.difficulty === 'hard' && 'Maîtriser fondamentaux avant sujets avancés'}
              </p>
            </div>

            <div className="tip-card">
              <span className="tip-icon">🚀</span>
              <h4>Avant l'Examen</h4>
              <p>
                Révisez les sujets difficiles, faites des tests de simulation, dormez bien la veille
              </p>
            </div>
          </div>
        </section>

        {/* Difficult Topics */}
        <section className="difficult-topics-section">
          <h3>⚠️ Sujets Généralement Difficiles</h3>
          <div className="difficult-list">
            {module.chapters.slice(Math.max(0, module.chapters.length - 2)).map(chapter => (
              <div key={chapter.id} className="difficult-item">
                <span className="difficulty-icon">🔴</span>
                <div>
                  <h4>{chapter.name}</h4>
                  <p>{chapter.topics.slice(0, 3).join(', ')}...</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModuleDetails;
