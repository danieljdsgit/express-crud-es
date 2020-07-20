# Populating the Author

¡Tenemos un problema ahora! Cada vez que hacemos clic en un libro para verificar los detalles, en lugar de la información del autor, vemos el _id, porque eso es lo que estamos almacenando en nuestra base de datos.

Deberíamos hacer *populate* del campo autor en /book/:id antes de enviar los datos a la vista.

*Population* es el proceso de reemplazar automáticamente las rutas especificadas en el documento con documentos de otras colecciones. Podemos popular un solo documento, múltiples documentos, objetos simples, múltiples objetos simples o todos los objetos retornados por una consulta.

Ya vimos esto, ¡pero solo para refrescar la memoria! 😉

```js
router.get('/book/:bookId', (req, res, next) => {
  let bookId = req.params.bookId;
  if (!/^[0-9a-fA-F]{24}$/.test(bookId)) { 
    return res.status(404).render('not-found');
  }
  Book.findOne({'_id': bookId})
    .populate('author')
    .then(book => {
      if (!book) {
          return res.status(404).render('not-found');
      }
      res.render("book-details", { book })
    })
    .catch(next)
});
```

Genial, no? Ahora tenemos el array completo de autores con toda la información sobre cada autor.

Necesitamos actualizar nuestro book-details.hbs:

```html
<h1>{{book.title}}</h1>
<span>Written by: 
{{#each book.author}}
{{name}} {{lastName}}
{{/each}}
</span>
<p>Summary: {{book.description}}</p>
<p>Rating: {{book.rating}}/10</p>
<a href="/books">Return</a>
```