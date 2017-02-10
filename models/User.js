var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
  date: Date,
  name: String,
  rating: Number,
  // DON'T FORGET TO DELETE THIS IN USE CASES!!!
  // mobile_url: String,
  rating_img_url: String,
  url: String,
  snippet_text: String,
  yelp_id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  image_url: String,
  location: Object,
  likes: Number,
  dislikes: Number
})

var UserSchema = new mongoose.Schema({
  fb_id: {
    type: String,
    required: true,
    index: true,
    unique: true,
    dropDups: true
  },
  liked_businesses: [businessSchema]
})

var User = mongoose.model('User', UserSchema)

module.exports = User
