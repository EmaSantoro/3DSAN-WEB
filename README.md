# 3DSAN — Sitio Web Profesional de Impresiones 3D

Plataforma web para el negocio de impresión 3D **3DSAN**. Funciona como portafolio, vidriera digital y canal de contacto. No es un e-commerce.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Java 17 + Spring Boot 3.3 |
| Seguridad | Spring Security + JWT |
| Persistencia | JPA/Hibernate + MySQL |
| Frontend | React + Vite (SPA) |
| Animaciones | Framer Motion |
| Visor 3D | Three.js |

---

## Estructura del proyecto

```
mi-primera-app/
├── backend/          # Spring Boot REST API
│   └── src/main/java/com/tresdsam/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── model/
│       ├── dto/
│       ├── security/
│       └── config/
└── frontend/         # React SPA
    └── src/
        ├── components/
        ├── pages/
        └── services/
```

---

## Requisitos previos

- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL corriendo en `localhost:3315`
  - Usuario: `root`
  - Contraseña: *(vacía)*

---

## Inicialización

### 1. Base de datos

La base de datos `tresdsam` se crea automáticamente al levantar el backend (`createDatabaseIfNotExist=true`). No es necesario crear nada manualmente.

Al iniciar por primera vez, se cargan datos de ejemplo automáticamente:
- Usuario administrador (`admin` / `admin123`)
- 4 servicios (Jarras, Llaveros, Piezas Funcionales, Productos Essen)
- 12 trabajos de ejemplo
- 8 preguntas frecuentes

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

La API queda disponible en `http://localhost:8090`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:5173`.

---

## Imágenes

Las imágenes del sitio deben colocarse en `frontend/public/images/`:

| Archivo | Uso |
|---------|-----|
| `logo.png` | Logo de 3DSAN (se aplica filtro blanco automático) |
| `bambulab.jpg` | Foto de las impresoras en la sección Fabricación |
| `personalizados.jpg` | Imagen en la sección de productos personalizados |

Las imágenes de portada de cada servicio se cargan desde el panel de administración o directamente en la base de datos (campo `imagen_portada` en la tabla `servicios`).

---

## Endpoints principales

### Públicos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/servicios` | Lista todos los servicios |
| GET | `/servicios/{slug}` | Detalle de un servicio |
| GET | `/trabajos` | Lista trabajos (filtrables por `?categoria=`) |
| GET | `/trabajos/{id}` | Detalle de un trabajo |
| GET | `/preguntas` | Lista de preguntas frecuentes |
| POST | `/contacto` | Envío de formulario de contacto |
| POST | `/auth/login` | Login de administrador |

### Protegidos (requieren JWT)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/trabajos` | Crear trabajo |
| PUT | `/trabajos/{id}` | Editar trabajo |
| DELETE | `/trabajos/{id}` | Eliminar trabajo |

---

## Páginas del sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Home: Hero, Intro, Servicios, Fabricación, Personalizados, Por qué elegirnos, Contacto |
| `/servicios/:slug` | Detalle de un servicio con sus trabajos |
| `/faq` | Preguntas frecuentes (accordion animado) |

---

## Credenciales por defecto

```
Usuario: admin
Contraseña: admin123
```

> Cambiar en producción modificando `DataInitializer.java` o directamente en la base de datos.

---

## Contacto del negocio

- Instagram: [@3d.san](https://www.instagram.com/3d.san)
- Email: impresiones3dsan@gmail.com

Desarrollado por [Emanuel Santoro](https://www.linkedin.com/in/emanuel-santoro-063615164/)
