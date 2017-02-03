// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Server Setup
var server = express();
server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({extended: true}));
server.use(methodOverride('method'));

// DB Setup
mongoose.connect('mongodb://localhost/simpleblog');
var PostSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  createdAt: { type: Date, Default: Date.now}
});

var Post = mongoose.model('post', PostSchema);

// Routes
server.get('/', (req, res) => {
  Post.find({}, function(err, query){
    res.render('index', {query: query});
  });
});

server.get('/new', (req, res) => {
  res.render('new');
});

server.post('/', (req, res) => {
  var title = req.body.title;
  var image = req.body.image;
  var content = req.body.content;
  var data = { title: title, image: image, content: content};
  Post.create(data, function(err, query) {
    console.log(query);
    res.redirect('/');
  });
});

server.get('/post/:id', (req, res) => {
  var postId = req.params.id;
  Post.findById(postId, function(err, query) {
    if(err) {
      res.send('Something went wrong');
    } else {
      res.render('post', {query: query});
    }
  });

});

server.get('/post/:id/edit', (req, res) => {
  var postId = req.params.id;
  Post.findById(postId, function(err, query) {
    res.render('edit', {query: query});
  });
});

server.put('/post/:id', (req, res) => {
  var updatedPost = {
    title: req.body.title,
    image: req.body.image,
    content: req.body.content
  };

  Post.findByIdAndUpdate(req.params.id, updatedPost, function(err, response) {
    if(err) {
      console.log(err);
      res.redirect('/post');
    } else {
      res.redirect('/post/' + req.params.id);
    }
  });
});

server.delete('/post/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, function(err, response) {
    if(err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

server.get('/post/*', (req, res) => {
  res.send('Something went wrong. Go back home');
});


// Server
server.listen(3000, function() {
  console.log('Server is running');
});
