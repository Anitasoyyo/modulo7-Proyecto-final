// Endpoint que conecta con MongoDB Atlas para devolver lista de usuarios
import Usuario from "../../modelo/Usuario.js";
// Función asincrónica porque las operaciones con MongoDB son asíncronas
export default async function usuarios() {
  try {
    const listaUsuarios = await Usuario.find();
    return listaUsuarios;
  } catch (error) {
    //lanzar error si hay problema
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
}
