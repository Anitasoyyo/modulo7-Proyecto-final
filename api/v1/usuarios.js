// Endpoint que conecta con MongoDB Atlas para devolver lista de usuarios
import Usuario from '../../modelo/Usuario.js';

export default async function usuarios() {
  try {
    const listaUsuarios = await Usuario.find();
    return listaUsuarios;
  } catch (error) {
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
}
