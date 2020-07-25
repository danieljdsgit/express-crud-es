//routes/index.js 

var express = require('express');
var router = express.Router();

//traemos el modelo de book creado y lo igualamos a una variable para pode utilizarlo en index.js
const Book = require('../models/book.js');
const Author = require('../models/author');
const { routes } = require('../app.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//empezamos con algunas consultas de Mongoose
router.get('/books', (req, res, next) => {
  Book.find()
  .then(allTheBooksFromDB => {
    //console.log('Retrieved books from DB:', allTheBooksFromDB);
    res.render('books', { books: allTheBooksFromDB });
  })
  .catch(error => {
    console.log('Error while getting the books from the DB: ', error);
  })
});

//renderizar form para obtener la info.
//tiene que ir antes de bookid ya que sino express identifica add como una id.
router.get('/book/add', (req, res, next) => {
  res.render("book-add");
});

//añadimos la funcion para obtener info del form
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

//ruta para nuestra author-add view
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


//Para obtener los datos de la pag editar
router.get("/book/edit", (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
    .then((book) => {
      res.render("book-edit", { book });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/book/edit", (req, res, next) => {
  //creamos variable de los inputs a cambiar
  const { title, author, description, rating } = req.body;
  Book.update(
    //accede al libro selecionado requeriendo la id del libro
    {_id: req.query.book_id},
    { $set: {title, author, description, rating}},
    {new: true}
  )
    .then((book) => {
      res.redirect("/books");
    })
    .catch((error) => {
      console.log(error);
    });
});

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

//consulta a DB con el Id obtenido en el req.params.
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


module.exports = router;