# 📦 Stock Manager Pro (Spring Boot + Electron)

Ce projet est une application de bureau complète pour la gestion de stock, utilisant une architecture découplée.

## 🛠️ Technologies
- **Backend** : Java Spring Boot, Spring Data JPA, H2 Database (Persistance locale).
- **Frontend** : Electron, HTML5, CSS3 (Premium Dark Theme), JavaScript (Fetch API).

---

## 🚀 Installation et Lancement (Pour vos collaborateurs)

### Pré-requis
- Java 21 ou supérieur installé.
- Node.js installé.

### Étape 1 : Le Backend (Java)
1. Ouvrez un terminal dans le dossier `backend-crud`.
2. Lancez le serveur avec le wrapper Maven fourni :
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
3. Le serveur est prêt quand vous voyez : `Started BackendCrudApplication`.

### Étape 2 : Le Frontend (Electron)
1. Ouvrez un **deuxième** terminal dans le dossier `frontend-electron`.
2. Installez les dépendances (une seule fois) :
   ```bash
   npm install
   ```
3. Lancez l'interface :
   ```bash
   npm start
   ```

---

## 🔍 Fonctionnalités Incluses
- **CRUD Complet** : Ajouter, Voir, Modifier, Supprimer des produits.
- **Validation** : Empêche les prix et quantités négatifs.
- **Recherche** : Filtrage en temps réel des produits.
- **Pagination** : Affichage par blocs de 4 produits pour une meilleure lisibilité.
- **Console Base de Données** : Accessible via `http://localhost:8080/h2-console`.
  - **JDBC URL** : `jdbc:h2:file:./data/examen`

---

## 📂 Structure du Projet
- `/backend-crud` : Code source Java Spring Boot.
- `/frontend-electron` : Code source JavaScript/Electron.
- `/architecture_doc.md` : Explication détaillée pour le rapport d'examen.
