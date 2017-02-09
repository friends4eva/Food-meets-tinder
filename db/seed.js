require('./config')
// Require models
var User = require('../models/user')

User.find().exec()
  .then( users => {
    var user = users[1]
    return user.liked_businesses[2]
  })
  .then(business => {
    console.log(business)
  })
  .then(name => {
    // console.log(name)
  })
