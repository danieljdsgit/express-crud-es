# Instalar Express Generator

Debes instalar Express Generator como un paquete global de NPM para poder ejecutarlo desde cualquier lugar de su ordenador. Esta instalación es bastante sencilla y ya debe estar familiarizado con este proceso:

```
$ npm install express-generator -g
```

## Inicio rápido

La forma más rápida de comenzar con express es utilizar el ejecutable express que generará una aplicación como se muestra a continuación:

```
$ express --view=hbs

o

$ express --hbs
```

Entonces, comencemos a usar este comando y creemos nuestro primer proyecto.

Llamaremos a nuestro proyecto library-project, por lo que ejecutaremos la siguiente línea:

```
$  express --view=hbs library-project
```

Luego de navegar al proyecto que acabamos de crear, podemos ejecutar nuestra aplicación.

```
$ cd library-project
```

Primero debemos instalar los paquetes usando:

```
npm install
```

E instalar nodemon:

```
npm install nodemon --save-dev
```

También necesitamos instalar mongoose, serve-favicon y dotenv:

```
npm install mongoose serve-favicon dotenv
```

Necesitamos crear la carpeta para los modelos:

```
mkdir models
```

Y necesitamos agregar esta línea a los scripts del archivo package.json:

```
"dev": "nodemon ./bin/www"
```

En nuestra app.js necesitamos agregar las siguientes líneas:

1. El require de dotenv en la línea 1:

```js
require('dotenv').config();
```

2. Luego de las dependencias del proyecto (y antes de requerir los archivos de las rutas), requerimos  favicon, hbs, y mongoose.

```js
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
```

3. Luego de agregar las líneas anteriores, agregamos la conexión a mongoDB:

```js
mongoose
  .connect('mongodb://localhost/library-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
```

4. Agregamos el path para que la aplicación pueda encontrar nuestro favicon:

**si no están usando el boilerplate, y como express-generator no trae ningún favicon por defecto, hay que ir a copiar/pegarlo desde esta location: express-generator-boilerplate/public/images/favicon.ico (si no lo haces, da un error cuando ejecutamos npm run dev)

```js
//luego de esta línea...
app.use(express.static(path.join(__dirname, "public")));
//agregamos...
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
```

Para el modo de (dev) desarrollo (usando nodemon) debemos ejecutar el siguiente comando:

```
$ npm run dev
```

Este es el comando que seguiremos usando y luego, cuando comencemos a hacer deploy de nuestros proyectos, vamos a querer ejecutarlo en modo (prod) producción, por lo que podemos usar este comando:

```
$ npm start
```

Podemos navegar a http://localhost:3000
