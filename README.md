# Choice Técnico- FULL STACK Toolbox

## Empezando

- correr el api primero
```bash
$ cd api
api$ npm install
```
- una ves terminen de instalar los node_modules ejecutas `npm run start` en la terminal

- luego correr el front
```bash
$ cd front
front$ npm install
```

- una ves terminen de instalar los node_modules ejecutas `npm run start` en la terminal

abrir el navegador [http://localhost:3000](http://localhost:3000)

**Usando docker**

- crear la imagen del backend(api) y ejecutarla con `docker-compose up -d --build`
el api corre escuchando en el puerto 8081

- crear la imagen del Front(web) y ejecutarla con `docker-compose up -d --build`
el frontend corre escuchando en el puerto 3001

abrir el navegador [http://localhost:3001](http://localhost:3000)


## para ejecutar los test

- Ir a la respectiva carpeta `front` o `api` y ejecutar `npm run test`
