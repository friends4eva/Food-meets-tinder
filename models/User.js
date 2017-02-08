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
  location: Object,
  liked: Number,
  disliked: Number
})

var UserSchema = new mongoose.Schema({
  fb_id: String,
  liked_businesses: [businessSchema]
})

var User = mongoose.model('User', UserSchema)

module.exports = User
