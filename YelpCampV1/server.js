var express = require('express');
var bodyParser = require('body-parser');

var server = express();
server.use(bodyParser.urlencoded({ extended: true}));
server.set('view engine', 'ejs');

// data
var camps = [
  {title: 'Las Pinas City', image:'https://farm3.staticflickr.com/2919/14554501150_8538af1b56.jpg'},
  {title: 'Dasmarinas City', image:'https://farm9.staticflickr.com/8023/7626458374_7ddea1aa2c.jpg'},
  {title: 'Muntinlupa City', image:'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg'}
];

// Routes
server.get('/', (req, res) => {
  res.render('index');
});

server.get('/campgrounds', (req, res) => {
  res.render('camps', {camps: camps});
});

server.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

server.post('/campgrounds', (req, res) => {
  //get data from Form
  var name = req.body.name;
  var image = req.body.image;
  var newCamp = {title: name, image: image};

  // push data to arrays
  camps.push(newCamp);
  res.redirect('/campgrounds');
});

server.listen(3000, () => {
  console.log('Server has started');
});
