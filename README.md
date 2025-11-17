# Mi API Final - Módulo 7

API RESTful completa desarrollada con Node.js, Express, MongoDB y JWT como proyecto final del Módulo 7.

## Descripción del Proyecto

Este proyecto implementa una API RESTful con las siguientes características principales:

- **Endpoints RESTful** versionados (API v1)
- **Base de datos MongoDB Atlas** con Mongoose
- **Autenticación JWT** (JSON Web Tokens)
- **Rutas protegidas** con middleware de autenticación
- **Documentación completa** con Swagger (usando YAML)
- **Variables de entorno** con dotenv
- **Desplegada en Vercel**
- **ES Modules** :he utilizado import/export en lugar de require/module.exports

---

## URLs de Acceso

| Entorno                   | URL                                                |
| ------------------------- | -------------------------------------------------- |
| **Producción (Vercel)**   | https://modulo7-proyecto-final.vercel.app          |
| **Documentación Swagger** | https://modulo7-proyecto-final.vercel.app/api-docs |
| **Local**                 | http://localhost:3000                              |
| **Swagger Local**         | http://localhost:3000/api-docs                     |

---

## 📁 Estructura del Proyecto

```
mi-api-final/
├── api/
│   └── v1/
│       ├── hello.js         # Endpoint "Hola mundo"
│       ├── saludo.js        # Endpoint con parámetros (nombre)
│       ├── login.js         # Autenticación y generación JWT
│       └── usuarios.js      # CRUD usuarios (protegido con JWT)
├── config/
│   ├── db.js                # Configuración MongoDB Atlas
│   └── swagger.js           # Configuración Swagger con YAML
├── middleware/
│   └── auth.js              # Middleware de verificación JWT
├── modelo/
│   └── Usuario.js           # Modelo/Schema de Usuario
├── imagenes/
│   └── EstructuraExpress.png
│   └── Usuario.js           # Schema de Mongoose para usuarios
├── swagger.yaml             # Documentación OpenAPI 3.0
├── .env                     # Variables de entorno (NO se sube a Git)
├── .env.example             # Plantilla de variables de entorno
├── .gitignore               # Archivos excluidos de Git
├── server.js                # Servidor principal Express
├── package.json             # Dependencias y scripts
├── vercel.json              # Configuración para Vercel
└── README.md                # Este archivo
```

---

## Endpoints de la API

### **1. Ruta de Prueba**

```http
GET /
```

**Respuesta:**

```json
{
  "mensaje": "El servidor funciona correctamente"
}
```

---

### **2. Hello World**

```http
GET /api/v1/hello
```

**Descripción:** Devuelve un mensaje simple "Hola mundo"

**Respuesta:**

```json
{
  "mensaje": "Hola mundo"
}
```

---

### **3. Saludo Personalizado**

```http
GET /api/v1/saludo?nombre=Ana
```

**Descripción:** Devuelve un saludo personalizado con el nombre proporcionado

**Parámetros:**

- `nombre` (query, requerido) - El nombre para personalizar el saludo

**Respuesta exitosa (200):**

```json
{
  "mensaje": "Hola, Ana!"
}
```

**Error sin parámetro (400):**

```json
{
  "error": "Parámetro 'nombre' es requerido"
}
```

---

### **4. Login (Autenticación JWT)**

```http
POST /api/v1/login
Content-Type: application/json
```

**Descripción:** Genera un token JWT si las credenciales son correctas

**Body (JSON):**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Credenciales de prueba:**

- Usuario 1: `admin` / `admin123`
- Usuario 2: `usuario` / `user123`

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error credenciales inválidas (401):**

```json
{
  "error": "Credenciales inválidas"
}
```

**Error sin datos (400):**

```json
{
  "error": "Username y password son requeridos"
}
```

---

### **5. Obtener Usuarios (Ruta Protegida )**

```http
GET /api/v1/usuarios
Authorization: Bearer <token_jwt>
```

**Descripción:** Devuelve la lista de usuarios desde MongoDB Atlas

**REQUIERE TOKEN JWT** - Obtén el token primero con `/api/v1/login`

**Headers requeridos:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Ana",
    "email": "ana@example.com",
    "edad": 25,
    "activo": true
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "Carlos",
    "email": "carlos@example.com",
    "edad": 30,
    "activo": true
  }
]
```

**Error sin token (401):**

```json
{
  "error": "Acceso denegado. Token no proporcionado."
}
```

**Error token inválido (403):**

```json
{
  "error": "Token inválido o expirado"
}
```

**Error del servidor (500):**

```json
{
  "error": "Error al obtener usuarios",
  "detalle": "mensaje detallado del error"
}
```

---

## Documentación Swagger

Accede a la documentación interactiva completa en:

- **Local:** http://localhost:3000/api-docs
- **Producción:** https://mi-api-aventura-sigma.vercel.app/api-docs

La documentación está creada con:

- **swagger-ui-express** - Interfaz gráfica interactiva
- **yamljs** - Lectura del archivo de configuración YAML
- **swagger.yaml** - Especificación OpenAPI 3.0

Desde Swagger puedes:

- Ver todos los endpoints
- Probar las rutas directamente
- Ver ejemplos de request/response
- Autenticarte con JWT

---

## Autenticación JWT

### **Flujo de autenticación:**

1. **Hacer login** para obtener token:

```bash
POST /api/v1/login
{
  "username": "admin",
  "password": "admin123"
}
```

2. **Copiar el token** de la respuesta

3. **Usar el token** en rutas protegidas:

```bash
GET /api/v1/usuarios
Headers: Authorization: Bearer <tu_token_aqui>
```

### **Características:**

- Tokens válidos por **24 horas**
- Encriptación con **JWT_SECRET** desde .env
- Middleware `verificarToken` protege rutas
- Usuarios de prueba incluidos

---

## Base de Datos

### **MongoDB Atlas:**

- Cluster en la nube
- Base de datos: `mi-api-final`
- Colección: `usuarios`
- Conexión con Mongoose

### **Modelo de Usuario:**

```javascript
{
  nombre: String (requerido),
  email: String (requerido, único),
  edad: Number,
  activo: Boolean (default: true)
}
```

---

## Tecnologías Utilizadas

| Tecnología             | Versión | Uso                      |
| ---------------------- | ------- | ------------------------ |
| **Node.js**            | 18+     | Runtime de JavaScript    |
| **Express**            | 5.1.0   | Framework web            |
| **MongoDB**            | Atlas   | Base de datos NoSQL      |
| **Mongoose**           | 8.19.3  | ODM para MongoDB         |
| **jsonwebtoken**       | 9.0.2   | Autenticación JWT        |
| **dotenv**             | 17.2.3  | Variables de entorno     |
| **swagger-ui-express** | 5.0.1   | Documentación API        |
| **yamljs**             | 0.3.0   | Parser YAML para Swagger |

---

## Instalación y Uso

### **1. Clonar el repositorio**

```bash
git clone https://github.com/Anitasoyyo/mi-api-aventura.git
cd mi-api-final
```

### **2. Instalar dependencias**

```bash
npm install
```

### **3. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`):

```bash
MENSAJE_BIENVENIDA=Bienvenido a mi API
MONGODB_URI=obtener_desde_mongodb_atlas_dashboard
JWT_SECRET=genera_una_clave_segura_aleatoria
```

**Variables requeridas:**

| Variable             | Descripción           | Ejemplo                             |
| -------------------- | --------------------- | ----------------------------------- |
| `MENSAJE_BIENVENIDA` | Mensaje personalizado | `"¡Bienvenido!"`                    |
| `MONGODB_URI`        | URL de MongoDB Atlas  | Ver pasos de configuración abajo    |
| `JWT_SECRET`         | Clave para firmar JWT | Usar generador de claves aleatorias |

### **4. Iniciar el servidor**

```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

---

## Configuración de MongoDB Atlas

### **Pasos:**

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un **cluster gratuito** (M0)
3. En **"Database Access"**, crea un usuario con contraseña
4. En **"Network Access"**, añade tu IP o `0.0.0.0/0` (desarrollo)
5. Click en **"Connect"** → **"Connect your application"**
6. Copia la URL de conexión
7. Reemplaza `<password>` con tu contraseña real
8. Reemplaza `<dbname>` con `mi-api-final`
9. Pega la URL en tu archivo `.env`

### ** IMPORTANTE - Seguridad:**

- **NUNCA** subas el archivo `.env` a GitHub
- El archivo `.env` está en `.gitignore` (ya configurado)
- Solo sube `.env.example` (sin credenciales reales)
- Las credenciales van solo en Vercel (Environment Variables)

---

## Desplegar en Vercel

### **Opción 1: Desde GitHub (Recomendado)**

1. **Sube tu código a GitHub:**

```bash
git add .
git commit -m "Proyecto final completo"
git push origin main
```

2. **Ve a [vercel.com](https://vercel.com)** e inicia sesión con GitHub

3. **Importa tu repositorio:**

   - Click en "Add New Project"
   - Selecciona tu repositorio `mi-api-aventura`
   - Click en "Import"

4. **Configura las variables de entorno en Vercel:**

   - En la sección "Environment Variables" agrega:
     - `MONGODB_URI` = (tu URL de MongoDB)
     - `JWT_SECRET` = (tu clave secreta)
     - `MENSAJE_BIENVENIDA` = (tu mensaje)

5. **Deploy:**
   - Click en "Deploy"
   - Espera a que termine (2-3 minutos)
   - ¡Listo! Tu API está en línea 🎉

### **Opción 2: Desde la CLI**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Seguir los pasos en pantalla
```

## Probar la API

### **Con cURL:**

```bash
# 1. Probar endpoint hello
curl http://localhost:3000/api/v1/hello

# 2. Probar saludo
curl "http://localhost:3000/api/v1/saludo?nombre=Ana"

# 3. Hacer login
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 4. Obtener usuarios (con token)
curl http://localhost:3000/api/v1/usuarios \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### **Con Postman/Thunder Client:**

1. Importa los endpoints desde la documentación Swagger
2. O crea las peticiones manualmente
3. Para rutas protegidas, añade el header `Authorization: Bearer <token>`

### **Con Swagger UI:**

1. Abre http://localhost:3000/api-docs
2. Prueba los endpoints directamente desde la interfaz
3. Usa el botón "Authorize" para configurar tu JWT

---

## Scripts Disponibles

```bash
npm start          # Inicia el servidor en producción
npm test           # Ejecuta los tests (por configurar)
```

---

## Estructura de Archivos Detallada

```
mi-api-final/
├── api/v1/                    # Endpoints de la API versión 1
│   ├── hello.js               # GET - Hola mundo
│   ├── saludo.js              # GET - Saludo personalizado
│   ├── login.js               # POST - Autenticación JWT
│   └── usuarios.js            # GET - Lista usuarios (protegido)
│
├── config/                    # Configuraciones
│   ├── db.js                  # Conexión MongoDB con Mongoose
│   └── swagger.js             # Carga swagger.yaml con yamljs
│
├── middleware/                # Middlewares personalizados
│   └── auth.js                # Verificación de token JWT
│
├── modelo/                    # Schemas de Mongoose
│   └── Usuario.js             # Modelo de Usuario
│
├── swagger.yaml               # Documentación OpenAPI 3.0
├── server.js                  # Punto de entrada de la aplicación
├── vercel.json                # Configuración de Vercel
├── package.json               # Dependencias y scripts
├── .env.example               # Plantilla de variables de entorno
├── .gitignore                 # Archivos ignorados por Git
└── README.md                  # Este archivo
```

---

**¡Gracias por revisar mi proyecto!**

```

```
