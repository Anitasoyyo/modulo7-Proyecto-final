// Endpoint que recibe un parámetro nombre y devuelve "Hola, [nombre]!"
export default function saludo(nombre) {
  return {
    mensaje: `Hola, ${nombre}!`,
  };
}
