#  Budgeting App

This is my small private project for budgeting. I will be using it to follow and controll my money.

![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-latest-646cff?style=flat&logo=vite&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-v7-ca4245?style=flat&logo=react-router&logoColor=white) ![Status](https://img.shields.io/badge/Status-In_Development-yellow?style=flat) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

---

## Getting Started (Docker)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Setup

1. Clone the repository
```bash
   git clone https://github.com/yourname/budgetingweb.git
   cd budgetingweb
```

2. Copy the environment template and fill in your own values
```bash
   cp .env.example .env
```

3. Build and start all services
```bash
   docker compose up --build
```

4. Open the app
   - Frontend: http://localhost:5173 (or whatever port you set in `.env`)
   - Backend API: http://localhost:8000

---

##  Tech Stack

**Frontend:** React + TypeScript, built with Vite
**Backend:** PHP (session-based authentication, PDO for database access)
**Database:** MySQL 9.7
**Containerization:** Docker & Docker Compose (frontend, backend, and database each run in isolated containers)
**Styling:** CSS

---

##  Releases

### v1.0.0-alpha — 29/06/2026

**Added**
- Login page with form validation
- background with randomized positions
- React Router setup

---

### v1.1.0-alpha - 30/06/2026

**typescript implementation**

---

### v1.2.0-alpha - 02/07/2026

- Dockerized the application — frontend (React/Vite), backend (PHP), and database (MySQL) now run via Docker Compose

---

### v1.2.1-alpha - 03/07/2026

- Connection to Data Base via PHP

---

### v1.3.0-alpha - 08/07/2026

- Creating categories locally
- Working on creating categories and saving them on db

---

##  License

Private project — no license granted for redistribution.

---
##  Credits
- **Oliwia** - provided the background artwork, design inspiration and moral support
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — font used in the project
- [Shields.io](https://shields.io) — badge

---



<p align="center">Made with ❤️ by Miłosz and Oliwia</p>