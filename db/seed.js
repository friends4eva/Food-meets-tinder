require('./config')
// Require models
var User = require('../models/user')

// User.find().exec()
//   .then( users => {
//     // console.log(users)
//     var user = users[4];
//     // console.log(user.liked_businesses)
    // for (var i=0; i<user.liked_businesses.length; i++){
//     //   // for (let i in user.liked_businesses) {
        // console.log(user.liked_businesses[i].name)
//     //     console.log(user.liked_businesses[i].url)
//     //   // return user.liked_businesses[i].name
//     // }
//   })

// User.find().exec()
//   .then( users => {
//     var business = users[0];
//     console.log(business)
//     for (var i=0; i<business.liked_businesses.length; i++){
//       console.log(business.liked_businesses[i]);
//     }
//   })

// User.find({fb_id: 1336959796347406}).exec()
User.find({fb_id: req.session.user.fb_id}).exec()
  .then( users => {
    var business = users[0];
    console.log(business.liked_businesses)
    for (var i=0; i<business.liked_businesses.length; i++){
      if ( req.session.user.liked_businesses.yelp_id === business.liked_businesses[i].yelp_id) {
        business.liked_businesses[i].likes++;
        business.save();
      }
      else {
        business.liked_businesses.push(req.session.businesses[i])
        business.liked_businesses[i].dislikes++;
        business.save();
    }
  }
})

