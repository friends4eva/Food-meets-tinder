var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  fb_id: String,
  yelpbiz: {
    id: String,
    name: String,
    like: boolean
  }
})

var User = mongoose.model('User', UserSchema)

module.exports = User
