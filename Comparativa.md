**Monolito vs Microservicios**
¿Qué es una arquitectura monolítica?
Un monolito es como tener toda la aplicación en un solo bloque.
Si ponemos el ejemplo de una tienda online donde todo el código (el carrito de compra, el catálogo de productos, los usuarios, los pagos...) estaría junto en una sola aplicación.

![Monolito](imagenes/MONOLITO.jpg)

**Las características principales:**

Todo el código está en un único proyecto
Se despliega todo junto como una sola unidad
Todos los componentes comparten la misma base de datos
Si cambias algo pequeño, tienes que redesplegar toda la aplicación

**Ventajas:**

Es más fácil de empezar a desarrollar
Más simple de testear al principio ya que todo está en un sitio.
El despliegue es más sencillo y directo.

**Desventajas:**

-Si crece mucho, se vuelve difícil de mantener
-Un fallo en una parte puede tirar toda la aplicación
-Es complicado escalar solo una parte específica
-En equipos grandes pueden pisarse el código entre ellos

**¿Qué son los microservicios?**
Los microservicios son como dividir tu aplicación en piezas más pequeñas e independientes. Siguiendo con el ejemplo de la tienda online, tendríamos un servicio solo para el carrito, otro para el catálogo, otro para usuarios, etc...

![Microservicios](imagenes/MICROSERVICIOS.jpg)

**Características principales:**

-Cada servicio es una aplicación independiente
-Cada uno se puede desplegar por separado
-Cada servicio puede tener su propia base de datos
-Se comunican entre ellos a través de APIs (normalmente HTTP/REST)

**Ventajas:**

-Puedes escalar solo las partes que lo necesiten
-Si un servicio falla, los demás pueden seguir funcionando
-Equipos diferentes pueden trabajar en servicios diferentes sin estorbarse
-Puedes usar tecnologías diferentes en cada servicio

**Desventajas:**

-Mucho más complejo de configurar y mantener
-Necesitas infraestructura más avanzada (Docker, Kubernetes...)
-Testear todo el sistema es más complicado
-Puede haber problemas de latencia en las comunicaciones entre servicios

**¿Cuándo usar cada uno?**

**Usa monolito cuando:**

- Estás empezando un proyecto nuevo y tu equipo es pequeño.
- La aplicación no es muy grande
- No necesitas escalar mucho

**Usa microservicios cuando:**

- Tu aplicación ya es muy grande
- Tienes varios equipos trabajando
- Necesitas escalar partes específicas
- Algunas funcionalidades tienen requisitos muy diferentes

Ejemplo práctico
Monolito: Una app de blog personal donde todo (artículos, comentarios, usuarios) está en el mismo proyecto.
Microservicios: Netflix, donde tienen servicios separados para recomendaciones, streaming de vídeo, gestión de usuarios, facturación, etc.

## Nota: Muchas empresas empiezan con monolitos y van migrando a microservicios cuando les hace falta. La clave está en evaluar las necesidades de tu proyecto y equipo para elegir la mejor arquitectura.

**¿Qué es MVC (Model-View-Controller)?**
MVC es un patrón de diseño que organiza tu código en tres capas principales. Es como ordenar tu casa en tres habitaciones específicas.
Las 3 capas:

Model (Modelo): Aquí va la lógica de negocio y los datos. Por ejemplo, cómo se guarda un usuario o cómo se calcula el precio total de un pedido.
View (Vista): Es lo que ve el usuario. El HTML, las páginas web, las pantallas de la app móvil...
Controller (Controlador): Es el intermediario. Recibe las peticiones del usuario, llama al modelo para hacer cosas, y devuelve la vista adecuada.

![MVC](imagenes/MVC.jpg)

**Flujo típico:**
Usuario hace click → Controller recibe la petición →
Llama al Model para obtener/guardar datos →
Devuelve una View con los datos
**Ventajas:**

-Muy fácil de entender y aprender
-Separa la interfaz de la lógica de negocio
-Ideal para aplicaciones web tradicionales
-Muchos frameworks lo usan

**Desventajas:**

-El modelo suele acabar muy acoplado a la base de datos
-Difícil de testear sin la base de datos
-La lógica de negocio puede acabar mezclada con el controller
-Complicado cambiar de base de datos o añadir nuevas formas de entrada

**¿Qué es la Arquitectura Hexagonal?**
También llamada "Puertos y Adaptadores". Es como construir tu aplicación con un núcleo protegido que no depende de nada externo (base de datos, APIs, frameworks...).
Idea principal:
Tu lógica de negocio está en el centro (el hexágono) y todo lo demás (bases de datos, APIs, interfaces) son cosas externas que se "enchufan" mediante adaptadores.
Componentes principales:

-Dominio (centro): Tu lógica de negocio pura. No sabe nada de bases de datos, frameworks o APIs. Solo las reglas de tu negocio.
-Puertos: Son interfaces que definen cómo el dominio se comunica con el exterior. Por ejemplo, "necesito guardar usuarios" pero sin especificar cómo.
-Adaptadores: Implementaciones concretas de los puertos. Por ejemplo, un adaptador para MySQL, otro para MongoDB, otro para la API REST...

Flujo típico:
API REST → Adaptador de entrada → Puerto → Dominio →
Puerto → Adaptador de salida → Base de datos

![Hexagonal](imagenes/HEXAGONAL.jpg)

**Ventajas:**

- Muy fácil de testear (puedes probar el dominio sin base de datos)
- Puedes cambiar la base de datos sin tocar la lógica de negocio
- La lógica de negocio está completamente aislada
- Puedes tener múltiples formas de entrada

**Desventajas:**

- Más complejo de implementar al principio
- Requiere más código (interfaces, adaptadores...)
- Puede ser "overkill" para proyectos pequeños
- Curva de aprendizaje más alta

**¿Cuándo usar cada uno?**
Usa MVC cuando:

-Estás haciendo una aplicación web tradicional
-El proyecto es pequeño o mediano
-Quieres algo rápido y sencillo
-No necesitas cambiar mucho la infraestructura

**Usa Hexagonal cuando:**

-La lógica de negocio es compleja
-Necesitas testear mucho y bien
-Quieres poder cambiar fácilmente de base de datos o frameworks
-Trabajas en un proyecto grande y a largo plazo

**Ejemplo práctico**
**MVC: Un blog simple**

-Controller: recibe petición de mostrar artículo
-Model: busca el artículo en la BD
-View: muestra el artículo en HTML

**Hexagonal: Una app de pagos**

-Dominio: reglas de cómo procesar pagos
-Puerto: "necesito procesar un pago"
-Adaptador: implementación específica para Paypal por ejemplo
Puedes cambiar de pasarela de pago sin tocar la lógica de negocio
