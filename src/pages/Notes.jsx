import React, { useState } from 'react';
import { modules } from '../data/siteData';
import NotesCard from '../components/NotesCard';
import '../styles/Notes.css';

const Notes = ({ progress, onUpdateProgress, darkMode }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Héritage en POO C++',
      content: 'L\'héritage est un mécanisme qui permet à une classe de hériter de propriétés et de méthodes d\'une autre classe. Il favorise la réutilisation du code et la hiérarchie des classes.',
      module: 'POO C++',
      chapter: 'Héritage',
      date: new Date().toISOString()
    },
    {
      id: 2,
      title: 'SQL SELECT avec GROUP BY',
      content: 'GROUP BY regroupe les lignes par une ou plusieurs colonnes et est généralement utilisé avec des fonctions d\'agrégation comme COUNT, SUM, AVG...',
      module: 'BDR',
      chapter: 'SQL SELECT',
      date: new Date().toISOString()
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    module: modules[0].name,
    chapter: modules[0].chapters[0].name
  });
  const [selectedModule, setSelectedModule] = useState('all');

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          ...newNote,
          date: new Date().toISOString()
        }
      ]);
      setNewNote({
        title: '',
        content: '',
        module: modules[0].name,
        chapter: modules[0].chapters[0].name
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleUpdateNote = (id, content) => {
    setNotes(notes.map(n => n.id === id ? { ...n, content } : n));
  };

  const filteredNotes = selectedModule === 'all'
    ? notes
    : notes.filter(n => n.module === selectedModule);

  return (
    <div className={`notes-page ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="page-header">
        <h1>📝 Mes Notes d'Étude</h1>
        <p>Enregistrez et organisez vos notes par module et chapitre</p>
      </div>

      {/* Add Note Button and Form */}
      <section className="add-note-section">
        {!showAddForm ? (
          <button 
            className="add-note-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Ajouter une Nouvelle Note
          </button>
        ) : (
          <div className={`add-note-form ${darkMode ? 'dark' : ''}`}>
            <div className="form-group">
              <label>Titre de la Note</label>
              <input
                type="text"
                placeholder="Ex: Problème d'Héritage en POO"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Module</label>
                <select
                  value={newNote.module}
                  onChange={(e) => setNewNote({ ...newNote, module: e.target.value })}
                >
                  {modules.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Chapitre</label>
                <select
                  value={newNote.chapter}
                  onChange={(e) => setNewNote({ ...newNote, chapter: e.target.value })}
                >
                  {modules.find(m => m.name === newNote.module)?.chapters.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Contenu de la Note</label>
              <textarea
                placeholder="Écrivez vos notes ici..."
                rows="8"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button 
                className="save-btn"
                onClick={handleAddNote}
              >
                Enregistrer la Note
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Filter */}
      <section className="filter-section">
        <div className="filter-header">
          <h2>Filtrer par Module</h2>
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedModule === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedModule('all')}
          >
            Toutes les Notes ({notes.length})
          </button>
          {modules.map(module => (
            <button
              key={module.id}
              className={`filter-btn ${selectedModule === module.name ? 'active' : ''}`}
              onClick={() => setSelectedModule(module.name)}
            >
              {module.shortName} ({notes.filter(n => n.module === module.name).length})
            </button>
          ))}
        </div>
      </section>

      {/* Notes Grid */}
      <section className="notes-section">
        {filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map(note => (
              <NotesCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
                darkMode={darkMode}
              />
            ))}
          </div>
        ) : (
          <div className="no-notes">
            <div className="no-notes-icon">📝</div>
            <h3>Aucune Note Trouvée</h3>
            <p>Vous n'avez pas encore de notes pour ce filtre.</p>
            <button 
              className="add-first-note-btn"
              onClick={() => setShowAddForm(true)}
            >
              Ajouter Votre Première Note
            </button>
          </div>
        )}
      </section>

      {/* Study Notes Tips */}
      <section className="study-notes-tips">
        <h2>💡 Conseils pour prendre des Notes</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">✍️</span>
            <h3>Soyez Concis</h3>
            <p>Notez les points clés plutôt que de tout recopier</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🔑</span>
            <h3>Mots Clés</h3>
            <p>Soulignez ou mettez en valeur les termes importants</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📐</span>
            <h3>Schémas et Diagrammes</h3>
            <p>Utilisez des diagrammes pour visualiser les concepts</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🤔</span>
            <h3>Exemples</h3>
            <p>Notez des exemples concrets pour chaque concept</p>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="quick-reference">
        <h2>📚 Référence Rapide</h2>
        <div className="reference-grid">
          <div className="reference-card">
            <h3>Formules Clés</h3>
            <div className="reference-content">
              <p><strong>Complexité:</strong> O(n), O(n²), O(log n), O(2ⁿ)</p>
              <p><strong>Calcul d'Erreur:</strong> |valeur_réelle - valeur_approx|</p>
              <p><strong>Ordonnancement:</strong> FCFS, SJF, Round Robin</p>
            </div>
          </div>
          <div className="reference-card">
            <h3>Concepts Importants</h3>
            <div className="reference-content">
              <p>✓ Héritage et polymorphisme en POO</p>
              <p>✓ Normalisation des BD (1FN, 2FN, 3FN)</p>
              <p>✓ Gestion des processus en SE</p>
            </div>
          </div>
          <div className="reference-card">
            <h3>À Réviser</h3>
            <div className="reference-content">
              <p>• Syntaxe SQL (SELECT, INSERT, UPDATE, DELETE)</p>
              <p>• Piles et Files (LIFO, FIFO)</p>
              <p>• Algorithmes de tri et recherche</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notes;
