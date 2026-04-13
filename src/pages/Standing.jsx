import React, { useState } from 'react';
import { modules } from '../data/siteData';
import { globalResources } from '../data/resourcesData';
import '../styles/Standing.css';
import { CheckCircle2, Circle, Video, FileText, Code, GraduationCap, Globe, BookOpen } from 'lucide-react';

const Standing = ({ progress, onUpdateProgress, onOpenModule, onOpenStandingModule, darkMode }) => {
  const [expandedModule, setExpandedModule] = useState(1);
  const [trackingData, setTrackingData] = useState(() => {
    const saved = localStorage.getItem('standingTracking');
    return saved ? JSON.parse(saved) : {
      attendance: {},
      grades: {},
      studyHours: {},
      assignments: {}
    };
  });

  // Save tracking data to localStorage
  const saveTracking = (newData) => {
    setTrackingData(newData);
    localStorage.setItem('standingTracking', JSON.stringify(newData));
  };

  // Calculate overall statistics
  const stats = {
    totalModules: modules.length,
    completedModules: modules.filter(m => {
      const chapters = progress[m.id]?.completedChapters?.size || 0;
      const totalChapters = m.chapters.length;
      return chapters === totalChapters;
    }).length,
    averageProgress: Math.round(
      modules.reduce((sum, m) => {
        const chapters = progress[m.id]?.completedChapters?.size || 0;
        return sum + (chapters / m.chapters.length) * 100;
      }, 0) / modules.length
    ),
    totalStudyHours: Object.values(trackingData.studyHours).reduce((a, b) => a + b, 0)
  };

  // Grade calculations
  const moduleGrades = modules.map(m => {
    const completion = (progress[m.id]?.completedChapters?.size || 0) / m.chapters.length * 100;
    const gradePoint = Math.min(20, (completion / 100) * 20);
    return {
      id: m.id,
      name: m.name,
      grade: gradePoint.toFixed(2),
      completion
    };
  });

  const averageGrade = (moduleGrades.reduce((sum, g) => sum + parseFloat(g.grade), 0) / moduleGrades.length).toFixed(2);

  // Attendance tracking
  const handleAttendanceToggle = (moduleId) => {
    const newData = { ...trackingData };
    if (!newData.attendance[moduleId]) {
      newData.attendance[moduleId] = { attended: 0, total: 0 };
    }
    newData.attendance[moduleId].attended = (newData.attendance[moduleId].attended + 1) % 16;
    newData.attendance[moduleId].total = 15;
    saveTracking(newData);
  };

  // Study hours tracking
  const handleStudyHoursChange = (moduleId, hours) => {
    const newData = { ...trackingData };
    newData.studyHours[moduleId] = parseInt(hours) || 0;
    saveTracking(newData);
  };

  // Assignment tracking
  const handleAssignmentToggle = (moduleId) => {
    const newData = { ...trackingData };
    if (!newData.assignments[moduleId]) {
      newData.assignments[moduleId] = { completed: 0, total: 5 };
    }
    newData.assignments[moduleId].completed = (newData.assignments[moduleId].completed + 1) % 6;
    saveTracking(newData);
  };

  // Resources data
  const getResourcesForModule = (moduleName) => {
    const resources = {
      'POO C++': [
        { type: 'video', title: 'Object-Oriented Programming in C++', url: 'https://www.youtube.com/results?search_query=object+oriented+programming+c%2B%2B', icon: Video },
        { type: 'document', title: 'CPPReference OOP Guide', url: 'https://en.cppreference.com/w/', icon: FileText },
        { type: 'practice', title: 'C++ Exercises', url: 'https://www.hackerrank.com/domains/cpp', icon: Code },
        { type: 'course', title: 'GeeksforGeeks OOP', url: 'https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/', icon: GraduationCap },
        { type: 'book', title: 'LearnCpp', url: 'https://www.learncpp.com/', icon: BookOpen },
        { type: 'web', title: 'cplusplus.com', url: 'https://cplusplus.com/doc/tutorial/', icon: Globe }
      ],
      'Web 2': [
        { type: 'video', title: 'Modern Web Development', url: 'https://www.youtube.com/results?search_query=modern+web+development+javascript+react', icon: Video },
        { type: 'document', title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', icon: FileText },
        { type: 'practice', title: 'Frontend Mentor', url: 'https://www.frontendmentor.io/challenges', icon: Code },
        { type: 'course', title: 'freeCodeCamp Web', url: 'https://www.freecodecamp.org/learn/', icon: GraduationCap },
        { type: 'book', title: 'JavaScript.info', url: 'https://javascript.info/', icon: BookOpen },
        { type: 'web', title: 'React Docs', url: 'https://react.dev/learn', icon: Globe }
      ],
      'Analyse Numérique': [
        { type: 'video', title: 'Numerical Methods Videos', url: 'https://www.youtube.com/results?search_query=numerical+methods+course', icon: Video },
        { type: 'document', title: 'Numerical Analysis Notes', url: 'https://tutorial.math.lamar.edu/classes/calcii/newtonsmethod.aspx', icon: FileText },
        { type: 'practice', title: 'Math Exercises', url: 'https://www.wolframalpha.com/examples/mathematics/', icon: Code },
        { type: 'course', title: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/search/?q=numerical+analysis', icon: GraduationCap },
        { type: 'book', title: 'Pauls Online Notes', url: 'https://tutorial.math.lamar.edu/', icon: BookOpen },
        { type: 'web', title: 'Khan Academy Math', url: 'https://www.khanacademy.org/math', icon: Globe }
      ],
      'BDR': [
        { type: 'video', title: 'Database Design Tutorial', url: 'https://www.youtube.com/results?search_query=database+design+sql+tutorial', icon: Video },
        { type: 'document', title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', icon: FileText },
        { type: 'practice', title: 'SQLBolt Practice', url: 'https://sqlbolt.com/', icon: Code },
        { type: 'course', title: 'Khan SQL Course', url: 'https://www.khanacademy.org/computing/computer-programming/sql', icon: GraduationCap },
        { type: 'book', title: 'W3Schools SQL', url: 'https://www.w3schools.com/sql/', icon: BookOpen },
        { type: 'web', title: 'DB Fiddle', url: 'https://www.db-fiddle.com/', icon: Globe }
      ],
      'Structures de Données': [
        { type: 'video', title: 'Data Structures Explained', url: 'https://www.youtube.com/results?search_query=data+structures+and+algorithms', icon: Video },
        { type: 'document', title: 'Visualgo Structures', url: 'https://visualgo.net/en', icon: FileText },
        { type: 'practice', title: 'LeetCode Practice', url: 'https://leetcode.com/problemset/', icon: Code },
        { type: 'course', title: 'Coursera DSA', url: 'https://www.coursera.org/search?query=data%20structures', icon: GraduationCap },
        { type: 'book', title: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/', icon: BookOpen },
        { type: 'web', title: 'Algo Expert Topics', url: 'https://neetcode.io/practice', icon: Globe }
      ],
      'SE2': [
        { type: 'video', title: 'Operating Systems Course', url: 'https://www.youtube.com/results?search_query=operating+systems+course', icon: Video },
        { type: 'document', title: 'Linux Documentation', url: 'https://www.kernel.org/doc/html/latest/', icon: FileText },
        { type: 'practice', title: 'OS Practice Problems', url: 'https://www.geeksforgeeks.org/operating-systems/', icon: Code },
        { type: 'course', title: 'MIT OS Lectures', url: 'https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/', icon: GraduationCap },
        { type: 'book', title: 'OSTEP Book', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', icon: BookOpen },
        { type: 'web', title: 'Unix Guide', url: 'https://ryanstutorials.net/linuxtutorial/', icon: Globe }
      ],
      'Français': [
        { type: 'video', title: 'French Language Lessons', url: 'https://www.youtube.com/results?search_query=french+grammar+lessons', icon: Video },
        { type: 'document', title: 'French Grammar Guide', url: 'https://www.lawlessfrench.com/grammar/', icon: FileText },
        { type: 'practice', title: 'Writing Exercises', url: 'https://www.francaisfacile.com/', icon: Code },
        { type: 'course', title: 'TV5 Monde Apprendre', url: 'https://apprendre.tv5monde.com/fr', icon: GraduationCap },
        { type: 'book', title: 'Le Point du FLE', url: 'https://www.lepointdufle.net/', icon: BookOpen },
        { type: 'web', title: 'Conjugaison Reverso', url: 'https://conjugator.reverso.net/conjugation-french.html', icon: Globe }
      ]
    };
    return resources[moduleName] || [];
  };

  return (
    <div className={`standing-page ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <section className="standing-header">
        <h1>📊 Votre Standing Académique</h1>
        <p>Suivi de votre progression, présences, notes et ressources</p>
      </section>

      {/* Overall Statistics */}
      <section className="stats-grid">
        <div className="stat-card stat-1">
          <div className="stat-value">{stats.completedModules}</div>
          <div className="stat-label">Modules Complétés</div>
          <div className="stat-sub">{stats.totalModules} au total</div>
        </div>
        <div className="stat-card stat-2">
          <div className="stat-value">{stats.averageProgress}%</div>
          <div className="stat-label">Progression Moyenne</div>
          <div className="stat-sub">Tous les chapitres</div>
        </div>
        <div className="stat-card stat-3">
          <div className="stat-value">{averageGrade}/20</div>
          <div className="stat-label">Moyenne Générale</div>
          <div className="stat-sub">Basée sur la progression</div>
        </div>
        <div className="stat-card stat-4">
          <div className="stat-value">{stats.totalStudyHours}h</div>
          <div className="stat-label">Heures d'Étude</div>
          <div className="stat-sub">Total enregistré</div>
        </div>
      </section>

      <section className="standing-global-resources">
        <h2>🔗 Ressources Globales (Drive + Web)</h2>
        <div className="resources-grid">
          {globalResources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className={`resource-card resource-${resource.type}`}
            >
              {resource.type === 'drive' && <BookOpen size={24} />}
              {resource.type === 'web' && <Globe size={24} />}
              {resource.type === 'study' && <GraduationCap size={24} />}
              <span>{resource.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Module Details */}
      <section className="modules-tracking">
        <h2>📚 Suivi par Module</h2>
        
        {modules.map((module) => {
          const attendance = trackingData.attendance[module.id] || { attended: 0, total: 15 };
          const grade = moduleGrades.find(g => g.id === module.id);
          const assignments = trackingData.assignments[module.id] || { completed: 0, total: 5 };
          const studyHours = trackingData.studyHours[module.id] || 0;
          const resources = getResourcesForModule(module.name);

          return (
            <div key={module.id} className="module-tracking-card">
              <div 
                className="module-header"
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                style={{ borderLeftColor: module.color }}
              >
                <div className="module-title">
                  <h3>{module.name}</h3>
                  <span className={`status-badge ${grade.completion >= 75 ? 'excellent' : grade.completion >= 50 ? 'good' : 'progress'}`}>
                    {grade.completion.toFixed(0)}%
                  </span>
                </div>
                <div className="module-actions">
                  <button
                    className="open-module-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModule('module-details', module.id);
                    }}
                  >
                    Ouvrir
                  </button>
                  <button
                    className="open-module-btn pro"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenStandingModule('standing-module', module.id);
                    }}
                  >
                    Pro Standing
                  </button>
                  <div className="expand-icon">
                    {expandedModule === module.id ? '−' : '+'}
                  </div>
                </div>
              </div>

              {expandedModule === module.id && (
                <div className="module-details">
                  {/* Grades */}
                  <div className="tracking-section">
                    <h4>📈 Note Prédite</h4>
                    <div className="grade-display">
                      <div className="grade-large">{grade.grade}/20</div>
                      <div className="grade-bar">
                        <div 
                          className="grade-fill"
                          style={{ 
                            width: `${(parseFloat(grade.grade) / 20) * 100}%`,
                            backgroundColor: module.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Attendance */}
                  <div className="tracking-section">
                    <div className="section-header">
                      <h4>✅ Présences en Cours</h4>
                      <button 
                        className="add-btn"
                        onClick={() => handleAttendanceToggle(module.id)}
                      >
                        +1 Présence
                      </button>
                    </div>
                    <div className="attendance-display">
                      <div className="attendance-count">
                        {attendance.attended} / {attendance.total} séances
                      </div>
                      <div className="attendance-bar">
                        <div 
                          className="attendance-fill"
                          style={{ 
                            width: `${(attendance.attended / attendance.total) * 100}%`,
                            backgroundColor: module.color
                          }}
                        ></div>
                      </div>
                      <div className="attendance-percentage">
                        {((attendance.attended / attendance.total) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Study Hours */}
                  <div className="tracking-section">
                    <div className="section-header">
                      <h4>⏱️ Heures d'Étude</h4>
                    </div>
                    <div className="study-hours-input">
                      <input 
                        type="number" 
                        min="0"
                        value={studyHours}
                        onChange={(e) => handleStudyHoursChange(module.id, e.target.value)}
                        placeholder="Heures"
                      />
                      <span className="hours-unit">heures</span>
                    </div>
                  </div>

                  {/* Assignments */}
                  <div className="tracking-section">
                    <div className="section-header">
                      <h4>📝 Devoirs Complétés</h4>
                      <button 
                        className="add-btn"
                        onClick={() => handleAssignmentToggle(module.id)}
                      >
                        +1 Devoir
                      </button>
                    </div>
                    <div className="assignment-display">
                      <div className="assignment-count">
                        {assignments.completed} / {assignments.total} devoirs
                      </div>
                      <div className="assignment-checkboxes">
                        {Array.from({ length: assignments.total }).map((_, i) => (
                          <div key={i} className={`checkbox ${i < assignments.completed ? 'checked' : ''}`}>
                            {i < assignments.completed ? '✓' : '○'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="tracking-section">
                    <h4>📖 Ressources & Matériaux</h4>
                    <div className="resources-grid">
                      {resources.map((resource, idx) => {
                        const Icon = resource.icon;
                        return (
                          <a 
                            key={idx}
                            href={resource.url}
                            className={`resource-card resource-${resource.type}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Icon size={24} />
                            <span>{resource.title}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Progress Breakdown */}
                  <div className="tracking-section">
                    <h4>📊 Progression par Chapitre</h4>
                    <div className="chapters-progress">
                      {module.chapters.map((chapter, idx) => {
                        const isCompleted = progress[module.id]?.completedChapters?.has(chapter.id);
                        return (
                          <button
                            key={chapter.id}
                            type="button"
                            className={`chapter-item ${isCompleted ? 'completed' : ''}`}
                            onClick={() => onOpenModule('module-details', module.id)}
                          >
                            <span className="chapter-number">{idx + 1}</span>
                            <span className="chapter-name">{chapter.name}</span>
                            <span className="check-icon">
                              {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Standing Summary */}
      <section className="standing-summary">
        <h2>🎓 Résumé du Standing</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Status Général</h3>
            <p className={`status-text ${stats.averageProgress >= 75 ? 'excellent' : stats.averageProgress >= 50 ? 'good' : 'progress'}`}>
              {stats.averageProgress >= 75 ? '✓ Excellent' : stats.averageProgress >= 50 ? '≈ Bon' : '→ En Progression'}
            </p>
          </div>
          <div className="summary-card">
            <h3>Priorités</h3>
            <p>
              {modules
                .filter(m => {
                  const prog = progress[m.id]?.completedChapters?.size || 0;
                  return (prog / m.chapters.length) < 0.5;
                })
                .map(m => m.name)
                .slice(0, 2)
                .join(', ') || 'Aucune priorité'}
            </p>
          </div>
          <div className="summary-card">
            <h3>Recommandation</h3>
            <p>
              {stats.averageProgress >= 80 
                ? 'Excellente progression ! Continuez ainsi.' 
                : stats.averageProgress >= 60 
                ? 'Bon travail. Augmentez les heures d\'étude.' 
                : 'Intensifiez votre étude et assistez à plus de cours.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Standing;
