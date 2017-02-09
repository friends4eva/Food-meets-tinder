var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
  date: Date,
  name: String,
  rating: Number,
  mobile_url: String,
  rating_img_url: String,
  url: String,
  snippet_text: String,
  yelp_id: String,
  location: Object
})

var UserSchema = new mongoose.Schema({
  // fb_name: String,
  fb_id: String,
  yelp_id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  location: Object,
  liked: Number,
  disliked: Number
})


var User = mongoose.model('User', UserSchema)

module.exports = User
