# 3DSAN — Plataforma Profesional de Impresiones 3D

**3DSAN** es una plataforma web moderna diseñada para actuar como portafolio, vidriera digital y canal de contacto para el negocio de fabricación aditiva. El sitio prioriza la experiencia visual y la interactividad para exhibir servicios y trabajos personalizados sin las complejidades de un e-commerce tradicional.

---

## 🚀 Características Principales

* **Portafolio Interactivo:** Visualización detallada de trabajos realizados y servicios ofrecidos.
* **Visor 3D:** Integración de modelos tridimensionales mediante **Three.js** para una experiencia inmersiva.
* **Interfaz Fluida:** Navegación optimizada y animaciones dinámicas con **Framer Motion**.
* **Diseño Responsive:** Adaptabilidad total para dispositivos móviles y escritorio.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Backend** | Java 17 + Spring Boot 3.3 |
| **Seguridad** | Spring Security + JWT |
| **Persistencia** | JPA / Hibernate + MySQL |
| **Frontend** | React + Vite (SPA) |
| **Animaciones** | Framer Motion |
| **Gráficos 3D** | Three.js |

---

## 🏗️ Estructura del Proyecto

El sistema utiliza una arquitectura desacoplada para facilitar el mantenimiento y la escalabilidad:

* **`/backend`**: API REST robusta que gestiona la lógica de negocio y la persistencia de datos.
* **`/frontend`**: Aplicación Single Page (SPA) que consume los servicios de la API de forma eficiente.

---

## 🔧 Configuración e Instalación

### Requisitos Previos
* Java JDK 17 o superior.
* Node.js (versión LTS recomendada).
* Gestor de base de datos MySQL.

### Pasos Generales
1.  **Base de Datos:** Configurar el esquema en MySQL y actualizar las propiedades de conexión en el backend.
2.  **Servidor:** Compilar y ejecutar el módulo backend utilizando Maven (`mvn spring-boot:run`).
3.  **Cliente:** Instalar dependencias mediante `npm install` y lanzar el entorno de desarrollo con `npm run dev`.

---


