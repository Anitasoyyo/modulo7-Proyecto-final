// Configurar variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Importar Express y MongoDB
import express from "express";
import connectDB from "./config/db.js";
import hello from "./api/v1/hello.js";
import saludo from "./api/v1/saludo.js";
import usuarios from "./api/v1/usuarios.js";
import login from "./api/v1/login.js";
import verificarToken from "./middleware/auth.js";

// Importar Swagger (configurado con yamljs)
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.js";

// Conectar a MongoDB (sin bloquear el inicio en caso de error)
connectDB().catch((err) => {
  console.error("Error inicial de MongoDB:", err.message);
  // No bloqueamos el servidor, las rutas manejarán el error
});

// Crear la aplicación Express
const app = express();

// Definir el puerto (Vercel usa process.env.PORT)
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar Swagger UI (documentación disponible en /api-docs)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "El servidor funciona correctamente" });
});

// Ruta API v1 - Hello
app.get("/api/v1/hello", (req, res) => {
  const respuesta = hello();
  res.json(respuesta);
});

// Ruta API v1 - Saludo (con el parámetro nombre)
app.get("/api/v1/saludo", (req, res) => {
  const nombre = req.query.nombre;

  // Validar que el parámetro nombre existe y no está vacío
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      error: "Parámetro 'nombre' es requerido",
    });
  }

  const respuesta = saludo(nombre);
  res.json(respuesta);
});

// Ruta API v1 - Login (genera token JWT)
app.post("/api/v1/login", (req, res) => {
  const { username, password } = req.body;

  // Validar que se enviaron las credenciales
  if (!username || !password) {
    return res.status(400).json({
      error: "Username y password son requeridos",
    });
  }

  const resultado = login(username, password);

  if (!resultado.success) {
    return res.status(401).json({
      error: resultado.error,
    });
  }

  res.json(resultado);
});

// Ruta API v1 - Usuarios (PROTEGIDA - requiere token JWT)
app.get("/api/v1/usuarios", verificarToken, async (req, res) => {
  try {
    const listaUsuarios = await usuarios();
    res.json(listaUsuarios);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuarios",
      detalle: error.message,
    });
  }
});

// Exportar la app para Vercel
export default app;

// Iniciar el servidor (Heroku y desarrollo local)
// Vercel NO ejecuta esto porque usa el export default
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}
