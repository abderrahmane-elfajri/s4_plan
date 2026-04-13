export const S4_DRIVE_URL = 'https://drive.google.com/drive/u/0/folders/14fuJgRhCKclGwMtVQFjlsqfdufsouLlc';

export const globalResources = [
  {
    id: 'drive',
    title: 'S4 Drive Folder',
    description: 'Tous les supports, chapitres, TD et documents du semestre.',
    url: S4_DRIVE_URL,
    type: 'drive'
  },
  {
    id: 'react-docs',
    title: 'React Documentation',
    description: 'Guide officiel pour React, hooks et composants.',
    url: 'https://react.dev/learn',
    type: 'web'
  },
  {
    id: 'mdn',
    title: 'MDN Web Docs',
    description: 'Référence complète pour JavaScript, HTML et CSS.',
    url: 'https://developer.mozilla.org/',
    type: 'web'
  },
  {
    id: 'revision-kit',
    title: 'Méthodes de Révision',
    description: 'Techniques de révision rapide et efficace.',
    url: 'https://www.coursera.org/articles/study-skills',
    type: 'study'
  },
  {
    id: 'gfg',
    title: 'GeeksforGeeks',
    description: 'Tutoriels et exercices en programmation.',
    url: 'https://www.geeksforgeeks.org/',
    type: 'web'
  },
  {
    id: 'khan',
    title: 'Khan Academy',
    description: 'Ressources gratuites pour mathématiques et informatique.',
    url: 'https://www.khanacademy.org/',
    type: 'study'
  }
];

export const moduleResourceHighlights = {
  'POO C++': [
    { label: 'CPPReference', url: 'https://en.cppreference.com/w/' },
    { label: 'LearnCpp', url: 'https://www.learncpp.com/' },
    { label: 'C++ Practice', url: 'https://www.hackerrank.com/domains/cpp' },
    { label: 'GeeksforGeeks OOP', url: 'https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/' },
    { label: 'Cplusplus Tutorial', url: 'https://cplusplus.com/doc/tutorial/' }
  ],
  'Programmation Web 2': [
    { label: 'React Learn', url: 'https://react.dev/learn' },
    { label: 'JavaScript.info', url: 'https://javascript.info/' },
    { label: 'Frontend Practice', url: 'https://www.frontendmentor.io/challenges' },
    { label: 'MDN JS', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { label: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/' }
  ],
  'Analyse Numérique 1': [
    { label: 'MIT OCW', url: 'https://ocw.mit.edu/search/?q=numerical+analysis' },
    { label: 'Khan Academy Math', url: 'https://www.khanacademy.org/math' },
    { label: 'Numerical Methods Videos', url: 'https://www.youtube.com/results?search_query=numerical+methods' },
    { label: 'Wolfram Math', url: 'https://www.wolframalpha.com/examples/mathematics/' },
    { label: 'Paul Notes', url: 'https://tutorial.math.lamar.edu/' }
  ],
  'Bases de Données Relationnelles': [
    { label: 'SQLBolt', url: 'https://sqlbolt.com/' },
    { label: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/' },
    { label: 'SQL Exercises', url: 'https://www.hackerrank.com/domains/sql' },
    { label: 'W3Schools SQL', url: 'https://www.w3schools.com/sql/' },
    { label: 'DB Fiddle', url: 'https://www.db-fiddle.com/' }
  ],
  'Structures de Données': [
    { label: 'Visualgo', url: 'https://visualgo.net/en' },
    { label: 'LeetCode', url: 'https://leetcode.com/problemset/' },
    { label: 'GFG DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
    { label: 'NeetCode', url: 'https://neetcode.io/practice' },
    { label: 'HackerRank DS', url: 'https://www.hackerrank.com/domains/data-structures' }
  ],
  "Système d'Exploitation 2": [
    { label: 'OSTEP Book', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
    { label: 'MIT Operating Systems', url: 'https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/' },
    { label: 'Linux Kernel Docs', url: 'https://www.kernel.org/doc/html/latest/' },
    { label: 'GFG OS', url: 'https://www.geeksforgeeks.org/operating-systems/' },
    { label: 'Linux Journey', url: 'https://linuxjourney.com/' }
  ],
  Français: [
    { label: 'TV5 Monde', url: 'https://apprendre.tv5monde.com/fr' },
    { label: 'Lawless French', url: 'https://www.lawlessfrench.com/grammar/' },
    { label: 'Francais Facile', url: 'https://www.francaisfacile.com/' },
    { label: 'Le Point du FLE', url: 'https://www.lepointdufle.net/' },
    { label: 'Reverso Conjugaison', url: 'https://conjugator.reverso.net/conjugation-french.html' }
  ]
};
