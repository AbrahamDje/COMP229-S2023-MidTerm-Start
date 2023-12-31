// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res) => {
  res.render('book-details', {
    title: 'Add Book',
    books: {}
  });
});


    


// POST process the Book Details page and create a new Book - CREATE


router.post('/add', (req, res) => {
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre
  });
  book.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });
});



// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.get('/:id', (req, res) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    res.render('book-details', {
      title: 'Edit Book',
      books: book
    });
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  Book.remove({_id: id}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });
});


module.exports = router;
