var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comments = require('./models/comment');

var data1 = [
  {title: 'Las Pinas City', image:'https://farm3.staticflickr.com/2919/14554501150_8538af1b56.jpg', desc: 'blah blah blah'},
  {title: 'Dasmarinas City', image:'https://farm9.staticflickr.com/8023/7626458374_7ddea1aa2c.jpg', desc: 'blah blah blah'},
  {title: 'Muntinlupa City', image:'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg', desc: 'blah blah blah'}
];

var data2 = [
  {title: 'blah blah blah', author: 'Ruie'}
];

function seedDB() {

  // Removing Campground
  Campground.remove({}, function(err, query) {
    if(err) {
      console.log(err);
    } else {
      console.log('Removed Campgrounds Data');

      // Create new campgrounds
      data1.forEach(function(data) {
        Campground.create(data, function(err, campground) {
          if(err) {
            console.log(err);
          } else {
            console.log('New Data Added');

            Comments.create({
              title: 'Sample sample',
              author: 'Ruie Pena'
            }, function(err, query) {
              console.log('New Comments Added');
              campground.comments.push(query);
              campground.save();
            });
          }
        });
      });

    }
  });

};

module.exports = seedDB;
