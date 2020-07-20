# Crear nuevos autores

Deberíamos agregar un formulario para crear nuevos autores. De la misma manera que lo hicimos para los libros, necesitamos crear un archivo author-add.hbs para mostrar el formulario, y una ruta /authors/add con los métodos GET y POST. Vamos a hacerlo:

```html
/*---author-add.hbs---*/
<form action="/authors/add" method="post">
    <label for="">Name:</label>
    <input type="text" name="name">

    <label for="">Last Name:</label>
    <input type="text" name="lastName">

    <label for="">Nationality:</label>
    <input type="text" name="nationality">

    <label for="">Birthday:</label>
    <input type="date" name="birthday">

    <label for="">Picture Url</label>
    <input type="text" name="pictureUrl">

    <button type="submit">ADD</button>
</form>
```

Agregar el autor a routes/index.js

```js
const Author = require('../models/author');
```

Y nuestras rutas:

```js
router.get('/authors/add', (req, res, next) => {
  res.render("author-add")
});

router.post('/authors/add', (req, res, next) => {
  const { name, lastName, nationality, birthday, pictureUrl } = req.body;
  const newAuthor = new Author({ name, lastName, nationality, birthday, pictureUrl})
  newAuthor.save()
  .then((book) => {
    res.redirect('/books')
  })
  .catch((error) => {
    console.log(error)
  })
});
```

## Actualización de Seeds.js

¡Perfecto! ¡Ya somos maestros haciendo esto! ¡Ahora vamos a presentar algunas cosas nuevas! 😉  
Primero necesitamos cambiar nuestro archivo seeds.js donde agregamos los primeros libros. Cada vez que creamos un libro, primero debemos crear el autor y luego agregar el _id al array del autor. ¡Vamos a hacerlo!

```js
const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');

const dbtitle = 'library-project';
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useNewUrlParser: true, useUnifiedTopology: true });
Book.collection.drop();
Author.collection.drop();

const books = [
  {
    title: "The Hunger Games",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Suzanne",
              "lastName": "Collins",
              "nationality": "American",
              "birthday": new Date(1962,07,11),
              "pictureUrl": "https://www.thefamouspeople.com/profiles/images/suzanne-collins-3.jpg"
            },
    rating: 10
  },
  {
    title: "Harry Potter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Joanne",
              "lastName": "Rowling",
              "nationality": "English",
              "birthday": new Date(1965,06,31),
              "pictureUrl": "https://www.biography.com/.image/t_share/MTE4MDAzNDE3OTI3MDI2MTkw/jk-rowling_editedjpg.jpg"
            },
    rating: 9
  },
  {
    title: "To Kill a Mockingbird",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Harper",
              "lastName": "Lee",
              "nationality": "American",
              "birthday": new Date(1926,03,28),
              "pictureUrl": "https://cdn.cnn.com/cnnnext/dam/assets/150710115858-harper-lee-c1-exlarge-169.jpg"
            },
    rating: 8
  },
  {
    title: "Pride and Prejudice",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Jane",
              "lastName": "Austen",
              "nationality": "English",
              "birthday": new Date(1817,11,16),
              "pictureUrl": "https://www.biography.com/.image/t_share/MTE1ODA0OTcxNTQ2ODcxMzA5/jane-austen-9192819-1-402.jpg"
            },
    rating: 9
  },
  {
    title: "Twilight",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Sthephenie",
              "lastName": "Meyer",
              "nationality": "American",
              "birthday": new Date(1973,11,24),
              "pictureUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Stephenie_Meyer_by_Gage_Skidmore.jpg/1200px-Stephenie_Meyer_by_Gage_Skidmore.jpg"
            },
    rating: 10
  },
  {
    title: "The Book Thief",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Markus",
              "lastName": "Zusak",
              "nationality": "Australian",
              "birthday": new Date(1975,05,23),
              "pictureUrl": "https://images.penguinrandomhouse.com/author/59222"
            },
    rating: 7
  },
  {
    title: "The Chronicles of Narnia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Suzanne",
              "lastName": "Lewis",
              "nationality": "British",
              "birthday": new Date(1898,10,29),
              "pictureUrl": "https://media1.britannica.com/eb-media/24/82724-004-C01DBECB.jpg"
            },
    rating: 8
  },
  {
    title: "Animal Farm",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "George",
              "lastName": "Orwell",
              "nationality": "Indian",
              "birthday": new Date(1903,05,25),
              "pictureUrl": "https://www.biography.com/.image/t_share/MTIwNjA4NjMzOTMzNjI4OTQw/george-orwell-9429833-1-4022.jpg"
            },
    rating: 9
  },
  {
    title: "Gone with the Wind ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Margaret",
              "lastName": "Mitchell",
              "nationality": "American",
              "birthday": new Date(1900,10,08),
              "pictureUrl": "https://media1.britannica.com/eb-media/13/153113-004-8474546E.jpg"
            },
    rating: 10
  },
  {
    title: "The Fault in Our Stars ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "John",
              "lastName": "Green",
              "nationality": "American",
              "birthday": new Date(1977,07,24),
              "pictureUrl": "https://i.guim.co.uk/img/media/8a5dc5e279a570fdba282c88d4a2a363a38bc2e4/0_96_4768_2860/master/4768.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=33c90ed86c41e7d9e2a4297936a2e504"
            },
    rating: 8
  }
]

const createAuthors = books.map(book => {
  const newAuthor = new Author(book.author)
  return newAuthor.save()
  .then(author => {
    return author.name;
  })
  .catch(error => {
    throw new Error(`Impossible to add the author. ${error}`)
  })
})


let findAuthors = Promise.all(createAuthors)
  .then(authors => {
    return books.map(book => {
       return Author.findOne({name: book.author.name, lastName: 
book.author.lastName})
        .then(author => {
          if (!author) {
            throw new Error(`unknown author ${book.author.name} 
${book.author.lastName}`);
          }
          return Object.assign({}, book, {author: author._id});
        })
    });
})
.catch(error => {
  throw new Error(error)
})

const saveBooks = findAuthors.then(findAuthors => {
  return Promise.all(findAuthors)
  .then(books => {
    return books.map(book => {
        const newBook = new Book(book);
        return newBook.save();
    })
  })
}).then(savedBooks => {
  Promise.all(savedBooks)
  .then(books => books.forEach(book => 
console.log(`created ${book.title}`)))
  .then(() => mongoose.connection.close())
  .catch(err => console.log("Error while saving the book: ",err))
})
```

Si ejecutamos node bin/seeds.js, la base de datos ahora debería mostrar dos colecciones diferentes, una para los autores y la otra para los libros, y dentro de cada elemento del libro, el autor debería ser un array de ObjectId.

Deberíamos actualizar los formularios donde podemos crear o actualizar libros, pero dado que en esta unidad nos estamos centrando en las relaciones entre modelos, vamos a omitir eso.  
En cualquier caso, ¡adelante e intenta hacerlo! ¡Deberías mostrar input select donde muestre las opciones de autores que el usuario puede elegir!