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
$  express --hbs library-project
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
npm install nodemon
```

También necesitamos instalar mongoose, serve-favicon, body-parser y dotenv:

```
npm install mongoose serve-favicon body-parser dotenv
```

Necesitamos crear la carpeta para los modelos:

```
mkdir models
```

Y necesitamos agregar esta línea a los scripts:

```
"dev": "nodemon ./bin/www"
```

En nuestra app.js necesitamos agregar las siguientes líneas:

1. El require de dotenv en la línea 1:

```js
require('dotenv').config();
```

2. Requerimos bodyParser, favicon, hbs, y mongoose.

```js
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
```

3. La conexión a mongoDB:

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

4. El path para que la aplicación pueda encontrar nuestro favicon:

```js
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
```

5. Agregamos estas líneas para parsing de json y urls codificadas.

```js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

Para el modo de (dev) desarrollo (usando nodemosn) debemos ejecutar el siguiente comando:

```
$ npm run dev
```

Este es el comando que seguiremos usando y luego, cuando comencemos a hacer deploy de nuestros proyectos, vamos a querer ejecutarlo en modo (prod) producción, por lo que podemos usar este comando:

```
$ npm start
```

Podemos navegar a http://localhost:3000
