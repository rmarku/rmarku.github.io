---
title: Inicializando nuevo HomeLab
date: 2023-07-27
lastmod: 2023-07-27
categories:
  - HomeLab
description: Planificación y diseño del HomeLab
images:
  - generic.webp
keywords:
  - HomeLab
  - self hosting
  - self host
tags:
  - HomeLab
---

## ¿Qué es un HomeLab?

Un HomeLab es un entorno donde poder probar con nuevas tecnologías, tendencias y poder fracasar sin miedo.
Todo esto en la comodidad y privacidad de tu propio hogar, algo que no es menor, ya que si algo se rompe, no está en peligro nuestro trabajo,
clientes, o empresa. Como mucho, puede llegar a haber alguna discusión con **la esposa** (_aunque pensando podría ser una consecuencia mas grave_).

En general, un laboratorio es un lugar donde puedes realizar experimentos de forma segura.
La mayoría de los que leen este artículo son técnicos y administradores de sistemas. Como saben,
probar cosas nuevas en equipos de producción nunca termina bien. Este riesgo es la razón por la que nos
construimos un entorno de sandbox para experimentar, probar y fracasar. Y si lo hacemos en un HomeLab,
todo esto desde la comodidad de nuestros hogares.

Generalmente, si algo deja de funcionar o se rompe, volvemos a Instalar y empezar de 0. En el mejor de
los casos teníamos backup y vuelven todos los servicios a como estaban. En el peor de los casos, solo habrá algunas
molestias de empezar de 0, pero lo importante, es que aprendimos muuucho en el camino.

Resumiendo, un HomeLab es un conjunto de uno o más servidores instalados en nuestro propio hogar que utilizamos
tanto sea para practicar/aprender sobre todo este mundo de la tecnología, como para suplir alguna necesidad del hogar.
Puede ser tan simple como una Raspberry Pi, o tan complejo como un rack lleno de servidores, switchs, etc.

## Reflexiones sobre mis antiguos HomeLabs

En los últimos cuatro años he tenido una mudanza por año, dos veces en la ciudad de Córdoba y dos veces en
la provincia de Tucuman. En las cuatro casas donde viví, he tenido, en mayor o menor medida, un pequeño HomeLab en casa.
A medida que pasó el tiempo y después de cada mudanza, el HomeLab iba mutando y mejorando siendo
más prolijas/completas las funcionalidades y la estructura. Pero actualmente tengo algo bastante precario,
en cuando a funcionalidad y "profesionalidad".

En todas sus versiones, tener un HomeLab me ayudaba profesionalmente a tener herramientas disponibles, como
así también a poder experimentar y aprender sobre nuevas tecnologías y softwares.

Hay algunos hitos que cabe destacar en esta historia pasada.

- El inicio de todo fue con **Home Assistant**. Este es un software de automatización del hogar (domótica), y fue el culpable de que
  me iniciara en esto de los servidores y HomeLab en particular. Estuvo instalado desde la primera instancia en una Raspberry PI 2
  conectada al modem de mi ISP.
- **K3S**, una distribución light de Kubernetes que estuvo instalada mi mejor versión de HomeLab. Con esto fue con lo que aprendí
  a gestionar clústeres de Kubernetes, utilizar imágenes Docker a bajo nivel, construir, usar y modificar Helm charts y
  muchas otras herramientas DevOps.

### ¿Dónde comenzamos?

Primero, necesitamos un lugar físico para nuestro HomeLab. El lugar puede ser variado en la oficina, sala de estar,
armario, ático, sótano o garaje o en todas ellas, jaja. La elección debería tener en cuenta algunas cuestiones prácticas.
Estas incluyen la temperatura y ventilación de la habitación, el espacio de trabajo alrededor de tu equipo, la facilidad y
distancia de las conexiones de cable de red, la energía, los niveles de ruido entre otros.

Una vez seleccionada el lugar, es importante hacer una planificación de que se va a instalar y como se va a configurar. Para esto
hay que pensar las prestaciones se desean de este HomeLab. ¿Será para hacer pruebas?, ¿habrá funcionalidad que tiene que ser permanente?
Hay que pensar que se va a distribuir por la casa, que va a quedar el espacio elegido y como vamos a interconectar todo esto. Esta bueno
dibujar un diagrama de red de la casa. Pensar y plasmar en este diagrama, cómo se logrará las conexiones de cable.

### Hardware

Una vez solucionado el problema del lugar físico y su distribución, hay que ver que fierros se van a instalar. Acá va depender mucho del
presupuesto que tengamos, del hardware que ya dispongamos y de que queremos obtener. Podemos, como ya dije anteriormente, poner una Raspberry
Pi conectada al modem, o invertir en racks, servidores rackeables, switchs gestionables, etc. Si hay que ser coherentes entre lo que
se quiere como prestación y lo que se va a instalar de hardware. Generalmente, en algo tendremos que gastar dinero.

En estas elecciones hay dos cosas importantes a tener en cuenta. Lo primero es el almacenamiento. Que vamos a desear guardar en estos
servidores permanentemente, que tan importante va a ser (vamos a necesitar backups? redundancia?), cuanto estimamos que va a ocupar (un Tb,
o unas decenas de Tb). La importancia de los datos puede hacer que no nos sea suficiente nuestro HomeLab y tengamos que optar por
soluciones de backup en la nube o garantizar redundancia de datos en el HomeLab para evitar perdida de servicio.

Lo segundo es tamaño y cantidad de servidores. Acá hay que estimar, según los requisitos que planificamos, que maquinas y cuantas tendríamos
que instalar. Podríamos poner N maquinas formando un cluster para tener toda esa capacidad de cálculo y algo de redundancia. Podríamos tener
de requerimiento procesamiento GPU, por lo que necesitaríamos invertir en alguna GPU potente.

### software

Esta parte no es menor ya que será con lo que tratemos día a día. En general hace falta seleccionar algún sistema base para la gestión de todo
el HomeLab. Esta decision debe ser tomada con lo que querremos aprender/probar y con lo que nos sentamos cómodos. Dentro de estas decisiones
hay que decidir:

- Distribución de linux a instalar en los servidores (suponiendo que será linux)
- Sistema de virtualización (nada, proxmox, docker, etc)
- Sistema de orquestación (docker-compose, swarm, K8s, etc)
- Gestión en general (ArgoCD, fluid, etc)

## Diseñando mi HomeLab

Como bien dije, estuve de mudanza varias veces y en esta ultima casa no he hecho tiempo de instalar un buen HomeLab. Si hice la inversión
de un NAS y estuve utilizando este NAS para instalar algunos containers docker con prestaciones que me eran necesarias. Actualmente me
urge tener algo un poco mas estable, gestionable y util, por lo que disidí sacar de las cajas de mudanza algunas cosas
del HomeLab anterior e instalarlo en su nuevo hogar.

Este diseño dista mucho de lo que me gustaría. Viviendo en Argentina, el costo y acceso a buen hardware es limitado, por lo que hay que
conformarse con lo que uno tiene, encuentra de oferta y el bolsillo permite. En este sentido he ido adquiriendo algunas cosas a traves
del tiempo.

### Hardware Disponible:

#### Servidores

Todo eso es lo que tengo actualmente con poder de cálculo. Hay dando vueltas una PC con un _Inte. Atom D510 - 2Gb RAM_
pero es demasiado vieja para poder utilizar.

1 x PC Brix (similar a las NUC)

- Intel i5 gen 8
- 480Gb SSD
- 8Gb Ram

![Gigabyte Brix](/images/posts/HomeLab/brix.webp)

1 x Synology NAS Ds220+

- Celeron J4025
- 2 x 6Tb HDD
- 2Gb Ram

![Synology Ds220+](/images/posts/HomeLab/nas.webp)

2 x Raspberry Pi 4

- Quad core Cortex-A72 (ARM v8)
- 32Gb SD
- 4Gb Ram

![Raspberry Pi 4](/images/posts/HomeLab/rpi.webp)

### Conectividad

1 x Raspberry Pi 3

![Raspberry Pi 3](/images/posts/HomeLab/rpi3.webp)

1 x Tp-Link Archer C6 (con OpenWrt)

![Tp-Link Archer C6](/images/posts/HomeLab/archerC6.webp)

1 x TP-Link TL-WDR4300 (con OpenWrt)

![TP-Link TL-WDR4300](/images/posts/HomeLab/wdr4300.webp)

## Software

Parte de tener un HomeLab es poder brindar algún servicio al hogar, a la vida personal y profesional. Algunas
personas lo utilizan como alternativa privada a los sistemas en la nube, utilizando herramientas como NextCloud
que ofrece una alternativa bastante completa a Google Cloud o Office 365.

En lo personal, hace bastante tiempo que pago Google One. Con esto tengo Storage en la nube, backup de fotos entre
otras bondades de la Nube de Google. Últimamente, para lo único que la estoy usando es para backup de fotos. Esto
tiene un costo mensual o anual y un limite en capacidad de backup. Con el costo anual de un año de 2Tb de Storage,
puedo comprar un disco duro de 8Gb, por lo que hostear "mi propia nube", trae beneficios económicos también.

También sucede que google no provee todas las herramientas que me son necesarias en el día a día personal y profesionalmente.
Por esta razón, también quiero volver a tener mi HomeLab disponible.

#### Software que seguro voy a utilizar

- **k3s** como orquestación. Esto me permitirá poner la Brix y las 2 RPi como nodos y tener algo de redundancia.
- **ArgoCD** para facilitar la configuración de las aplicaciones mediante GitOps
- **Home Assistant** para tener automatizaciones en la casa y centralizado toda la domótica
- **VerneMQ** easy MQTT broker for things Home Assistant needs.
- **PiHole** DNS server que restringe publicidades y sitios no amigables con la privacidad.
- **MeshCentral** alternativa a TeamViewer que permite manejar remotamente distintas pc
- **Jellyfin** centro multimedia para tener contenido multimedia o poder verlo desde distintos lugares.
- **Server Mincraft** porque no? (capaz que lo usamos con mis sobrinos)
- **Tragoo** un gestor de tiempo que utilizo para saber cuando dedico a cada tarea
- **Umami** para tener analíticas de uso de este blog
- **Grafana Stack** para monitorear el HomeLab
- **Dendrite** Matrix server para mensajería

#### Software que tengo que revisar

- **NextCloud** para remplazar algunos servicios de google
- **PhotoPrism o Immich** para remplazar Google Photos
- **Monica** gestor de relaciones personales
- **Meali** lista de resetas
- **Netmaker** para tener VPN con wireguard fácil y rápido
- **Kutt** para acortar URLs
- **ntfy** para tener notificaciones push
- **miniflux** para leer RSS

## Conclusion

Volver a instalar y configurar el HomeLab es algo que venía teniendo en la cabeza. Creo que ahora es un buen
memento para comenzar este proyecto nuevamente. Próximamente escribiré mas artículos sobre este viaje.

Déjame tus sugerencias y recomendaciones en los comentarios
