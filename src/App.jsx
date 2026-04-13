import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ModuleDetails from './pages/ModuleDetails';
import ProgressTracking from './pages/ProgressTracking';
import Revision from './pages/Revision';
import Notes from './pages/Notes';
import Standing from './pages/Standing';
import StandingModule from './pages/StandingModule';
import ResourceHub from './components/ResourceHub';

import { initialProgress } from './data/siteData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedModuleId, setSelectedModuleId] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(moduleId => {
          parsed[moduleId].completedChapters = new Set(parsed[moduleId].completedChapters);
          parsed[moduleId].completedTopics = new Set(parsed[moduleId].completedTopics);
        });
        return parsed;
      } catch {
        return initialProgress;
      }
    }
    return initialProgress;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const progressToSave = {};
    Object.keys(progress).forEach(moduleId => {
      progressToSave[moduleId] = {
        completedChapters: Array.from(progress[moduleId].completedChapters),
        completedTopics: Array.from(progress[moduleId].completedTopics),
        notes: progress[moduleId].notes
      };
    });
    localStorage.setItem('progress', JSON.stringify(progressToSave));
  }, [progress]);

  useEffect(() => {
    const applyRouteFromHash = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      const route = rawHash || '/';

      if (route === '/' || route === '') {
        setCurrentPage('home');
        return;
      }

      if (route.startsWith('/module/')) {
        const moduleId = parseInt(route.split('/')[2], 10);
        if (!Number.isNaN(moduleId)) {
          setSelectedModuleId(moduleId);
          setCurrentPage('module-details');
        }
        return;
      }

      if (route.startsWith('/standing/module/')) {
        const moduleId = parseInt(route.split('/')[3], 10);
        if (!Number.isNaN(moduleId)) {
          setSelectedModuleId(moduleId);
          setCurrentPage('standing-module');
        }
        return;
      }

      const pageMap = {
        '/dashboard': 'dashboard',
        '/standing': 'standing',
        '/progress': 'progress',
        '/revision': 'revision',
        '/notes': 'notes',
        '/home': 'home'
      };

      setCurrentPage(pageMap[route] || 'home');
    };

    applyRouteFromHash();
    window.addEventListener('hashchange', applyRouteFromHash);

    return () => window.removeEventListener('hashchange', applyRouteFromHash);
  }, []);

  const updateHashFromPage = (page, moduleId) => {
    const pageToHash = {
      home: '/home',
      dashboard: '/dashboard',
      standing: '/standing',
      'standing-module': `/standing/module/${moduleId ?? selectedModuleId}`,
      progress: '/progress',
      revision: '/revision',
      notes: '/notes'
    };

    const newHash = page === 'module-details'
      ? `/module/${moduleId ?? selectedModuleId}`
      : (pageToHash[page] || '/home');

    const targetHash = `#${newHash}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = newHash;
    }
  };

  const handlePageChange = (page, moduleId) => {
    setCurrentPage(page);
    if (moduleId !== undefined) {
      setSelectedModuleId(moduleId);
    }
    updateHashFromPage(page, moduleId);
  };

  const handleSelectModule = (moduleId) => {
    setSelectedModuleId(moduleId);
  };

  const handleUpdateProgress = (moduleId, newProgress) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        completedChapters: new Set(newProgress.completedChapters),
        completedTopics: new Set(newProgress.completedTopics),
        notes: newProgress.notes || prev[moduleId].notes
      }
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navbar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <div className="app-layout">
        {currentPage === 'module-details' && (
          <Sidebar
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onSelectModule={handleSelectModule}
            selectedModuleId={selectedModuleId}
            darkMode={darkMode}
          />
        )}

        <main className="app-main">
          {currentPage === 'home' && (
            <Home 
              onPageChange={handlePageChange}
              progress={progress}
              darkMode={darkMode}
            />
          )}

          {currentPage === 'dashboard' && (
            <Dashboard
              progress={progress}
              onPageChange={handlePageChange}
              darkMode={darkMode}
            />
          )}

          {currentPage === 'module-details' && (
            <ModuleDetails
              moduleId={selectedModuleId}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              darkMode={darkMode}
            />
          )}

          {currentPage === 'progress' && (
            <ProgressTracking
              progress={progress}
              darkMode={darkMode}
            />
          )}

          {currentPage === 'revision' && (
            <Revision
              progress={progress}
              darkMode={darkMode}
            />
          )}

          {currentPage === 'notes' && (
            <Notes
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              darkMode={darkMode}
            />
          )}

          {currentPage === 'standing' && (
            <Standing
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onOpenModule={handlePageChange}
              onOpenStandingModule={handlePageChange}
              darkMode={darkMode}
            />
          )}

          {currentPage === 'standing-module' && (
            <StandingModule
              moduleId={selectedModuleId}
              progress={progress}
              onPageChange={handlePageChange}
              darkMode={darkMode}
            />
          )}

          <ResourceHub
            currentPage={currentPage}
            selectedModuleId={selectedModuleId}
            onPageChange={handlePageChange}
            darkMode={darkMode}
          />
        </main>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
