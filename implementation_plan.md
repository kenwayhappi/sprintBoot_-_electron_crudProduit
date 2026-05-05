# Architecture Spring Boot + Electron : Gestion de Produits

Ce projet consiste à créer une application de bureau complète utilisant une architecture découplée : un backend **Spring Boot** (Java) servant une API REST et un frontend **Electron** (JavaScript/HTML/CSS) pour l'interface utilisateur.

## Concept de l'Application
Pour rester simple et efficace pour une présentation, nous allons réaliser une application de **"Gestion de Stock" (CRUD Produits)**.
- **Create** : Ajouter un produit (Nom, Prix, Quantité).
- **Read** : Lister les produits.
- **Update** : Modifier un produit.
- **Delete** : Supprimer un produit.

## Architecture Technique
L'architecture repose sur la séparation des responsabilités :
1.  **Backend (Spring Boot)** : Gère la logique métier, la base de données et expose des points d'accès (endpoints) REST.
2.  **Frontend (Electron)** : Application "Desktop" qui communique avec le backend via des requêtes HTTP (Fetch API).
3.  **Communication** : Échanges de données au format JSON.

---

## Plan d'Action

### Phase 1 : Backend (Spring Boot)
1.  **Configuration** : Utiliser H2 Database (base de données en mémoire) pour éviter d'installer MySQL sur l'ordinateur de présentation.
2.  **Modèle** : Créer la classe `Product`.
3.  **Repository** : Interface JPA pour les opérations de base de données.
4.  **Controller** : Exposer les routes REST (`/api/products`).
5.  **CORS** : Autoriser les requêtes provenant de l'application Electron.

### Phase 2 : Frontend (Electron)
1.  **Initialisation** : Créer un dossier `frontend-electron` à côté de `backend-crud`.
2.  **Structure** :
    - `main.js` : Point d'entrée d'Electron (gestion de la fenêtre).
    - `index.html` : Interface utilisateur (Design moderne avec CSS).
    - `renderer.js` : Logique JS pour appeler le backend et mettre à jour le DOM.
3.  **Design** : Utiliser une esthétique premium (Gradients, Glassmorphism).

### Phase 3 : Documentation (Rapport & PowerPoint)
1.  **Rapport** : Explication des technologies, schéma de l'architecture, extraits de code clés.
2.  **PowerPoint** :
    - Diapo 1 : Présentation du sujet.
    - Diapo 2 : Schéma d'architecture (Frontend <-> Backend).
    - Diapo 3 : Pourquoi Spring Boot & Electron ?
    - Diapo 4 : Démonstration du CRUD.
    - Diapo 5 : Conclusion.

---

## Modifications Proposées

### [Backend]
#### [MODIFY] [pom.xml](file:///c:/Users/MATHIS/Desktop/vendredi/java/Examen/backend-crud/pom.xml)
- Changer MySQL pour H2 pour faciliter la portabilité.

#### [NEW] `Product.java`
- Entité simple avec ID, nom, prix.

#### [NEW] `ProductController.java`
- Gestion des requêtes GET, POST, PUT, DELETE.

### [Frontend]
#### [NEW] Dossier `frontend-electron`
- Contenant `package.json`, `main.js`, `index.html` et `style.css`.

---

## Plan de Vérification

### Tests Automatisés
- Test des endpoints REST avec Postman ou via le navigateur.
- Vérification du lancement d'Electron sans erreur console.

### Vérification Manuelle
- Lancer le backend.
- Lancer le frontend.
- Effectuer un cycle complet : Ajouter -> Voir -> Modifier -> Supprimer un produit.
