// Configuración de Swagger para documentación de la API usando YAML
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Obtener el directorio actual (necesario para ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar el archivo swagger.yaml usando yamljs
const swaggerDocument = YAML.load(join(__dirname, "..", "swagger.yaml"));

export default swaggerDocument;
