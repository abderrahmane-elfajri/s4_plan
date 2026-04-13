export const modules = [
  {
    id: 1,
    name: "POO C++",
    shortName: "POO",
    description: "Programmation Orientée Objet en C++ - Concepts fondamentaux et avancés",
    difficulty: "hard",
    importance: "critical",
    credits: 4,
    color: "#3B82F6",
    chapters: [
      {
        id: 1,
        name: "Fondamentaux POO",
        topics: [
          "Programmation classique vs POO",
          "Avantages de la POO",
          "Objet logiciel",
          "État",
          "Comportement",
          "Identité"
        ]
      },
      {
        id: 2,
        name: "Classes et Instances",
        topics: [
          "Classe",
          "Instance",
          "Constructeur",
          "Attributs et méthodes",
          "Destructeur",
          "Encapsulation"
        ]
      },
      {
        id: 3,
        name: "Héritage",
        topics: [
          "Héritage",
          "Généralisation",
          "Spécialisation",
          "Hiérarchie des classes",
          "Redéfinition d'une méthode",
          "Sous-classes"
        ]
      },
      {
        id: 4,
        name: "Relations entre Classes",
        topics: [
          "Association entre classes",
          "Multiplicités",
          "Association simple",
          "Association multiple",
          "Composition",
          "Agrégation"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Programmation Web 2",
    shortName: "Web 2",
    description: "JavaScript, DOM, et introduction à React - Développement web moderne",
    difficulty: "medium",
    importance: "critical",
    credits: 4,
    color: "#10B981",
    chapters: [
      {
        id: 1,
        name: "Fondamentaux JavaScript",
        topics: [
          "Introduction",
          "JavaScript",
          "Emplacement du script",
          "Variables",
          "Règles de nomenclature",
          "Types de données"
        ]
      },
      {
        id: 2,
        name: "Opérateurs et Contrôle",
        topics: [
          "Opérateurs",
          "Conditions",
          "Boucles",
          "Switch case",
          "Gestion d'erreurs"
        ]
      },
      {
        id: 3,
        name: "Fonctions et OOP",
        topics: [
          "Fonctions",
          "Portée des variables",
          "OOP en JavaScript",
          "Objets",
          "Prototypes"
        ]
      },
      {
        id: 4,
        name: "DOM et Événements",
        topics: [
          "Tableaux Array",
          "DOM",
          "getElementById",
          "Manipulation des éléments HTML",
          "Création / ajout / suppression d'éléments",
          "Événements"
        ]
      },
      {
        id: 5,
        name: "Formulaires et Styles",
        topics: [
          "Formulaires",
          "Validation",
          "Styles dynamiques",
          "Classes CSS",
          "Animation CSS"
        ]
      },
      {
        id: 6,
        name: "Framework et État",
        topics: [
          "NPM & dépendances",
          "React JS",
          "Composants",
          "Hooks",
          "Zustand Store",
          "Gestion d'état"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Analyse Numérique 1",
    shortName: "Analyse Num",
    description: "Calcul numérique, équations, interpolation et intégration",
    difficulty: "hard",
    importance: "high",
    credits: 3,
    color: "#F59E0B",
    chapters: [
      {
        id: 1,
        name: "Erreurs et Approximations",
        topics: [
          "Calcul approché",
          "Flottants",
          "Troncature et arrondi",
          "Erreur absolue / relative",
          "Analyse d'erreurs",
          "Conditionnement et stabilité"
        ]
      },
      {
        id: 2,
        name: "Résolution d'Équations",
        topics: [
          "Résolution d'équations non linéaires",
          "Existence d'un zéro",
          "Ordre de convergence",
          "Dichotomie",
          "Point fixe",
          "Newton",
          "Sécante",
          "Comparaison des algorithmes"
        ]
      },
      {
        id: 3,
        name: "Interpolation Polynômiale",
        topics: [
          "Interpolation polynômiale",
          "Méthode directe",
          "Lagrange",
          "Estimation de l'erreur",
          "Différences divisées de Newton",
          "Phénomène de Runge"
        ]
      },
      {
        id: 4,
        name: "Dérivation Numérique",
        topics: [
          "Dérivation numérique",
          "Formules à 2 points",
          "Formules à 3 points",
          "Dérivées d'ordre supérieur",
          "Extrapolation de Richardson"
        ]
      },
      {
        id: 5,
        name: "Intégration Numérique",
        topics: [
          "Intégration numérique",
          "Rectangles",
          "Trapèzes",
          "Simpson",
          "Estimation d'erreur"
        ]
      },
      {
        id: 6,
        name: "Systèmes Linéaires",
        topics: [
          "Systèmes linéaires",
          "Cramer",
          "Systèmes triangulaires",
          "Gauss",
          "Choix du pivot",
          "Décomposition LU",
          "Cholesky",
          "Méthodes itératives",
          "Jacobi",
          "Gauss-Seidel",
          "Relaxation"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Bases de Données Relationnelles",
    shortName: "BDR",
    description: "Modélisation, normalisation et SQL - Gestion des données",
    difficulty: "medium",
    importance: "critical",
    credits: 4,
    color: "#EF4444",
    chapters: [
      {
        id: 1,
        name: "Fondamentaux des BD",
        topics: [
          "Introduction aux bases de données",
          "Donnée / information",
          "Base de données",
          "Utilité des bases de données",
          "SGBD",
          "Base de données relationnelle",
          "Tables",
          "Lignes / colonnes",
          "Clé primaire"
        ]
      },
      {
        id: 2,
        name: "Modélisation des Données",
        topics: [
          "Modélisation des données",
          "Modèle Entités-Associations",
          "MERISE",
          "MCD",
          "Entités",
          "Attributs",
          "Identifiants",
          "Associations",
          "Cardinalités",
          "Dépendances fonctionnelles"
        ]
      },
      {
        id: 3,
        name: "Normalisation",
        topics: [
          "Normalisation",
          "1FN (Première Forme Normale)",
          "2FN (Deuxième Forme Normale)",
          "3FN (Troisième Forme Normale)",
          "FNBC",
          "Bonnes pratiques"
        ]
      },
      {
        id: 4,
        name: "MLD et Passage MCD",
        topics: [
          "MLD (Modèle Logique de Données)",
          "Clé primaire",
          "Clé étrangère",
          "Passage MCD → MLD",
          "Relations réflexives",
          "Relations ternaires"
        ]
      },
      {
        id: 5,
        name: "SQL LDD",
        topics: [
          "SQL LDD",
          "CREATE",
          "ALTER",
          "DROP",
          "Types de données",
          "Contraintes",
          "PRIMARY KEY",
          "FOREIGN KEY",
          "UNIQUE",
          "CHECK",
          "AUTO_INCREMENT",
          "DEFAULT"
        ]
      },
      {
        id: 6,
        name: "SQL INSERT et SELECT",
        topics: [
          "SQL INSERT",
          "Insertion simple",
          "Insertion multiple",
          "Import CSV",
          "SQL SELECT",
          "WHERE",
          "ORDER BY",
          "DISTINCT",
          "IN",
          "BETWEEN",
          "LIKE",
          "IS NULL"
        ]
      },
      {
        id: 7,
        name: "SQL Agrégation et Fonctions",
        topics: [
          "GROUP BY",
          "HAVING",
          "COUNT",
          "MIN",
          "MAX",
          "SUM",
          "AVG",
          "CONCAT",
          "LOWER",
          "UPPER",
          "LENGTH",
          "Fonctions de date"
        ]
      },
      {
        id: 8,
        name: "SQL UPDATE et DELETE",
        topics: [
          "SQL UPDATE",
          "SQL DELETE",
          "ON DELETE",
          "ON UPDATE",
          "CASCADE",
          "RESTRICT",
          "SET NULL",
          "Intégrité référentielle",
          "Triggers"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Structures de Données",
    shortName: "Structures",
    description: "Listes, piles, files, arbres et graphes - Organisation des données",
    difficulty: "medium",
    importance: "high",
    credits: 3,
    color: "#8B5CF6",
    chapters: [
      {
        id: 1,
        name: "Rappel Structures en C",
        topics: [
          "Rappel structures en C",
          "Tableaux",
          "Pointeurs",
          "Malloc / Free",
          "Structures",
          "Unions"
        ]
      },
      {
        id: 2,
        name: "Recherche et Listes",
        topics: [
          "Recherche séquentielle",
          "Tableau trié / non trié",
          "Limites des tableaux",
          "Introduction aux listes",
          "Liste simplement chaînée",
          "Structure d'un maillon",
          "Pointeur sur le suivant",
          "Liste vide"
        ]
      },
      {
        id: 3,
        name: "Opérations sur Listes",
        topics: [
          "Insertion",
          "Recherche",
          "Suppression",
          "Insertion en tête",
          "Insertion au milieu",
          "Insertion en queue",
          "Liste doublement chaînée",
          "Liste circulaire"
        ]
      },
      {
        id: 4,
        name: "Piles et Files",
        topics: [
          "Piles (Stack)",
          "LIFO",
          "Opérations push/pop",
          "Files (Queue)",
          "FIFO",
          "Opérations enqueue/dequeue",
          "Applications pratiques"
        ]
      },
      {
        id: 5,
        name: "Arbres Binaires",
        topics: [
          "Arbres binaires",
          "Nœud racine",
          "Feuilles",
          "Hauteur",
          "Parcours en profondeur",
          "Parcours en largeur",
          "Arbres de recherche",
          "AVL",
          "Équilibrage"
        ]
      },
      {
        id: 6,
        name: "Graphes",
        topics: [
          "Graphes",
          "Sommets et arêtes",
          "Graphes orientés",
          "Graphes pondérés",
          "Degré",
          "Chemin",
          "Cycle",
          "Parcours DFS",
          "Parcours BFS",
          "Plus court chemin"
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Système d'Exploitation 2",
    shortName: "SE2",
    description: "Processus, mémoire, fichiers et synchronisation - Gestion du système",
    difficulty: "hard",
    importance: "high",
    credits: 4,
    color: "#06B6D4",
    chapters: [
      {
        id: 1,
        name: "Introduction SE",
        topics: [
          "Processus",
          "Définition système d'exploitation",
          "Rôle du système d'exploitation",
          "Noyau (Kernel)",
          "Gestion des tâches",
          "Gestion mémoire",
          "Gestion E/S",
          "Gestion des fichiers"
        ]
      },
      {
        id: 2,
        name: "Interface et Shell",
        topics: [
          "GUI",
          "CLI",
          "Shell",
          "Système multitâche",
          "Système multi-utilisateurs",
          "Utilisateurs / groupes / root"
        ]
      },
      {
        id: 3,
        name: "Processus et Threads",
        topics: [
          "Programme vs processus",
          "Processus vs thread",
          "PCB (Process Control Block)",
          "Changement de contexte",
          "États d'un processus",
          "New",
          "Ready",
          "Running",
          "Blocked",
          "Terminated",
          "Zombie"
        ]
      },
      {
        id: 4,
        name: "Ordonnancement des Processus",
        topics: [
          "Ordonnancement des processus",
          "Scheduler",
          "Files d'attente",
          "Utilisation CPU",
          "Débit",
          "Temps de rotation",
          "Temps d'attente"
        ]
      },
      {
        id: 5,
        name: "Algorithmes d'Ordonnancement",
        topics: [
          "Ordonnancement non préemptif",
          "Ordonnancement préemptif",
          "FCFS (First Come First Served)",
          "FIFO",
          "SJF (Shortest Job First)",
          "SRTF (Shortest Remaining Time First)",
          "Round Robin",
          "Priorité",
          "Vieillissement"
        ]
      },
      {
        id: 6,
        name: "Ordonnancement Adv.",
        topics: [
          "Temps réel",
          "RMA (Rate Monotonic Analysis)",
          "DMA (Deadline Monotonic Analysis)",
          "EDF (Earliest Deadline First)",
          "Préemption",
          "Inversion de priorité"
        ]
      },
      {
        id: 7,
        name: "Systèmes de Fichiers",
        topics: [
          "Systèmes de fichiers",
          "Fichier",
          "Attributs d'un fichier",
          "Création / lecture / écriture / suppression",
          "Ouverture / fermeture",
          "Accès séquentiel",
          "Accès direct",
          "Accès indexé",
          "Accès haché"
        ]
      },
      {
        id: 8,
        name: "Allocation et Ordonnancement",
        topics: [
          "Allocation contiguë",
          "Allocation enchaînée",
          "Allocation indexée",
          "Allocation par zones",
          "Ordonnancement du disque",
          "SSTF",
          "SCAN",
          "LOOK",
          "C-SCAN",
          "C-LOOK"
        ]
      },
      {
        id: 9,
        name: "Communication IPC",
        topics: [
          "Communication inter-processus",
          "Pipes",
          "FIFOs",
          "Signaux",
          "Sockets",
          "Mémoire partagée"
        ]
      },
      {
        id: 10,
        name: "Synchronisation",
        topics: [
          "Section critique",
          "Exclusion mutuelle",
          "Interblocage",
          "Famine",
          "Peterson",
          "Test and set",
          "Mutex",
          "Sémaphores",
          "Wait",
          "Signal"
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Français",
    shortName: "FR",
    description: "Communication et expression - Compétences linguistiques",
    difficulty: "easy",
    importance: "medium",
    credits: 2,
    color: "#EC4899",
    chapters: [
      {
        id: 1,
        name: "Communication",
        topics: [
          "Communication",
          "Communication écrite",
          "Communication orale",
          "Écoute active",
          "Feedback"
        ]
      },
      {
        id: 2,
        name: "Rédaction",
        topics: [
          "Rédaction",
          "Structure textuelle",
          "Paragraphes",
          "Transitions",
          "Cohérence",
          "Clarté"
        ]
      },
      {
        id: 3,
        name: "Compréhension",
        topics: [
          "Compréhension de textes",
          "Analyse critique",
          "Résumé",
          "Synthèse",
          "Interprétation"
        ]
      },
      {
        id: 4,
        name: "Expression",
        topics: [
          "Expression écrite",
          "Expression orale",
          "Prononciation",
          "Intonation",
          "Présentation"
        ]
      },
      {
        id: 5,
        name: "Vocabulaire Technique",
        topics: [
          "Vocabulaire technique",
          "Termes informatiques",
          "Expressions formelles",
          "Jargon professionnel",
          "Synonymes et antonymes"
        ]
      }
    ]
  }
];

export const difficultyColors = {
  easy: { bg: "#ECFDF5", text: "#065F46", badge: "#10B981" },
  medium: { bg: "#FFFBEB", text: "#78350F", badge: "#F59E0B" },
  hard: { bg: "#FEF2F2", text: "#7F1D1D", badge: "#EF4444" }
};

export const importanceColors = {
  low: { bg: "#E0F2FE", text: "#0C2340", badge: "#0284C7" },
  medium: { bg: "#E0E7FF", text: "#3730A3", badge: "#6366F1" },
  high: { bg: "#FCD34D", text: "#78350F", badge: "#F59E0B" },
  critical: { bg: "#FEE2E2", text: "#7F1D1D", badge: "#EF4444" }
};

export const initialProgress = modules.reduce((acc, module) => {
  acc[module.id] = {
    completedChapters: new Set(),
    completedTopics: new Set(),
    notes: []
  };
  return acc;
}, {});
