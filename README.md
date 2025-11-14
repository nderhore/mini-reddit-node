# API "Mini-Reddit" 

"Mini-Reddit" est une API RESTful pour un service de partage de liens communautaire (similaire à un mini-Reddit ou Hacker News). Les utilisateurs peuvent s'inscrire, poster des liens et les commenter.

## Fonctionnalités

  * **Authentification :** Inscription et connexion des utilisateurs via JWT (JSON Web Tokens).
  * **Gestion des Liens :** Opérations CRUD complètes (Create, Read, Update, Delete) pour les liens.
  * **Gestion des Commentaires :** Les utilisateurs peuvent commenter les liens postés (Session 2/3).
  * **Sécurité :** Routes protégées et vérification de la propriété (seul un utilisateur peut modifier/supprimer ses propres publications).

## Stack Technique

  * **Node.js** : Environnement d'exécution JavaScript côté serveur.
  * **Express.js** : Framework web minimaliste pour Node.js.
  * **MongoDB** : Base de données NoSQL.
  * **Mongoose** : ODM (Object Data Modeling) pour MongoDB.
  * **JWT (jsonwebtoken)** : Implémentation des JSON Web Tokens pour l'authentification.
  * **bcrypt.js** : Hachage des mots de passe.
  * **dotenv** : Gestion des variables d'environnement.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

  * [Node.js](https://nodejs.org/) (v18.x ou supérieure)
  * [Yarn](https://yarnpkg.com/getting-started/install) (v1.x ou v3.x)
  * Une base de données [MongoDB](https://www.mongodb.com/try/download/community) (locale) ou un compte cloud [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installation et Lancement

1.  **Clonez ce dépôt**

    ```bash
    git clone https://nderhore/mini-reddit-node.fr
    cd mini-reddit-node
    ```

2.  **Installez les dépendances**
    Utilisez Yarn pour installer tous les packages nécessaires listés dans `package.json`.

    ```bash
    yarn install
    ```

3.  **Configurez les variables d'environnement**
    Créez un fichier `.env` à la racine du projet et ajoutez-y les variables suivantes en les adaptant à votre configuration :

    ```env
    # Connexion à votre base de données MongoDB
    # Remplacez <username>, <password> et <dbname>
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority

    # Clé secrète pour signer les tokens JWT (inventez une longue chaîne aléatoire)
    JWT_SECRET=votreclesecreteultralongueetaleatoire123!

    # Port sur lequel le serveur écoutera (3000 est une bonne valeur par défaut)
    PORT=3000
    ```

    > **Important :** Le fichier `.env` est listé dans `.gitignore` et ne doit **jamais** être partagé ou versionné.

4.  **Lancez le serveur**
    Pour démarrer le serveur en mode développement (avec redémarrage automatique à chaque modification grâce à `nodemon`) :

    ```bash
    yarn dev
    ```

    Le serveur sera accessible à l'adresse `http://localhost:3000`.

## Points d'API (Endpoints)

Utilisez un outil comme [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) pour tester les routes.

-----

### Authentification (`/api/auth`)

  * **`POST /api/auth/register`**

      * **Description :** Crée un nouvel utilisateur.
      * **Body :** `{ "username": "testuser", "email": "test@exemple.com", "password": "password123" }`
      * **Réponse (Succès) :** `201 Created` - `{ "token": "..." }`

  * **`POST /api/auth/login`**

      * **Description :** Connecte un utilisateur existant.
      * **Body :** `{ "email": "test@exemple.com", "password": "password123" }`
      * **Réponse (Succès) :** `200 OK` - `{ "token": "..." }`

-----

### Liens (`/api/links`)

  * **`GET /api/links`**

      * **Description :** Récupère la liste de tous les liens.
      * **Accès :** Public.

  * **`GET /api/links/:id`**

      * **Description :** Récupère un lien spécifique par son ID.
      * **Accès :** Public.

  * **`POST /api/links`**

      * **Description :** Crée un nouveau lien.
      * **Accès :** **Protégé** (Nécessite un Token `Bearer` d'authentification).
      * **Body :** `{ "title": "Super article sur Express", "url": "https://expressjs.com/" }`

  * **`PUT /api/links/:id`**

      * **Description :** Met à jour un lien existant.
      * **Accès :** **Protégé** (Seul le propriétaire du lien peut le modifier).
      * **Body :** `{ "title": "Nouveau titre", "description": "Mise à jour." }`

  * **`DELETE /api/links/:id`**

      * **Description :** Supprime un lien.
      * **Accès :** **Protégé** (Seul le propriétaire du lien peut le supprimer).

-----

### 💬 Commentaires (`/api/links/:linkId/comments`)

  * **`POST /api/links/:linkId/comments`**

      * **Description :** Ajoute un commentaire à un lien spécifique.
      * **Accès :** **Protégé**.
      * **Body :** `{ "text": "Super lien, merci pour le partage !" }`

  * **`GET /api/links/:linkId/comments`**

      * **Description :** Récupère tous les commentaires d'un lien.
      * **Accès :** Public.
