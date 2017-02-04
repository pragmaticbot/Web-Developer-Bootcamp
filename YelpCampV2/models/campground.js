var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
  title: String,
  image: String,
  desc: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model('Campground', campgroundSchema);
