//model/book.js
//estamos creando el modelo que debera seguir cada libro que queramos incluir en nuestra DB
const mongoose = require("mongoose");
//llamamos a mongoose para interactuar con DB
const Schema = mongoose.Schema;
//y le indicamos a mongoose el modelo de objeto

const bookSchema = new Schema({
    title: String,
    description: String,
    author: String,
    rating: Number
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;