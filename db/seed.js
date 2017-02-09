require('./config')
// Require models
var User = require('../models/user')

User.find().exec()
  .then( users => {
    var user = users[1];
    for (var i=0; i<user.liked_businesses.length; i++){
      // for (let i in user.liked_businesses) {
        console.log(user.liked_businesses[i].name)
        console.log(user.liked_businesses[i].url)
      // return user.liked_businesses[i].name
    }
  })



var checkAndLike = function(event) {
  User.find().exec()
    .then( users => {
      for (var j=0; j<users.length; j++){
        if ( req.session.user.id === users.fb_id[j] ) {
          var user = users[1];
          for (var i=0; i<user.liked_businesses.length; i++){
            if (req.session.businesses[i].id === user.liked_businesses[i].id) {
              user.liked_businesses[i].likes++;
          } else {
              user.liked_businesses.push(req.session.businesses[i])
              user.liked_businesses[i].likes++;
          }
        }
      }
    }
  })
}

var checkAndDislike = function(event) {
  User.find().exec()
    .then( users => {
      for (var j=0; j<users.length; j++){
        if ( req.session.user.id === users.fb_id[j] ) {
          var user = users[1];
          for (var i=0; i<user.liked_businesses.length; i++){
            if (req.session.businesses[i].id === user.liked_businesses[i].id) {
              user.liked_businesses[i].dislikes++;
          } else {
              user.liked_businesses.push(req.session.businesses[i])
              user.liked_businesses[i].dislikes++;
          }
        }
      }
    }
  })
}
