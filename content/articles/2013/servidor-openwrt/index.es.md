---
title: Servidor OpenWRT (obsoleto)
date: 2013-11-19
lastmod: 2013-11-19
categories:
  - homelab
description: Configurar un router con la posibilidad de utilizar un pendrive como root externo
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

En esta serie de post, voy a mostrar como poner a correr OpenWRT en un router, utilizaremos las opciones de EXTRoot para poder instalar mas paquetes en un Pendrive USB. Una vez echo eso, instalaremos mysql, php, lighttpd para poder servir nuestra web. También pondré Transmission para hacer de seeder y compartiré los archivos del pendrive/hhd USB por SAMBA y NFS. Esto es bastante parecido a lo que tengo implementado en casa.

OpenWRT es una distribución linux que se dedica a hacer correr este sistema operativo en routers de distintas marcas, creando firmwares que reemplazan el original y le dan, al pequeño aparato, toda la potencia de un sistema operativo completo.
Configuración Inicial

Supondré que ya has flasheado el router siguiendo la guía especifica para tu modelo y que lo que hay que hacer es configurarlo.

entramos al router por telnet para nuestro primer inicio.

```shellsession
nc 192.168.1.1 23
```

luego, hacemos lo que nos recomienda, cambiar el password del usuario ROOT

```shellsession
root@OpenWrt:/$ passwd
passwd
Changing password for root
New password: xxxxx

Retype password: xxxxx

Password for root changed by root
root@OpenWrt:/$ exit
```

y luego de salir, podremos entrar y trabajar mas cómodamente por SSH. Aprovechamos para instalar unos cuantos paquetes que nos ayudaran a la hora de configurar el USB para que nuestro rootFS sea el USB

```shellsession
martin@jarvis ~/ $ssh root@192.168.1.1
 _______                     ________        __
|       |.-----.-----.-----.|  |  |  |.----.|  |_
|   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
|_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
-----------------------------------------------------
BARRIER BREAKER (Bleeding Edge, r38843)
-----------------------------------------------------
  * 1/2 oz Galliano         Pour all ingredients into
  * 4 oz cold Coffee        an irish coffee mug filled
  * 1 1/2 oz Dark Rum       with crushed ice. Stir.
  * 2 tsp. Creme de Cacao
-----------------------------------------------------

root@OpenWrt:/$ opkg update
...
root@OpenWrt:/$ opkg install block-mount kmod-usb-storage blkid
...
root@OpenWrt:/$ opkg install kmod-usb-storage-extras kmod-fs-ext4 kmod-fs-vfat
```

con esto tenemos los drivers para soporte de dispositivos USB como pendrives y discos

continuamos con montar nuestro dispositivo, podemos ver como los detecto el kernel con los siguientes comandos

```shellsession
root@OpenWrt:/$ dmesg|grep -e sd.
..
[    8.640000]  sda: sda1 sda2
..
..
[   12.220000]  sdb: sdb1 sdb2
..

```

Acá se puede ver que tengo 2 dispositivos, con dos particiones cada uno. En lo particular utilice un HDD USB y un pendrive de 8Gb. En el pendrive voy a tener el root del OpenWRT y en el disco, todos los archivos de las web, la base de datos, los torrent, y archivos que comparta como servidor de archivos.

Es conveniente también agregar una partición SWAP en el HDD, no recomiendo hacerlo en el pendrive ya que se rompería muy rápido. La partición SWAP ayudara al router cuando este con poca memoria. En mi caso tiene 128Mb de ram, y Transmission sabe consumir entre 30Mb y 75Mb según la cantidad de torrents que tenga cargados.

Bueno, a lo nuestro. Ahora montamos nuestro dispositivo (previamente particionado en Ext4, 3 o 2)... si no se monta, hay que reiniciar para que cargue los módulos USB y detecte el pendrive.

```shell-session
root@OpenWrt:/$ mount /dev/sdb1 /mnt/
```

Ahora debemos generar el archivo con el que montar los discos. El archivo es /etc/config/fstab y debe contener cada partición, el punto de montaje, y algunas otras características. En lo personal recomiendo utilizar los uuid de las particiones y no la ruta en el sistema de archivos (/dev/sdxx), debido a que al ser dispositivos USB, estos saben cambiar la ruta según cual le responde primero al kernel.

Para obtener el uuid de una partición procedemos así:

```shell-session
root@OpenWrt:/$ blkid /dev/sdb1
/dev/sdb1: LABEL="ROOT" UUID="be28121f-5446-44a3-adfd-3143f2a5c0c4" TYPE="ext4"
```

A continuación, debemos crear el archivo /etc/config/fstab. Acá hay un ejemplo del que yo utilizo. Nótese que la partición que voy a utilizar de ROOT (/dev/sdb1) tiene colocado el uuid y no hace referencia a SDB1.

```ini
config 'global'
        option  anon_swap       '0'
        option  anon_mount      '0'
        option  auto_swap       '1'
        option  auto_mount      '1'
        option  delay_root      '5'
        option  check_fs        '0'

config 'swap'
        option  uuid    'c0e1930a-dd0b-4029-ab4d-948b9a080469'
        option  enabled '1'

config 'mount'
        option  target  '/home/martin'
        option  uuid    '5cdcfae4-a8ec-4be2-bb6d-ca114acb56d9'
        option  enabled '1'

config 'mount'
        option  target  '/'
        option  uuid    'be28121f-5446-44a3-adfd-3143f2a5c0c4'
        option  enabled '1'

config 'swap'
        option  uuid    '69a037bc-8257-4c9a-a26a-cf676ed50888'
        option  enabled '1'

config 'mount'
        option  target   '/overlay-boot'
        option  device   '/dev/mtdblock3'
        option  fstype   'jffs2'
        option  options  'rw,sync'
        option  enabled  '1'
```

La ultima configuración del archivo, el mount con target /overlay-boot, es para poder tener acceso al root que todavía esta grabado en la flash, por si es necesario realizar algún cambio.

Lo siguiente que necesitamos hacer es copiar toda la configuración actual de la flash al pendrive, para que tengan exactamente los mismos archivos y en el lugar que corresponda. Para esto debemos remontar el root en una carpeta, para luego poder obviarla con el comando tar. Mi primera linea lo que hace es crear el directorio HOME, ya que no viene por defecto y lo usaremos luego.

```shell-session
root@OpenWrt:/$ mkdir /home
root@OpenWrt:/$ mkdir /tmp/cproot
root@OpenWrt:/$ mount --bind / /tmp/cproot
root@OpenWrt:/$ tar -C /tmp/cproot -cvf - . | tar -C /mnt -xvf -
...
root@OpenWrt:/$ sync ; umount /mnt
root@OpenWrt:/$ umount /tmp/cproot
root@OpenWrt:/$ reboot
```

Ahora, una vez reiniciado, con df -h podemos ver si realmente esta todo en orden, el rootfs debe mostrar en disponible, el tamaño de nuestro pendrive.

```shell-session
root@OpenWrt:/$ df -h
Filesystem                Size      Used Available Use% Mounted on
rootfs                    6.5G     26.0M      6.1G   0% /
/dev/root                 2.0M      2.0M         0 100% /rom
tmpfs                    61.7M    552.0K     61.2M   1% /tmp
/dev/sdb1                 6.5G     26.0M      6.1G   0% /
tmpfs                   512.0K         0    512.0K   0% /dev
```

Herramientas de Router

Lo siguiente es instalar herramientas necesarias para poder trabajar cómodos con nuestro router. OpenWRT utiliza un sistema web llamado Luci, así que lo instalaremos para poder realizar las configuraciones a través de nuestro navegador

```shell-session
root@OpenWrt:/$ opkg update
root@OpenWrt:/$ opkg install luci shadow-useradd mc
root@OpenWrt:/$ /etc/init.d/uhttpd start
root@OpenWrt:/$ /etc/init.d/uhttpd enable
```

Listo, ahora podemos entrar a nuestro router con la url http://192.168.1.1/

Si encuentras algún error, si piensas que algo se puede mejorar o simplemente te sirvió por favor deja tu comentario. Gracias.
