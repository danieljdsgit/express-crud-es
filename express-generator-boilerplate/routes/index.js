var express = require('express');
var router = express.Router();

//traemos el modelo de book creado y lo igualamos a una variable para pode utilizarlo en index.js
const Book = require('../models/book.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//ruta a books, para que cuando se ponga /books abra el books.hbs


//empezamos con algunas consultas de Mongoose
router.get('/books', (req,res,next) => {
  Book.find()
  .then(allTheBooksFromDB => {
    //console.log('Retrieved books from DB:', allTheBooksFromDB);
    res.render('books', { books: allTheBooksFromDB });
  })
  .catch(error => {
    console.log('Error while getting the books from the DB: ', error);
  })
});

module.exports = router;