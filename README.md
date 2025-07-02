# Mon Pokédex

Bienvenue dans **Mon Pokédex**, une application web développée avec Vue.js et Vite, utilisant l'API PokeAPI pour afficher et gérer des Pokémon. Ce projet a été réalisé dans le cadre d'un test technique.

---

## 🛠 Stack technique

- **Framework** : Vue.js (Composition API)
- **Build Tool** : Vite
- **State Management** : Pinia
- **Routing** : Vue Router ≥ 4
- **Styling** : Tailwind CSS
- **Persistance** : localStorage
- **API utilisée** : [PokeAPI](https://pokeapi.co)

---

##  Fonctionnalités

### Fonctionnalités principales :
- **Liste paginée des Pokémon** : Parcourir les Pokémons avec pagination (20/60/100 ou rien).
- **Page détail** : Accès aux informations détaillées d'un Pokémon via une route dynamique.
- **Favoris** : Ajout ou extraire des Pokémons de favoris avec en locale.
- **Compteur de favoris** : Affiche le nombre de Pokémon favoris dans le header.


### Bonus :
- **Recherche texte** : Recherchez des Pokémon par leur nom.
- **Sprites animés** : Affichage des Pokémon avec des sprites animés.
- **Filtrage par type** : Filtrez les Pokémon par leur type.
- - **Dark Mode** : A retravailler un peu, mais présent.

---

##  Installation et démarrage

### Prérequis
- Node.js ≥ 16
- npm ≥ 8

### Étapes d'installation

1. Clonez le dépôt :
   ```sh
   git clone <https://github.com/malick1302/MYPOKEDEX>
   cd MON_POKEDEX
   ```

2. Installez les dépendances :
   ```sh
   npm install
   ```

3. Lancez le serveur de développement :
   ```sh
   npm run dev
   ```

4. Accédez à l'application via [http://localhost:5173](http://localhost:5173).

---

##  Structure du projet

```
MON_POKEDEX/
├── src/
│   ├── api/                # Fonctions pour interagir avec l'API PokeAPI
│   ├── assets/             # Fichiers statiques (images, styles)
│   ├── components/         # Composants Vue réutilisables
│   ├── stores/             # Gestion de l'état avec Pinia
│   ├── views/              # Pages principales de l'application
│   ├── router/             # Configuration des routes
│   ├── main.js             # Point d'entrée de l'application
│   └── App.vue             # Composant racine
├── public/                 # Fichiers publics
├── package.json            # Dépendances et scripts
├── vite.config.js          # Configuration Vite
├── tailwind.config.js      # Configuration Tailwind CSS
└── README.md               # Documentation du projet
```

---

## Bonne Balade
