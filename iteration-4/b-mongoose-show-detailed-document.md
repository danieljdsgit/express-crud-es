# Mostrar documento detallado

Hasta ahora solo hemos mostrado el título de cada libro, pero queremos que los usuarios de nuestra aplicación puedan ver toda la información. Podemos llevarlos a la vista detallada donde pueden ver todo lo que hemos guardado en nuestra DB relacionada con ese libro específico. 

Creemos una vista dentro de la carpeta de vistas views/book-details.hbs, donde se mostrarán todos estos datos. Seguro que no crearemos una vista por libro, sabemos cómo manipular los datos para que la vista cambie dinámicamente.

## Agregar las rutas

Primero, asegúrese de que todos los títulos en books.hbs sean hipervínculos. El link debe incluir un campo que podamos usar para consultar la base de datos para encontrar un libro específico.

¿Qué campo podemos usar? ¡Si! Parece que el _id es el mejor.

```html
// views/books.hbs

<h1>BOOKS</h1>
{{#each books}}
    <p>
        <a href="book/{{this._id}}">{{this.title}}</a>
 
        <a href="/book/edit?book_id={{this._id}}" class="edit-button">EDIT</a>
    </p>
{{/each}}
```

Cuando hacemos clic en uno de los títulos, ¿hacia dónde navegaremos?

¡Exactamente! Navegaremos a una ruta como la siguiente: http://localhost:3000/book/5a79d85fd642ff1f1e6a479e (sí, ¡la parte final será diferente de un libro a otro!)

Entonces, ¿cómo tenemos que estructurar la ruta? Hm, debería ser algo como esto: http://localhost:3000/book/:bookId.

Agreguemos esta ruta a nuestro proyecto y hagamos que muestre una vista de book-details, por ahora.

```js
// routes/index.js

router.get('/book/:bookId', (req, res, next) => {
  res.render('book-details');
});
```
## Obtener el id

¿Cómo podemos obtener el id de la URL?

Hay diferentes formas de obtener la información del id, pero la mejor es usar req.params.

```js
// routes/index.js

router.get('/book/:bookId', (req, res, next) => {
  console.log('The ID from the URL is: ', req.params.bookId);
  res.render('book-details');
});
```
:bulb: ¿Hay alguna otra forma de hacer esto en lugar de usar los parámetros de ruta?

Siga adelante y haga clic en diferentes libros, y debería ver en la consola el campo _id de cada libro en el que hizo clic.

Consultando la DB

Tenemos todo lo que necesitamos para consultar nuestra base de datos, recuperar toda la información sobre el libro cliqueado y pasar los datos a nuestra vista.

¿Qué método de Mongoose debemos usar para consultar?

Tenemos un par de opciones: find(), findOne(), findById() son las más comunes. Después de tener la información sobre el libro que estamos buscando, debemos pasar esos datos a la vista.

```js
// routes/index.js

router.get('/book/:bookId', (req, res, next) => {
  Book.findOne({'_id': req.params.bookId})
    .then(theBook => {
      res.render('book-details', { book: theBook });
    })
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
    })
});
```

Usando findOne() la base de datos recupera un objeto con el libro. Si usamos el método find(), devolverá un array con los objetos que coinciden con los criterios, pero en nuestro caso solo hay un objeto con el id que le pasamos, por lo que obtendremos el array con un elemento. 
Seguiremos usando el método findById() ya que es el más claro.

```js
// routes/index.js

router.get('/book/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(theBook => {
      res.render('book-details', { book: theBook });
    })
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
    })
});
```

Agreguemos un código en book-details.hbs para que podamos mostrar la información que tenemos de la base de datos:

```html
<h1>{{book.title}}</h1>
<span>Written by: {{book.author}}</span>
<p>Summary: {{book.description}}</p>
<p>Rating: {{book.rating}}/10</p>
<a href="/books">Return</a>
```

Al hacer clic en cualquiera de los libros, deberíamos ver sus detalles.