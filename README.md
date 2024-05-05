# Topo PWA
[![Netlify Status](https://api.netlify.com/api/v1/badges/93cf819b-7466-403b-8dfa-433957ecbe4f/deploy-status)](https://app.netlify.com/sites/whack-a-mole-pwa/deploys)

> [project README here](https://github.com/friedelredward/topo-pwa/blob/master/topo-pwa/README.md)
> Live Deploy: https://whack-a-mole-pwa.netlify.app

This project answers the technical test located here : https://bbvaengineering.github.io/challenges/kill/
with the following requirements:
> Como parte de nuestro proceso de selección, nos gustaría ver qué tipo de aplicación eres capaz de desarrollar. Valoraremos muy positivamente cualquier característica adicional,
> tanto en la aplicación como en el entorno de desarrollo o despliegue, que quieras implementar por tu cuenta.
> Queremos que crees una app móvil web progresiva basada en el juego de “Toca al topo”.
> Si no lo conoces no pasa nada, a continuación te detallamos el funcionamiento del mismo.
> La aplicación debe tener una primera vista “home” en la que el usuario introducirá su nombre para registrarse y empezar el juego. Esta primera vista deberá ser la ruta por defecto y cualquier acceso a una ruta que no exista debería redirigir a dicha vista.
> La vista “home” contendrá al menos un campo de texto para introducir el nombre del jugador y un botón para iniciar el juego. El botón validará que se ha introducido un nombre de usuario válido antes de iniciar el juego.
> Una vez se ha creado el usuario, se transiciona a la vista de juego “game” siendo ésta una nueva ruta dentro de la app.
> La vista “game” mostrará el nombre del jugador, los puntos que tiene, la selección de nivel de dificultad “bajo” “medio” “alto” y un botón para comenzar el juego.
> Cada vez que se haga click en el botón Play, se mostraran 9 cuadros donde aparecen de manera aleatoria un topo. Si el usuario consigue “matarlo” se actualizaran los puntos según el nivel de dificultad que tenga seleccionado
El nivel de dificultad influye en la velocidad del cambio de posición aleatoria de los topos .
Nivel de dificultad	| Tiempo ms	| Puntos
> Bajo	1000ms	10
> Medio	750ms	20
> Alto	500ms	30
Ejemplo
Ejemplo de ejecución
La aplicación deberá funcionar offline, es decir, si en nuestro dispositivo activamos el modo avión y volvemos a la app tras haberla abierto al menos una vez, se podrá acceder a la misma sin problemas.
La aplicación deberá estar desplegada y disponible públicamente.
¡RECUERDA! Los ejemplos visuales mostrados son únicamente orientativos y no deben sesgar tu creatividad.

Requisitos:
- [x] La aplicación deberá contener funcionalmente, como mínimo, las instrucciones detalladas en el enunciado.
- [x] El código debe ser público
- [x] Se deberán realizar tests unitarios de las vistas y de los componentes de la aplicación.
- [x] Se podrá utilizar cualquier infraestructura de alojamiento pública como, por ejemplo, Vercel, Netlify o Github Pages.
- [x] Se debe subir un fichero README.md al repositorio con las instrucciones para hacer funcionar la aplicación en local. Puedes añadir cualquier otro dato que consideres necesario.
- [x] Se puede utilizar cualquier herramienta, librería o framework, dentro del ecosistema de JavaScript.

Si crees que lo anterior no es suficiente y quieres demostrarnos todo lo que sabes, se valorarán muy positivamente otros puntos como:

- [x] La calidad, claridad y limpieza del código.
- [x] El uso de componentes reutilizables.
- [X] La realización de otro tipo de tests.
- [x] Herramientas de análisis estático y formateo de código que mejoren la experiencia del desarrollador.
- [x] Mejoras en el flujo y la metodología de desarrollo, construcción y despliegue.
- [x] Otras características que consideres importantes para una aplicación web progresiva.
- [x] Envíanos un enlace al repositorio en el que se encuentre el código de la aplicación y un enlace con la aplicación desplegada.

![Whack a mole](https://bbvaengineering.github.io/challenges/assets/images/kill.gif)

Bonus points

- [x] Mostrar varios topos a la vez.
- [x] Incluir vibración en el dispositivo cada vez que el usuario mate un topo.
- [x] añadir la posibilidad de eligir topos a la vista
- [x] Añadir efecto de sonido antes de sumar puntuacion

### future enhancements:
- Cambiar level por speed.
- Entender dificultad como velocidad de refresco del topo y cantidad del mismo y tener mas niveles (3velocidades x 1 topo + 3 velocidades x 2 o n topos...)
- Posibilidad de elegir celdas y tamaño de tablero
- Tener un timeout  general del juego (Game over)
- Mostrar una notificacion con ("Install app")
