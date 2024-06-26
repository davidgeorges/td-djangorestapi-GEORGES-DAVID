# Application de Suivi de Projets de Recherche

## Introduction

Cette application permet de gérer les informations sur les projets de recherche, les chercheurs, et les publications.

## Installation

### Backend

1. Clonez le dépôt : `git clone ?`
2. Accédez au répertoire du projet : `cd project`
3. Créez un environnement virtuel : `python -m venv env`
4. Activez l'environnement virtuel :
   - Sur Windows : `env\Scripts\activate`
   - Sur MacOS/Linux : `source env/bin/activate`
5. Installez les dépendances : `pip install -r requirements.txt`
6. Appliquez les migrations : `python manage.py migrate`
7. Démarrez le serveur de développement : `python manage.py runserver`

### Frontend

1. Accédez au répertoire `frontend` : `cd frontend`
2. Installez les dépendances : `npm install`
3. Démarrez l'application React : `npm start`

## Utilisation

### API Endpoints

- **Chercheurs**
  - `GET /api/chercheurs/` : Liste des chercheurs
  - `POST /api/chercheurs/` : Créer un nouveau chercheur
  - `GET /api/chercheurs/:id/` : Détails d'un chercheur
  - `PUT /api/chercheurs/:id/` : Mettre à jour un chercheur
  - `DELETE /api/chercheurs
