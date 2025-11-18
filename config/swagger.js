// Configuración de Swagger para documentación de la API usando YAML
//swagger sirve para documentar la API y usamos yamljs para cargar el archivo yaml porque es más sencillo que escribir todo en JSON
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Obtener el directorio actual (necesario para ES modules)
//Es necesario porque estamos usando ES modules y no CommonJS y por lo tanto no tenemos __dirname por defecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar el archivo swagger.yaml usando yamljs
const swaggerDocument = YAML.load(join(__dirname, "..", "swagger.yaml"));

export default swaggerDocument;
