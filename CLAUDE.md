# Proyecto 3D.san

Stack:
- Backend: Java + Spring Boot (REST, JWT, JPA)
- Frontend: React (SPA)

Dominio:
Trabajo {
  id, titulo, descripcion, categoria,
  imagenes, modelo3DPath, destacado, fecha
}

Endpoints:
- GET /trabajos
- POST /trabajos (ADMIN)
- PUT /trabajos/{id}
- DELETE /trabajos/{id}

Notas:
- Imágenes en backend
- Modelos STL/OBJ