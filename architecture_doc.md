# Documentation Technique : Architecture Spring Boot & Electron

Ce document explique le fonctionnement interne de l'application de gestion de stock, ainsi que l'interaction entre les deux technologies principales.

## 1. Architecture du Backend (Spring Boot)
Le backend agit comme le **cerveau** de l'application. Il gère les données et la logique métier.

*   **Entité (`Product.java`)** : Définit la structure d'un produit (ID, Nom, Prix, Quantité) dans la base de données.
*   **Repository (`ProductRepository.java`)** : Une interface utilisant Spring Data JPA qui permet d'effectuer des opérations SQL sans écrire de requêtes complexes.
*   **Controller (`ProductController.java`)** : C'est la "porte d'entrée". Il expose des **Points d'accès REST** (Endpoints) :
    *   `GET /api/products` : Lire tout.
    *   `POST /api/products` : Créer.
    *   `PUT /api/products/{id}` : Modifier.
    *   `DELETE /api/products/{id}` : Supprimer.
*   **CORS** : Une configuration spéciale (`@CrossOrigin`) est ajoutée pour autoriser l'application Electron à envoyer des requêtes au serveur Java.

## 2. Architecture du Frontend (Electron)
Le frontend est l'**interface visuelle** avec laquelle l'utilisateur interagit.

*   **Main Process (`main.js`)** : Le script principal qui crée la fenêtre native du système d'exploitation.
*   **Renderer Process (`index.html` + `renderer.js`)** : C'est ici que l'interface est affichée. 
    *   Le fichier `renderer.js` utilise la fonction `fetch()` de JavaScript pour envoyer des messages HTTP au backend Spring Boot.
*   **Design** : Utilisation de CSS moderne (Gradients, Flexbox) pour un rendu "Premium".

## 3. Communication : Comment ça marche ensemble ?
L'architecture suit un modèle **Client-Serveur** :

1.  **Lancement** : Le serveur Spring Boot démarre sur le port `8080`. L'application Electron démarre sa fenêtre.
2.  **Requête** : Quand l'utilisateur clique sur "Ajouter", le JavaScript (`renderer.js`) crée un objet JSON (ex: `{"name": "Ordinateur", "price": 500}`) et l'envoie à `http://localhost:8080/api/products`.
3.  **Traitement** : Spring Boot reçoit le JSON, le transforme en objet Java, et l'enregistre dans la base de données H2.
4.  **Réponse** : Le serveur renvoie une confirmation. Le JavaScript rafraîchit alors la liste affichée sur l'écran.

---

## 4. Points Clés pour le PowerPoint
*   **Sécurité & Découplage** : Le frontend et le backend sont indépendants. On pourrait changer le frontend pour une application mobile sans toucher au code Java.
*   **Base de données H2** : Base de données SQL "In-Memory", idéale pour les démos car elle ne nécessite aucune installation de serveur SQL externe.
*   **Vitesse** : Electron permet d'utiliser la puissance du Web pour le bureau, tandis que Spring Boot assure la robustesse du backend.
