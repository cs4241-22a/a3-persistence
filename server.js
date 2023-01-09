const express = require('express'); 
const bodyParser = require('body-parser'); 
const port = 8080; 
const app = express(); 


// CONFIGURATIONS FOR APP -----------------------------------------------------------------------------------------
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


// MONGODB SET UP ------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb+srv://cindyisawesome:test123@cindy-test.yldscww.mongodb.net/?retryWrites=true&w=majority';


// APP ROUTES -----------------------------------------------------------------------------------------------------
app.get('/', (req, res) => { 
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('A3-database');
        const collection = db.collection('book-collection');
        collection
          .find()
          .toArray()
          .then((results) => {
            res.render('index.ejs', { books: results });
          })
          .catch((error) => {
            res.redirect('/');
          });
      });
}); 


// ADD BOOK ENTRY ------------------------------------------------------------------------------------------------
app.post('/books', (req, res) => { 
        MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
          if (err) return console.error(err);
          const db = client.db('A3-database');
          const collection = db.collection('book-collection');
          collection
            .insertOne(req.body)
            .then(() => {
              res.redirect('/');
            })
            .catch(() => {
              res.redirect('/');
            });
        });
      });


// DELETE BOOK ENTRY  --------------------------------------------------------------------------------------------
app.delete('/books', (req, res) => {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('A3-database');
        const collection = db.collection('book-collection');
        collection
            .deleteOne(req.body)
            .then(() => {
                res.json(`Deleted Book Entry`);
            })
            .catch(() => {
                res.redirect('/');
            });
    });
});


// EDIT BOOK ENTRY  ----------------------------------------------------------------------------------------------
app.put('/books', (req, res) => {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('A3-database');
        const collection = db.collection('book-collection');
        collection
            .findOneAndUpdate(
                {   bookTitle: req.body.oldBookTitle, 
                    bookAuthor: req.body.oldBookAuthor, 
                    dateStarted: req.body.oldDateStarted, 
                    dateCompleted: req.body.oldDateCompleted, 
                    rating: req.body.oldRating },
                {$set: {
                        bookTitle: req.body.bookTitle,
                        bookAuthor: req.body.bookAuthor,
                        dateStarted: req.body.dateStarted,
                        dateCompleted: req.body.dateCompleted,
                        rating: req.body.rating
                    }
                },
                {
                    upsert: true
                }
            )
            .then(() => {
                res.json('Success');
            })
            .catch(() => {
                res.redirect('/');
            });
    });
});

// START SERVER  ---------------------------------------------------------------------------------------------------
app.listen(port, () => { 
  console.log(`Server listening on port ${port}`); 
});