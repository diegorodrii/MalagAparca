# MalagAparca
MalagAparca es una aplicación cuya funcionalidad se basa en la gestión del aparcamiento de una comunidad de vecinos.

# APK
Descarga la APK [aquí](https://drive.google.com/file/d/1LEWmO7UUG2aIfLN5RnxTLxkPvpzd3JO8/view?usp=drive_link)


# Manual de instalación y dependencias.
Para poder actuar sobre el código de esta aplicación hay que tener instalados Ionic y Node.js. 
Se hace un git clone del proyecto y con el comando $ npm install se instalan las dependencias necesarias. 
Para lanzar la aplicación al servidor se ejecuta el comando $ ionic serve

# Tutorial uso

### Login
Una vez iniciada la aplicación aparece una página de login, en la que se podrá iniciar sesión si se tienen las credenciales 
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/2a2c1ad1-4937-4107-94d7-3319f1dfa5b6)

### Home
Esta es la pantalla del menú principal, en la que aparecen las 4 secciones que componen la app.
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/b80eec0d-8b98-4bd4-8f3c-82471d80cb32)

### Notificaciones
También se puede observar que en la parte superior derecha hay dos botones. El de izquierda es el del apartado de notificaciones y el de la derecha el de cerrar sesión. 
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/db55bb82-aa8d-4a89-a4b9-dfac18a4c198)

En este apartado irán llegando notificaciones de sucesos relevantes de la aplicación.
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/9bdefd70-47bb-46a3-8531-1771507e0018)

### My Places 
En "My Places" se encuentran las plazas que le pertenecen al usuario que esta con la sesión iniciada. 
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/afe3f7cd-c07e-4dfc-8c90-777f2a0fa206)

Podremos añadir nuevas plazas siempre que no estén ya atribuidas a otro usuario 
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/ab0e848e-5277-499a-8406-e52e4fcb7f4e)


### Parkings 
En este apartado se pueden ver las plazas que los vecinos publican. 
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/46f3a1a5-c0a5-42d7-b5d9-083d5f9cdfc4)

Podemos también asignar la plaza que hemos registrado anteriormente para publicarla y que otro vecino se la asigne. Como se puede observar, el calendario está bloqueado para las fechas anteriores a la hora actual.
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/ba01a9ee-16c1-4aae-a351-b84926fba270)

Así quedaría una plaza ocupada por nosotros y una plaza publicada por nosotros.
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/ebbecc57-dc57-481e-a191-62f380775bed)

### Reports
En "Reports" encontramos las denuncias que ha publicado el usuario que está logueado. 
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/4b518943-5344-4921-af1d-3e56b58ee01e)

Cuando se agrega la denuncia se puede incluir una foto. Las fechas futuras a la hora actual están bloqueadas, ya que no se puede denunciar algo que no ha sucedido.
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/ca03afc4-6ab8-4dc5-b498-4c789add08f6)

Quedaría así
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/b3d3edf9-4dbe-4519-8261-cba6f4c6698c)

### My Profile
Por último, el apartado de "My Profile". En este apartado se pueden editar los datos del usuario logueado, subir una foto, eliminar el usuario y escoger el idioma en el que se quiera tener la aplicación. Si se borra la cuenta, con ella se borran también las plazas, denuncias y parkings que tuviera este vecino.
![image](https://github.com/diegorodrii/MalagAparca/assets/91873618/32a07bbb-c56f-488a-a29f-70f6f41c28fb)

# Presentación 

# Vídeo Aplicación
El vídeo de la aplicación se puede ver [aquí](https://www.youtube.com/watch?v=_IFXb1Pl5aY&ab_channel=DiegoRodr%C3%ADguezBarcos)

# Anteproyecto
Puedes visualizar el anteproyecto pulsando [aquí](https://www.figma.com/file/bhbYEQFqAV6pZjXq9aW23T/MalagAparca?node-id=0%3A1&t=SBwDo5IEAK5LKLib-1)

# Objetivo del proyecto
El objetivo del proyecto es realizar una aplicación con la que se puedan gestionar las plazas de parking de una urbanización, de manera que se pueda gestionar la ocupación que hay en el aparcamiento. 

## Checkpoint
Este [vídeo](https://youtu.be/cBVhDWv6M8A) explica a modo de checkpoint la situación del proyecto actual y sus próximas integraciones.


# Tecnologías
Las tecnologías que se utilizan son Angular, Ionic y Firebase. Se utiliza una base de datos NoSQL
Se cargará un archivo JSON en Pandas para manipularlo. Se creará una salida por fichero recogida por Power BI, utilizando Panda y Python. Se manipularán los datos y se almacenarán en un fichero para poder ser ingestado por PowerBI

## Base de datos
La base de datos que voy a utilizar es esta:

![image](https://user-images.githubusercontent.com/91873618/231391698-ce18362e-a198-472b-9ae0-d905ff01e6f8.png)


#
