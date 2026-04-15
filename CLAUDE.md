# 3D.san — README / Especificación Completa para Agente IA

## 🧠 CONTEXTO GENERAL
Este proyecto consiste en el desarrollo de un sitio web profesional para el negocio de impresiones 3D "3D.san".

El objetivo NO es crear un e-commerce, sino una plataforma visual, moderna e interactiva que funcione como:
- Portafolio de trabajos
- Vidriera digital
- Canal de contacto
- Representación de marca

El foco principal está en la EXPERIENCIA VISUAL (UX/UI) y en diferenciarse mediante:
- Animaciones avanzadas
- Interacción con el usuario
- Visualización de modelos 3D (STL/OBJ)

---

## 🧱 ARQUITECTURA

### 🔹 Enfoque
Arquitectura desacoplada (frontend + backend separados)

### 🔹 Backend
- Lenguaje: Java
- Framework: Spring Boot
- Estilo: REST API
- Seguridad: JWT
- Persistencia: JPA / Hibernate

### 🔹 Frontend
- Lenguaje: JavaScript
- Framework: React
- Estilo: SPA (Single Page Application)

---

## 🎯 REQUISITOS FUNCIONALES

### 1. Trabajos / Proyectos
El sistema debe permitir:
- Crear trabajos desde panel admin
- Editar
- Eliminar
- Listar

Cada trabajo debe tener:
- id
- titulo
- descripcion
- imagenes (pocas, almacenadas en backend)
- modelo3D (archivo STL u OBJ opcional)
- categoria
- destacado (boolean)
- fecha

---

### 2. Visualización 3D

REQUERIMIENTO CLAVE:
El frontend debe permitir visualizar modelos STL/OBJ.

Implementación sugerida:
- Librería: Three.js
- Funcionalidades:
  - Rotación automática
  - Zoom con scroll
  - Rotación con mouse

---

### 3. Panel Admin

Debe existir autenticación con JWT.

Funcionalidades:
- Login
- CRUD de trabajos
- Subida de imágenes
- Subida de modelos 3D

Seguridad:
- Roles (ADMIN)
- Endpoints protegidos

---

### 4. Contacto

Formulario con:
- nombre
- email
- mensaje

Backend:
- Endpoint POST /contacto

---

## 🎨 DISEÑO (UX/UI)

### 🔹 Estilo visual
- Minimalista
- Colores base: blanco, negro, grises
- El color lo aportan:
  - imágenes
  - modelos 3D

### 🔹 Experiencia (Nivel 3 — PREMIUM)

El sitio DEBE incluir:

#### Scroll dinámico
- Cambios de texto
- Apariciones progresivas
- Transiciones entre secciones

#### Animaciones
- Framer Motion
- GSAP (opcional)

#### Interacción
- Hover effects
- Microinteracciones

#### Secciones principales

1. Hero
   - Texto fuerte
   - Modelo 3D o animación

2. Trabajos
   - Galería dinámica
   - Filtros

3. Destacados
   - Cards animadas

4. Acerca de
   - Historia
   - Proceso

5. Contacto

---

## 🧩 BACKEND — DISEÑO DETALLADO

### 📦 Estructura

- controller
- service
- repository
- model
- dto
- security

### 📌 Entidad Trabajo

Campos:
- Long id
- String titulo
- String descripcion
- String categoria
- List<String> imagenes
- String modelo3DPath
- Boolean destacado
- LocalDate fecha

---

### 📌 Endpoints

#### Públicos
- GET /trabajos
- GET /trabajos/{id}

#### Admin
- POST /trabajos
- PUT /trabajos/{id}
- DELETE /trabajos/{id}

#### Auth
- POST /auth/login

#### Contacto
- POST /contacto

---

### 🔐 Seguridad

- JWT
- Filtro de autenticación
- Password encriptado (BCrypt)

---

## 💾 BASE DE DATOS

Motor: PostgreSQL

Tablas:
- trabajos
- usuarios
- contactos

---

## 💻 FRONTEND — DISEÑO DETALLADO

### 📁 Estructura

- components
- pages
- services (API)
- hooks
- assets

---

### 🔹 Componentes clave

- Navbar
- Hero
- TrabajoCard
- Galeria
- Viewer3D
- Footer

---

### 🎥 Viewer 3D

Debe:
- Cargar STL/OBJ
- Renderizar con Three.js
- Permitir interacción

---

### 🎬 Animaciones

- Framer Motion
- Scroll animations

---

## 🚀 DEPLOY

### Backend
- Railway / Render

### Frontend
- Vercel

---

## 🤖 PROMPT PARA AGENTE IA

El agente debe:

"""
Construí un sistema web completo para un negocio de impresión 3D llamado 3D.san.

REQUISITOS:

1. Backend en Java con Spring Boot
2. Frontend en React
3. Arquitectura desacoplada
4. API REST
5. JWT para autenticación
6. CRUD completo de trabajos
7. Subida de imágenes y archivos STL/OBJ
8. Visualización 3D con Three.js
9. Diseño moderno con animaciones (Framer Motion)
10. Scroll dinámico tipo landing premium

CONDICIONES:
- Código limpio
- Separación por capas
- Buenas prácticas
- Componentización en frontend
- Responsive design

OBJETIVO UX:
- Impacto visual
- Interacción
- Experiencia moderna

NO implementar carrito de compras.

El sistema debe estar listo para deploy.
"""

---

## 📌 CONSIDERACIONES IMPORTANTES

- Las imágenes se almacenan en backend
- Los modelos 3D son archivos reales
- El foco es visual, no transaccional

---

## 🧭 ROADMAP

1. Setup backend
2. Setup frontend
3. Auth
4. CRUD trabajos
5. Viewer 3D
6. Animaciones
7. Deploy

---

FIN DEL README

