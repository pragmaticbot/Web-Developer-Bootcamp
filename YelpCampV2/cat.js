var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');


var catScheme = new mongoose.Schema({
  name: String,
  age: Number
});

var Cat = mongoose.model('Cat', catScheme);

Cat.create({
  name: "Ruie",
  age: 12
}, function(err, res){
  if(err){
    console.log('Error Create');
  } else {
    console.log(res);
  }
});

Cat.find({}, function(err, res){
  if(err) {
    console.log('Error');
  } else {
    console.log('Result');
    console.log(res);
  }
});
