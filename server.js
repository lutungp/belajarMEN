// console.log("node to be with you");
const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
const app = express();

// urlencoded metode pada body-parser, untuk extract data dari form dan menambahkan pada object
app.use(bodyParser.urlencoded({extended : true}))

// //load mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbbelajar')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Berhasil terhubung dengan MongoDB");
});

app.listen(3000, function() {
  console.log('listening on 3000')
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

app.post('/quotes', (req, res) => {
  // console.log(req.body)
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.use(express.static('public'))

app.use(bodyParser.json())

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({quote: 'dd'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
