var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
  date: Date,
  name: String,
  rating: Number,
  mobile_url: String,
  rating_img_url: String,
  url: String,
  snippet_text: String,
<<<<<<< HEAD
  yelp_id: String,
  location: Object
  // liked: Number,
  // disliked: Number
})

var UserSchema = new mongoose.Schema({
  // fb_name: String,
  fb_id: String,
=======
  yelp_id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
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
>>>>>>> 4cd8a49b82f23e174e98e3c10da9601a29b5caee
  liked_businesses: [businessSchema]
})

var User = mongoose.model('User', UserSchema)

module.exports = User
