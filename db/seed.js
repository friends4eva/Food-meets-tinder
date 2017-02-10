require('./config')
// Require models
var User = require('../models/user')

// router.get('/', function(req, res) {
//   const user = req.session.user;
//   if (!user) return res.redirect('/');
//   res.render('search', {user: user})
// })

// router.get('./likes', function(req, res) {
//   console.log('hi')
//   User.find({fb_id: req.session.user.fb_id})
//     .then( users => {
//       var business = users[0];
//       for (var i=0; i<business.liked_businesses.length; i++){
//         if ( req.session.user.liked_businesses._id === business.liked_businesses[i]._id) {
//           business.liked_businesses[i].likes += 1;
//           business.save();
//         }
//       }
//     })
//   })
// function makeUser (obj) {
//   obj.search = {
//     user: {
//       fb_id: {},
//       swiped_businesses: []
//     }
//   }
//   var swiped = obj.search.user.swiped_businesses
//   swiped.push('HELLO WORLD :::')
//   // console.log('SWIGGITY SWIPED', swiped)
// }

// router.get('/likes', function(req, res) {
//   req.session.businesses[0].likes = 1
//   // console.log('WRECK SESH BIZ 0 likes', req.session.businesses[0].likes)
//   res.send('LIKESSSS')
// })

// router.post('/likes', function(req, res) {
//   console.log('WRECK BODY', req.body)
//   obj = {
//     index: req.body.index,
//     likes: req.body.likes
//   }
//   var numbah = JSON.parse(req.body.index)
//   var choice = JSON.parse(req.body.likes)
//   if(choice === true) req.session.businesses[numbah].likes++;
//   else req.session.businesses[numbah].dislikes++;
//   console.log('TEST LIKES', req.session.businesses[numbah])
//   res.json(obj)
// })

// router.get('./dislikes', function(req, res) {
//   User.find({fb_id: req.session.user.id})
//     .then( users => {
//       var business = users[0];
//       for (var i=0; i<business.liked_businesses.length; i++){
//         if ( req.session.user.liked_businesses._id === business.liked_businesses[i]._id) {
//           business.liked_businesses[i].likes += 1;
//           business.save();
//       }
//     }
//   })
})

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

