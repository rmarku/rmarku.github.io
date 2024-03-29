---
title: Principios Solid (01/xx)
date: 2020-03-06
lastmod: 2020-03-06
categories:
  - programming
description: Introducción a los principios SOLID
images:
  - generic.webp
keywords:
  - SOLID principles
  - Responsabilidad Unica
  - C++
  - Programación
  - Buenas Practicas
tags:
  - solid
  - good practice
  - architecture
---

Este es el primer post de una serie de artículos donde hablare de los principios de diseño SOLID. Estos principios fueron introducidos por Robert C. Martin _("Uncle Bob")_ por el año 2000 e introduce cinco principios para el diseño en la programación orientada a Objetos.

Las siglas SOLID provienen de la primera letra de cada uno de los principios, siendo estos:

- **S** _(Single responsibility principle)_ Principio de Responsabilidad Única
- **O** _(Open/closed principle)_ Principio de abierto/cerrado
- **L** _(Liskov substitution principle)_ Principio de sustitución de Liskov
- **I** _(Interface segregation principle)_ Principio de segregación de la interfaz
- **D** _(Dependency inversion principle)_ Principio de inversión de la dependencia

Estos principios son algunos de los muchos que existen en el diseño de software, por lo que esta bueno seguir aprendiendo sobre otros principios de diseño.

A continuación, desarrollemos el primero.

## Principio de Responsabilidad Única

Este principio indica que cada módulo o clase debe tener responsabilidad sobre una sola parte de la funcionalidad del software. Es decir, encargarse de realizar sólo las tareas estrechamente ligadas con una determinada responsabilidad.

Robert C. Martin, expresa que **"Una clase debe tener solo un motivo para cambiar"**, de esta forma se puede detectar si estamos violando este principio o no. Cuando deseamos agregar una funcionalidad o mejorar nuestro código y para lograrlo debemos modificar varias clases, lo mas probable es que estemos violando este principio.

Vamos a ver un ejemplo en C++:

Supongamos que tenemos un programa hecho con la librería SFML y decidimos hace run
objeto Pelota. El único objetivo del objeto pelota es rebotar por la pantalla, por lo que podríamos tener algo así:

```cpp {file="code/ball_sfml.cpp"}

```

Básicamente, verifica el objeto Ball (Pelota) se dedica a mantener la lógica de una pelota. Se puede crear, se puede mover y se puede dibujar. Para probar si se cumple el principio de responsabilidad simple, debemos ver si realmente se podría modificar esta clase si se quisiera modificar una responsabilidad.

Supongamos que tenemos otra clase llamada Jugador, esta clase también tendría su constructor, su método mover y su método dibujar.

De manera siguiente, se dan dos situaciones, la primera es que debemos modificar el comportamiento de la pelota. Ahora la pelota debe desacelerar, por lo que nos ponemos y modificamos la función mover, para que la velocidad se reduzca en cada llamado.
Bien, esto es correcto, ya que esta modificación reduzca en la responsabilidad de la Pelota.

Ahora, la otra situación, es nuestro jefe que nos informa que se cambiará la lógica que está debajo del programa y que ya no se usará SFML y ahora se utilizará RayLib, otra biblioteca grafica, para realizar el programa.

Esto desencadenará que tengamos que modificar tanto la clase Jugador como nuestra clase Pelota, quedando esta ultima clase algo así...

```cpp {file="code/ball_raylib.cpp"}

```

Como se puede observar, tendremos que modificar tanto el constructor como la función que dibuja el objeto, y, probablemente, también debamos hacer lo mismo en la clase jugador. Esto nos está diciendo, que la clase pelota no tiene una sola responsabilidad como debería.
Analizando podemos darnos cuenta que la pelota tiene la responsabilidad de mantener el estado y funcionamiento de la pelota, pero también, la responsabilidad de saber como se dibuja una pelota. Esta clase, no debería realizar esta tarea, sino que debería haber una dedicada a saber como dibujar en pantalla los distintos objetos.

Una forma de abordar esto, es crear una clase RenderManager, que sea la que sabe dibujar pelotas, por lo que solucionaríamos el problema delegándose esta responsabilidad a dicha clase.
Echo esto, logramos que al tener que cambiar como dibujar, solo modificamos la clase RenderManager, y si modificamos el comportamiento de la pelota, modificamos solo la pelota.

Aplicando esto, nos podrían quedar los archivos de la siguiente manera:

```cpp {file="code/ball.cpp"}

```

Quedándonos solo una clase dedicada al funcionamiento de la pelota y delegando lo de dibujar a la clase RenderManager

```cpp {file="code/render_manager_sfml.cpp"}

```

El proyecto completo se puede ver en https://github.com/UCC-ArquitecturaSoftwareI/principios-solid
