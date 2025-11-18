// Este archivo es para generar el token JWT si usuario y password son correctos
import jwt from "jsonwebtoken";

// Se crea un array simulado con usuarios :
const usuarios = [
  { username: "admin", password: "admin123" },
  { username: "usuario", password: "user123" },
];

export default function login(username, password) {
  // Verificar si el usuario existe comparando con el array simulado
  const usuarioValido = usuarios.find(
    (u) => u.username === username && u.password === password
  );

  // Si no existe, devuelve error
  if (!usuarioValido) {
    return { success: false, error: "Credenciales inválidas" };
  }

  // Crear token JWT: El token contendrá el username y expirará en 24 horas
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return { success: true, token }; // Devuelve el token
}
