# Fullstack Application with React Frontend and Flask Backend

This project is a fullstack application consisting of a React frontend and a Flask backend. The application is containerized using Docker and managed with Docker Compose. The backend uses MySQL as the database and JWT for authentication.

## Project Structure

```
project/
│
├── backend/
│ ├── app/
│ │ ├── init.py
│ │ ├── models.py
│ │ ├── routes.py
│ │ ├── config.py
│ │ ├── utils.py
│ ├── Dockerfile
│ ├── requirements.txt
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── Dockerfile
│ ├── package.json
│ ├── ...
│
├── nginx/
│ ├── nginx.conf
│
├── docker-compose.yml
│
├── README.md
├── .gitignore
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Add auth.local to your /etc/hosts

```
127.0.0.1   auth.local
```

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project
   ```

2. Set up the environment variables:

   ```bash
   cp frontend/.env.example frontend/.env
   ```

3. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

   after everything up please run migrate

   ```bash
   compose exec -it backend bash
   flask db upgrade
   ```

4. Access the application:

- Frontend: http://auth.local
- Backend API: http://auth.local/api/

### Backend

The backend is a Flask application that provides the following endpoints:

POST /register: Register a new user
POST /login: Login a user
GET /profile: Get user profile (JWT required)
PUT /profile: Update user profile (JWT required)

### Frontend

The frontend is a React application served by Nginx.

### Nginx

Nginx is used to serve the React frontend and proxy requests to the backend API.
