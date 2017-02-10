require('./config')
// Require models
const User = require('../models/user')

User.find({fb_id: 1336959796347406}).exec()
// User.find({fb_id: req.session.user.id})
    .then( users => {
      var business = users[0].liked_businesses;
      for(var idx = 0; idx<business.length; idx++){
        if (business[idx].likes > 0){
          console.log(business[idx])
        }
      }
    })
    // .then( business => {
    //   var liked = business.find({likes: {$gt: 1}});
    //   console.log(liked)
    // })
