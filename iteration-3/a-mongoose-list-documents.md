# Lista de documentos

Lo primero que haremos es enumerar todos los libros en una nueva ruta. Creemos una ruta /books dentro de nuestro archivo routes/index.js y rendericemos una vista de libros cuando la usemos (también debe crear el archivo books.hbs dentro de la carpeta de vistas).

```js
// routes/index.js

router.get('/books', (req, res, next) => {
  res.render('books');
});
```

Nuestra vista está vacía, y no estamos pasando ningún dato para renderizar. Vamos a consultar nuestra colección de libros para traer todos los libros que tenemos en nuestra base de datos. Primero, debemos verificar que nuestro modelo de colección esté en el archivo index.js donde creamos la ruta.

```js
// routes/index.js

const express = require('express');
const router  = express.Router();

const Book = require('../models/book.js'); // <== this line
```

Ahora estamos listos para comenzar a hacer algunas consultas de Mongoose dentro de la ruta:

```js
// routes/index.js

router.get('/books', (req, res, next) => {
  Book.find()
    .then(allTheBooksFromDB => {
      console.log('Retrieved books from DB:', allTheBooksFromDB);
      res.send('books');
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
    })
});
```

Si nuestra consulta va bien, deberíamos ver en la consola del servidor todos los libros que tenemos en la base de datos (que se han creado en la BDD a partir del archivo seeds.js) yendo a la página /books en el navegador (http://localhost:3000/books).

    ¿Cómo podemos pasar esa información a nuestra vista?
    ¿Dónde deberíamos llamar al método res.render()?

Sabemos que podemos agregar un segundo parámetro al método res.render(), donde podemos pasar algunos datos, por lo que es fácil. Pero, ¿dónde deberíamos poner nuestro método res.render() en primer lugar? La consulta de Mongoose es asíncrona y si colocamos res.render() fuera del bloque de la promise, se procesará antes de recuperar los datos, por lo que no podremos mostrar la información en la vista.

```js
// routes/index.js

router.get('/books', (req, res, next) => {
  Book.find()
    .then(allTheBooksFromDB => {
      // console.log('Retrieved books from DB:', allTheBooksFromDB);
      res.render('books', { books: allTheBooksFromDB });
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
    })
});
```

Finalmente, podemos agregar este código en nuestro books.hbs para mostrar cada libro:

```html
{{!-- views/books.hbs --}}

<h1>BOOKS</h1>

{{#each books}}
    <p>{{this.title}}</p>
{{/each}}
```

Luego vaya a:

http://localhost:3000/books/

¡Increíble! ¡Tenemos nuestra biblioteca mostrando todos los libros que tenemos!