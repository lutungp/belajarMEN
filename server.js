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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  // console.log(req.body)
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
