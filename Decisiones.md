**Decisiones arquitectónicas y flujo de trabajo**

**Flujo de trabajo del proyecto**
Para la gestión del código he usado Git y GitHub, con commits frecuentes y descriptivos. La integración continua está configurada para desplegar automáticamente en Vercel tras cada push a la rama principal.
Para el desarrollo utilizo Node.js con Express, siguiendo una arquitectura modular para separar rutas, controladores, modelos y middleware.
También he integrado Swagger para documentar la API de forma interactiva, facilitando las pruebas y el entendimiento de los endpoints disponibles.
El proyecto está desplegado en Vercel para producción, aprovechando su facilidad de uso y despliegue automático desde GitHub.
Las variables de entorno están gestionadas en .env y en Vercel.

**Decisiones arquitectónicas**
En este proyecto se utiliza una arquitectura monolítica y el patrón de diseño MVC (Modelo-Vista-Controlador).

Monolítica: Todo el backend está en un solo proyecto y se despliega como una única aplicación.
MVC: El código está organizado en modelos (modelo/Usuario.js), controladores/rutas (api/v1/\*.js), y la lógica de negocio separada.

---

## Arquitectura Monolítica

La aplicación utiliza una arquitectura monolítica porque todo el sistema está integrado en un solo proyecto y utiliza una única base de datos MongoDB Atlas. Todos los módulos (autenticación, usuarios, saludos, etc.) se conectan directamente a esta base de datos.

## Patrón MVC

Se implementó el patrón Modelo-Vista-Controlador (MVC) para separar la lógica de negocio, la gestión de datos y las rutas de la API. Esto mejora la organización del código y facilita el mantenimiento.

- **Modelo:** Define la estructura de los datos y la conexión con MongoDB (ver `modelo/Usuario.js`).
- **Controlador:** Gestiona la lógica de negocio y las respuestas a las peticiones (ver archivos en `api/v1/`).
- **Vista:** En este caso, la API no tiene vistas tradicionales, pero la documentación se gestiona con Swagger (`swagger.yaml`).

## Middleware y Modularización

Se utiliza **middleware** para la autenticación (`middleware/auth.js`) y la modularización para separar la configuración (`config/`), los modelos y las rutas.

## Singleton para la Conexión a la Base de Datos

La conexión a MongoDB se gestiona como un singleton en `config/db.js`, asegurando que toda la aplicación use una única instancia de conexión.

Al ser un proyecto de aprendizaje, tiene sentido priorizar la simplicidad y la claridad centralizando todo en una sola base de datos y manteniendo el código en un único repositorio, lo que facilita la comprensión, el mantenimiento y el despliegue.
