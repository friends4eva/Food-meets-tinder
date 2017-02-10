require('./config')
// Require models
const User = require('../models/User')

// var all_da_likes = []

// User.find({fb_id: req.session.user}).exec()
// // User.find({fb_id: req.session.user.id})
//     .then( users => {
//       var business = users[0].liked_businesses;
//       for(var idx = 0; idx<business.length; idx++){
//         if (business[idx].likes > 0){
//           all_da_likes.push(business[idx])
//         }
//       }
//       $.post('/results', all_da_likes)
//     })
//     // .then( business => {
//     //   var liked = business.find({likes: {$gt: 1}});
//     //   console.log(liked)
//     // })
User.find({fb_id: 1336959796347406})
    .then( users => {
      var business = users[0];
      for (var i=0; i<business.liked_businesses.length; i++) {
        if ( "Slurpin'  Ramen Bar" === business.liked_businesses[i].name) {
          business.liked_businesses[i].remove()
      }
    }
    console.log(business.liked_businesses)
  })
