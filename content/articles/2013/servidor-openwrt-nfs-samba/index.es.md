---
title: Servidor OpenWRT - Configurando NFS y SAMBA (obsoleto)
date: 2013-11-20
lastmod: 2013-11-20
categories:
  - homelab
description: Configurar ahora los servicios Samba y NFS en nuestro router
images:
  - openwrt.webp
keywords:
  - Openwrt
  - Homelab
  - Self Host
  - Server
tags:
  - openwrt
  - linux
  - router
---

Continuando esta serie de post, paso a explicar como compartir carpetas de nuestro pendrive con un router OpenWRT. Para esto podemos usar SAMBA o NFS.

- **SAMBA**: Samba tiene el problema de que utiliza "muchos" recursos de CPU, muchos es decir un 20%-40% del pequeño micro MIPs de la mayoría de los routers. Como ventaja es que se puede acceder casi desde cualquier plataforma, ya sea Windows, GNU/Linux, MacOs, Android, MediaCenters, etc...

- **NFS**: NFS es el estándar de linux, como ventaja podemos decir que tiene casi todas las características de un sistema de archivos de linux, por lo que si nuestro cliente es linux, podremos configurar permisos, asignar usuarios, grupos, etc. Otra ventaja es que esta implementado a nivel de kernel, así que corre super rápido. Como desventaja, es que casi solo podemos utilizarlo en linux. Hay herramientas para utilizarlos en otros sistemas operativos, pero no de forma nativa.

Vamos a suponer que ya se realizo la instalación de OpenWRT y el soporte de USB. Si no lo has realizado, puedes seguir los pasos acá Servidor OpenWRT

## Servidor NFS

Lo primero es instalar el paquete nfs-kernel-server, con esto estamos listos para compartir.

```shell-session
root@OpenWrt:/$ opkg update
root@OpenWrt:/$ opkg install nfs-kernel-server
```

Luego debemos configurar las carpetas que compartiremos, aquí esta un ejemplo donde comparto el home en mi red interna

```
/etc/exports
/home/    192.168.1.0/255.255.255.0(rw,all_squash,insecure,async,no_subtree_check)
```

Luego iniciamos y dejamos habilitados los demonios, así arrancan al prender el router.

```shell-session
root@OpenWrt:/$ /etc/init.d/portmap enable
root@OpenWrt:/$ /etc/init.d/portmap start
root@OpenWrt:/$ /etc/init.d/nfsd enable
root@OpenWrt:/$ /etc/init.d/nfsd start
```

## Servidor SAMBA

La instalación de samba esta bastante mas pulida, tiene integración con Luci, por lo que podemos compartir carpetas desde la interfaz WEB, para instalarla, debemos instalar el paquete **luci-app-samba** y listo. Ahora desde la interfaz web, podemos entrar y en la sección Services -> Network Shares podemos compartir carpetas

Si encuentras algún error, si piensas que algo se puede mejorar o simplemente te sirvió por favor deja tu comentario. Gracias.
