# 🧠 Task Manager API - Backend

Este proyecto es el backend para una aplicación de gestión de tareas, desarrollada como parte del challenge técnico de Atom. Está construido con **TypeScript**, **Express.js** y se ejecuta en **Firebase Cloud Functions**, utilizando **Firestore** como base de datos.

---

## ⚙️ Tecnologías Utilizadas

| Categoría         | Herramienta                         |
|-------------------|-------------------------------------|
| Lenguaje          | TypeScript                          |
| Framework Web     | Express.js                          |
| Infraestructura   | Firebase Cloud Functions            |
| Base de Datos     | Firebase Firestore (NoSQL)          |
| Validación        | Zod                                 |
| Documentación API | Swagger (swagger-ui-express)        |
| Testing           | Jest                                |
| CI/CD             | GitHub Actions                      |

---

## 🏧 Arquitectura del Proyecto

Este proyecto está basado en **DDD** (Domain-Driven Design) y principios de **Arquitectura Limpia**, separado en capas:

```
functions/
└── src/
    ├── api/
    │   ├── tasks/           # Controladores, servicios, repositorios y entidades de tareas
    │   └── users/           # Módulo de usuarios
    ├── config/              # Firebase, Swagger
    ├── routes/              # Registro central de rutas
    ├── utils/               # Errores, validaciones, helpers
    └── index.ts             # Entrada principal y exportación de la Cloud Function
```

---

## 📚 Endpoints de la API

La API está documentada con Swagger:

🧪 **URL de documentación interactiva**:  
`https://us-central1-task-manager-atom.cloudfunctions.net/docs`

### 📌 Endpoints principales:

#### 🗂️ Tareas

| Método | Ruta                     | Descripción                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/api/tasks`             | Obtener todas las tareas             |
| GET    | `/api/tasks/:userId`     | Obtener tareas de un usuario         |
| GET    | `/api/tasks/id/:id`      | Obtener tarea por ID                 |
| POST   | `/api/tasks`             | Crear una nueva tarea                |
| PUT    | `/api/tasks/:id`         | Actualizar una tarea existente       |
| DELETE | `/api/tasks/:id`         | Eliminar una tarea                   |

#### 👤 Usuarios

| Método | Ruta                     | Descripción                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/api/users`             | Obtener todos los usuarios           |
| GET    | `/api/users/:email`      | Obtener usuario por correo           |
| GET    | `/api/users/id/:id`      | Obtener usuario por ID               |
| POST   | `/api/users`             | Crear nuevo usuario                  |
| PUT    | `/api/users/:id`         | Actualizar correo del usuario        |
| DELETE | `/api/users/:id`         | Eliminar usuario                     |

---

## ✅ Validaciones

Se utiliza la librería `Zod` para validar el cuerpo de las peticiones (`req.body`).  
Las validaciones se centralizan en esquemas por entidad (`task.schema.ts`, `user.schema.ts`).

---

## 🔐 Manejo de Errores

El proyecto cuenta con un **middleware global de manejo de errores**, que responde con mensajes uniformes y registra logs útiles para debugging.

---

## 🧪 Testing

Se integra `Jest` para realizar pruebas unitarias en los servicios y lógica de negocio.

---

## 🚀 CI/CD

Se utiliza **GitHub Actions** para automatizar el flujo de integración y despliegue:

### 🔄 Flujo automatizado:
1. Lint y build del proyecto.
2. Ejecutar pruebas unitarias.
3. Deploy automático a Firebase Functions.

### 📆 Configuración:
- Se requiere un secreto `FIREBASE_TOKEN` en el repositorio (obtenido con `firebase login:ci`).

---

## 🧠 Buenas Prácticas Aplicadas

- Principios **SOLID**.
- Arquitectura **modular y escalable**.
- Tipado fuerte con interfaces.
- Separación clara de responsabilidades (`controller`, `service`, `repository`).
- Uso de `async/await` y manejo seguro de errores.
- Código limpio, comentado y fácil de mantener.

---

## 📁 Comandos útiles

Desde la carpeta `functions/`:

```bash
npm install         # Instala dependencias
npm run build       # Compila TypeScript a JavaScript
npm run lint        # Ejecuta ESLint
npm test            # Ejecuta tests unitarios
firebase deploy     # Despliega funciones (si es local)
```

---

## 👨‍💼 Autor

**Elvis J Hernández J**  
📩 ejhernandezj@gmail.com
