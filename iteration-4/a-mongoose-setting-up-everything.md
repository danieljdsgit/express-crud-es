# Configurando todo

En esta iteración, crearemos nuevos libros y los almacenaremos en nuestra base de datos.

Discusión

    ¿Qué rutas necesitas crear para mostrar un formulario donde un usuario pueda completar la información de un libro nuevo y luego obtener la información y crear un nuevo libro en la base de datos?
    ¿Qué método usarías en cada una de esas rutas?


Sí, necesitaremos dos rutas, la primera para renderizar el formulario donde el usuario pueda completar toda la información sobre un nuevo libro, y otra para obtener los datos del libro y agregarlos a la base de datos. ¡Hagamoslo!

**Las rutas de '/book/add' deben ir ANTES de la ruta '/book/:bookId'. Si las ubican después de '/book/:bookId' las solicitudes no lograran entrar en la ruta "/book/add" porque express intenta interpretar "add" como un ":bookId"**

Primero, cree una nueva ruta book/add en nuestro archivo routes/index.js que debería renderizar un archivo book-add.hbs. ¿Qué método usaremos?

```js
// routes/index.js

/* GET /book/add --> renders the form where user will add a new book */
router.get('/book/add', (req, res, next) => {
  res.render("book-add");
});
```

¿Y el segundo? Necesitamos otro para obtener los datos y agregarlos a nuestra base de datos Mongo. Podemos usar la misma ruta pero cambiando el método.

```js
// routes/index.js

/* POST /book/add --> sends the book information from the form to the server */
router.post('/book/add', (req, res, next) => {
  
});
```

¡Increíble! Ahora necesitamos crear un archivo book-add.hbs dentro de la carpeta views y agregar un formulario, con todos los campos que necesitamos para crear un nuevo libro.

```html
<!-- views/book-add.hbs -->

<form action="/book/add" method="post">
    <label for="">Title:</label>
    <input type="text" name="title">

    <label for="">Author:</label>
    <input type="text" name="author">

    <label for="">Description:</label>
    <input type="text" name="description">

    <label for="">Rate:</label>
    <input type="number" name="rating">

    <button type="submit">ADD</button>
</form>
```