const express = require('express')
const router = express.Router()
const request = require('request');
const User = require('../models/User')

router.get('/', (req, res, next) => {
  const user = req.session.user;
    if (!user) return res.redirect('/');

    var all_da_likes = [];
    User.find({fb_id: user.id})
      .then( (users) => {
        var business = users[0].liked_businesses;
        for(var i = 0; i <business.length; i++){
          if (business[i].likes > 0){
            all_da_likes.push(business[i])
          }
        }
       res.render('likes', { db: all_da_likes})
      })
});

//creates array of filtered businesses with likes
router.post('/', (req, res, next) => {
  var likes = req.session.businesses.filter(function(index) {
    return (index.likes > 0)
  });
  req.session.likes = likes;
  res.redirect('/likes/results')
})

router.post('/delete/:id', (req, res) => {
  yelpId = req.params.id
  User.find({fb_id: req.session.user.id})
    .then( (users) => {
      var business = users[0];
      for (var i = 0; i < business.liked_businesses.length; i++) {
        if (yelpId === business.liked_businesses[i].yelp_id) {
          console.log('trying to remove', business.liked_businesses[i])
          business.liked_businesses[i].remove()
          business.save()
        }
      }
    res.send('deleted')
  })
})

// THIS IS THE RESULTS RENDERING

router.get('/results', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('likes', {user:req.session.likes})
})

module.exports = router;
