import React, { useState } from 'react';
import { Trash2, Edit2, Save, X } from 'lucide-react';
import '../styles/NotesCard.css';

const NotesCard = ({ 
  note,
  onDelete,
  onUpdate,
  darkMode 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    onUpdate(note.id, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className={`notes-card ${darkMode ? 'dark' : ''}`}>
      <div className="card-header">
        <div className="card-info">
          <h4>{note.title}</h4>
          <p className="module-ref">{note.module} • {note.chapter}</p>
          <p className="date-ref">{new Date(note.date).toLocaleDateString('fr-FR')}</p>
        </div>

        <div className="card-actions">
          {!isEditing && (
            <>
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={16} />
              </button>
              <button 
                className="delete-btn"
                onClick={() => onDelete(note.id)}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="edit-area">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="note-textarea"
          />
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSave}>
              <Save size={16} /> Sauvegarder
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              <X size={16} /> Annuler
            </button>
          </div>
        </div>
      ) : (
        <p className="card-content">{note.content}</p>
      )}
    </div>
  );
};

export default NotesCard;
