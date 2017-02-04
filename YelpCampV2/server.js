// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seed');

// Server  & DB Config
var server = express();
server.use(bodyParser.urlencoded({ extended: true}));
server.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/yelpcamp');
//seedDB();


// Routes
server.get('/', (req, res) => {
  res.redirect('/campgrounds');
});

server.get('/campgrounds', (req, res) => {
  Campground.find({}, function(err, data) {
    res.render('camps', {camps: data});
  });

});

server.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

server.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp) {
    if(err){
      console.log(err);
    } else {
      res.render('post', { post: foundCamp});
    }
  });
});

server.get('/campgrounds/:id/comments/new', function(req, res) {
  Campground.findById(req.params.id, function(err, query) {
    if(err) {
      console.log('Error @ Comment Route');
    } else {
      res.render('newcomment', {query: query});
    }
  });
});

server.post('/campgrounds', (req, res) => {
  Campground.create(req.body.newCampground, function(err, query) {
    if(err){
      console.log(err);
    } else {
      console.log(req.body.newCampground);
      res.redirect('/campgrounds');
    }
  });
});

server.post('/campgrounds/:id/comments', (req, res) => {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + req.params.id);
        }
      });
    }
  });
});

server.listen(3000, () => {
  console.log('Server has started');
});
