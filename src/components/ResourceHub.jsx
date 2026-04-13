import React from 'react';
import { modules } from '../data/siteData';
import { globalResources, moduleResourceHighlights } from '../data/resourcesData';
import '../styles/ResourceHub.css';

const defaultModuleResources = [
  { label: 'S4 Drive', url: 'https://drive.google.com/drive/u/0/folders/14fuJgRhCKclGwMtVQFjlsqfdufsouLlc' },
  { label: 'YouTube Recherche', url: 'https://www.youtube.com/results?search_query=module+informatique' },
  { label: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/' }
];

const ResourceHub = ({ currentPage, selectedModuleId, onPageChange, darkMode }) => {
  const selectedModule = modules.find((m) => m.id === Number(selectedModuleId));
  const selectedModuleResources = selectedModule
    ? moduleResourceHighlights[selectedModule.name] || defaultModuleResources
    : [];

  return (
    <section className={`resource-hub ${darkMode ? 'dark' : ''}`}>
      <div className="resource-hub-header">
        <h3>Ressources S4</h3>
        <p>Disponibles sur toutes les pages + ressources par module</p>
      </div>

      <div className="global-resources-grid">
        {globalResources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className={`global-resource-card ${resource.type}`}
          >
            <strong>{resource.title}</strong>
            <span>{resource.description}</span>
          </a>
        ))}
      </div>

      <div className="module-links-header">
        <h4>Acces Rapide Modules</h4>
      </div>
      <div className="module-links-grid">
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            className="module-link-btn"
            onClick={() => onPageChange('module-details', module.id)}
          >
            {module.shortName}
          </button>
        ))}
      </div>

      <div className="all-modules-resources">
        <h4>Ressources Web Pour Tous Les Modules</h4>
        <div className="all-modules-grid">
          {modules.map((module) => {
            const moduleResources = moduleResourceHighlights[module.name] || defaultModuleResources;
            return (
              <div key={module.id} className="module-resource-group">
                <div className="module-resource-title">{module.name}</div>
                <div className="module-resource-links">
                  {moduleResources.map((resource) => (
                    <a
                      key={resource.label}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="module-resource-link"
                    >
                      {resource.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedModule && (currentPage === 'module-details' || currentPage === 'standing-module') && (
        <div className="selected-module-resources">
          <div className="selected-module-head">
            <h4>Ressources de {selectedModule.name}</h4>
          </div>
          <div className="selected-module-grid">
            {selectedModuleResources.map((resource) => (
              <a
                key={resource.label}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="selected-module-link"
              >
                {resource.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ResourceHub;
