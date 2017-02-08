var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  fb_id: String,
  results: []
})

var User = mongoose.model('User', UserSchema)

module.exports = User
