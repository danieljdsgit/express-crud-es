# Introducción

Hemos visto cómo podemos listar, leer, crear y actualizar documentos mientras utilizamos Express con Mongoose, por lo que estamos listos para crear excelentes aplicaciones web. En la siguiente unidad, vamos a aprender cómo podemos integrar un concepto crucial que aprendimos de MongoDB, las relaciones entre documentos.

Para avanzar más rápido, sigamos usando nuestro proyecto library-project. 

## El autor

Tener solo el nombre y el apellido del autor en el modelo Book es realmente poca información, por lo que crearemos un modelo Author separado del de Book. En el modelo Author agregaremos: name, lastName, nationality, birthday y pictureUrl, de esta manera podemos mostrar la información completa sobre el autor del libro.

También es cierto que un libro podría tener más de un autor, por lo que el campo autor del modelo Book será un array con ids de Author.

¿Por qué decidimos hacer referencia a los autores en lugar de incrustarlos en el modelo Book?

¿Imagina que queremos actualizar el pictureUrl de un autor específico? Si los tenemos incrustados en el modelo Book, debemos buscar en cada libro donde aparezca este autor y actualizar el campo. Pero si estamos haciendo referencia a ellos, solo necesitamos actualizar al autor una vez.

## Author Model

Comencemos a crear nuestro modelo Author. Dentro de nuestra carpeta de modelos agregue un archivo author.js y copie/pegue el siguiente código:

```js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  lastName: String,
  nationality: String,
  birthday: Date,
  pictureUrl: String
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
```

También necesitamos actualizar nuestro modelo Book, reemplazando el tipo de datos que estamos asignando al campo de autor. En lugar de String, ahora tendremos un array de ObjectID apuntando al modelo User. Entonces tendremos lo siguiente:

```js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  description: String,
  author: [ { type : Schema.Types.ObjectId, ref: 'Author' } ],
  rating: Number
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
```