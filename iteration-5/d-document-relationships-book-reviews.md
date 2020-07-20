# Books Reviews

Practicamos las relaciones utilizando referencias con los autores. Ahora intentemos usar las estrategias integradas para las reviews. Casi todas las aplicaciones aportan comentarios de los usuarios, y es una gran característica para agregar a los proyectos.

El review tendrá dos campos: usuario y comentarios. Como vamos a incorporar los reviews en el modelo Book, no necesitamos crear uno nuevo; solo necesitamos añadir un nuevo campo a nuestro modelo Book, así que hagámoslo:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
    rating: Number,
    reviews: [
      {
        user: String,
        comments: String
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
```

## Crear Reviews

Cuando mostramos los detalles de un libro, en el archivo book-detail.hbs debemos crear un formulario que permita a los usuarios agregar reviews sobre ese libro. Vamos a hacerlo:

```js
/*--book-detail.hbs--*/

<p>Add a review</p>
<form action="/reviews/add?book_id={{book._id}}" method="post">
    <label for="">User:</label>
    <input type="text" name="user">

    <label for="">Comments:</label>
    <textarea type="text" name="comments"></textarea>

    <button type="submit">ADD</button>
</form>
```

Y vamos a crear un método POST en la ruta /reviews/add, donde obtendremos toda la información de req.body y actualizaremos el campo reviews del libro haciendo push del nuevo review en el array.

```js
router.post('/reviews/add', (req, res, next) => {
  const { user, comments } = req.body;
  Book.update(
    { _id: req.query.book_id },
    { $push: { reviews: { user, comments } } }
  )
    .then(book => {
      res.redirect('/book/' + req.query.book_id);
    })
    .catch(error => {
      console.log(error);
    });
});
```

## Imprimir los reviews

Finalmente, tenemos que imprimir todos los reviews. Una de las ventajas de incrustar documentos es que no necesitamos hacer otra consulta antes de renderizar la vista book-detail.hbs. Ya estábamos pasando los datos del libro, por lo que solo necesitamos recorrer el array de reviews e imprimir cada uno de ellos.

```html
//...
<h2>Reviews</h2>
{{#each book.reviews}}
<div class="review-item">
  <p>{{this.comments}}</p>
  <span>{{this.user}}</span>
</div>
{{/each}}
```

Y un poco de CSS para darle estilo a nuestra aplicación:

```css
.review-item {
  border-bottom: 1px solid grey;
  margin: 10px 0;
  padding-bottom: 10px;
}

.review-item p {
  margin-bottom: 0;
}

.review-item span {
  font-size: 10px;
  color: grey;
}
```

## ¡Felicitaciones!
