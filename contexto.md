# 3DSAN — Plataforma Profesional de Impresiones 3D

## 🚀 Overview
**3DSAN** is a specialized web platform for 3D printing services. It serves as an interactive portfolio, digital storefront, and contact channel. The platform features an integrated 3D viewer (Three.js), smooth animations (Framer Motion), and a robust backend (Spring Boot) for content management.

## 🏗️ Architecture
The project follows a decoupled architecture:
- **Backend**: RESTful API built with Java 17 and Spring Boot 3.3.
- **Frontend**: Single Page Application (SPA) built with React 19 and Vite.

## 🛠️ Tech Stack
- **Backend**:
    - Java 17, Spring Boot 3.3, JPA (Hibernate), MySQL, Spring Security (JWT).
    - Dependencies: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `spring-boot-starter-security`, `lombok`, `mysql-connector-j`.
- **Frontend**:
    - React 19, Vite, Axios, Framer Motion.
    - 3D Graphics: `three`, `@react-three/fiber`, `@react-three/drei`.
    - Routing: `react-router-dom`.

## 📜 Engineering Standards & Conventions

### General
- **Language**: Backend uses Spanish for business logic naming (e.g., `Trabajo`, `Servicio`) but English for infrastructure/framework naming (e.g., `Service`, `Repository`, `Controller`).
- **Git**: Follow standard commit messages and use feature branches if applicable.

### Backend (Spring Boot)
- **Package Structure**: `com.tresdsam.*`
    - `controller`: REST endpoints.
    - `service`: Business logic.
    - `repository`: Data access interfaces.
    - `model`: JPA entities.
    - `dto`: Data Transfer Objects.
    - `config`: Spring configurations (CORS, Beans).
    - `security`: Security settings (JWT, Auth).
    - `exception`: Global and custom exception handling.
- **Dependency Injection**: Prefer constructor injection over `@Autowired`.
- **DTO Mapping**: Currently manual mapping in service layer; maintain consistency.
- **API Design**: Return DTOs, not Entities. Use plural nouns for endpoints (e.g., `/servicios`).

### Frontend (React)
- **Components**: Functional components only. Located in `src/components`.
- **Pages**: Top-level route components in `src/pages`.
- **State & Data**:
    - Centralized API calls in `src/services/api.js` using Axios.
    - Use custom hooks for shared logic (e.g., `src/hooks/useDocumentTitle.js`).
- **Styling**: Vanilla CSS in `App.css` and `index.css`. Prefer standard CSS/interactive features from Framer Motion.
- **3D**: Use `@react-three/fiber` components for 3D interactions.

## 🔧 Development Commands

### Backend
- **Run**: `mvn spring-boot:run` (from `backend/`)
- **Build**: `mvn clean install`

### Frontend
- **Install**: `npm install` (from `frontend/`)
- **Run Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## 🌍 Environment & Variables
- **Backend**: Configuration in `src/main/resources/application.properties`. Supports env vars: `PORT`, `DB_URL`, `DB_USER`, `DB_PASS`, `UPLOAD_PATH`.
- **Frontend**: Use `.env` files. Required: `VITE_API_URL` (points to backend).

## 🗃️ Database
- **Provider**: MySQL.
- **Connection**: `jdbc:mysql://localhost:3315/tresdsam`.
- **Schema Management**: Hibernate `ddl-auto=update`.
