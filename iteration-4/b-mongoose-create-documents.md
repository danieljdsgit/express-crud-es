# Crear documentos

Todo configurado! Estamos listos para crear nuevos documentos y almacenarlos en nuestra base de datos. 

**Obteniendo los datos de una solicitud POST y creando el documento**

¿Cómo podemos obtener los datos en la ruta /books/add?

Todos los datos se incluirán en la propiedad body del objeto request, por lo que podemos manejarlo para crear un nuevo libro en la base de datos, pero hagámoslo paso a paso:

Debe incluir todo lo siguiente dentro de la ruta books/add con el método POST.

Primero, necesitamos obtener los datos y almacenarlos en nuevas variables. La desestructuración de ES6 ayudará con eso:

```js
const { title, author, description, rating } = req.body;
```

Recuerde que esto es posible solo si las variables tienen el mismo nombre en el req.body, lo que significa que deben tener el mismo nombre en el atributo name de cada input.

Podemos crear un nuevo Book usando el modelo que importamos. ¡Es importante notar que estamos usando algunas características de ES6 que hacen que nuestro código se vea mucho más claro!

```js
const newBook = new Book({ title, author, description, rating});
```

Podemos almacenar el nuevo libro en la base de datos, utilizando el método save(). Dado que este es un proceso asincrónico, debemos procesarlo como una Promise. Si todo sale bien, recibiremos el libro que acabamos de guardar. De lo contrario, obtendremos un error. ¡Necesitamos controlar ambas opciones!

```js
newBook.save()
.then((book) => {

})
.catch((error) => {

})
```

Finalmente, podemos redirigir a nuestro usuario a la ruta /books, donde listaremos todos los libros que tenemos en la base de datos. El nuevo libro ya debería estar allí. Deberíamos tener el siguiente código en nuestra ruta:

```js
router.post('/book/add', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  const newBook = new Book({ title, author, description, rating})
  newBook.save()
  .then((book) => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
  })
});
```

Vaya a http://localhost:3000/book/add y cree un libro.

Genial! Ahora deberíamos ver en la base de datos el nuevo libro que acabamos de crear. Cuando seamos redirigidos a la página /books, también deberiamos ver el nuevo libro que acabamos de crear en la lista de libros.

Crear documentos es una acción súper estándar en las aplicaciones web, y debe asegurarse de comprender paso a paso todo el proceso que necesitará para hacerlo, por lo que si algo no está lo suficientemente claro, ¡ahora es el momento perfecto para preguntar!