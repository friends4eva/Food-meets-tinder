const express = require('express');
const request = require('request');
const router = express.Router();
const Yelp = require('yelp');
const user = require('../models/user.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../db/config')

// Require models
// var User = require('../models/user')

// mongoose.connect('mongodb://localhost/food');


const yelp = new Yelp({
  consumer_key: process.env.YELP_CLIENT_ID,
  consumer_secret: process.env.YELP_CLIENT_SECRET,
  token: process.env.YELP_CLIENT_TOKEN,
  token_secret: process.env.YELP_CLIENT_TOKEN_SECRET
});



router.post('/', function(req, res, next){
  console.log("req from search.js*****", req.body);

  yelp.search({
    // location: req.body.location,
    term: 'food',
    // term: req.body.term,
    location: req.body.location,
    location: req.body.location,
    term: req.body.term,
    price: req.body.price,
    limit: 20
  })
  .then( data => {
    req.session.businesses = data.businesses;

  req.session.businesses.forEach(function(name){
    name.likes = 0;
    name.dislikes = 0;
  })

    var fb_name = req.session.user.name

    var fb_name = new user( {
      fb_id: req.session.user.id
    });

    let obj = undefined;

    res.send(data);

    for(var i=0; i<req.session.businesses.length;i++) {
      obj = {
        date: new Date(),
        name: req.session.businesses[i].name,
        rating: req.session.businesses[i].rating,
        mobile_url: req.session.businesses[i].mobile_url,
        rating_img_url: req.session.businesses[i].rating_img_url,
        url: req.session.businesses[i].url,
        snippet_text: req.session.businesses[i].snipper_text,
        yelp_id: req.session.businesses[i].id,
        location: req.session.businesses[i].location,
        likes: 0,
        dislikes: 0
      }
      fb_name.liked_businesses.push(obj);
    };
    fb_name.save();
    makeUser(req.session);
  })
  .catch((err)=>{
    console.log("err msg", err)
  })
})


router.get('/', function(req, res) {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('search', {user: user})
})

router.post('./likes', function(req, res) {
  User.find({fb_id: req.session.user.fb_id})
    .then( users => {
      var business = users[0];
      for (var i=0; i<business.liked_businesses.length; i++){
        if ( req.session.user.liked_businesses._id === business.liked_businesses[i]._id) {
          business.liked_businesses[i].likes += 1;
          business.save();
        }
      }
    })
  })
function makeUser (obj) {
  obj.search = {
    user: {
      fb_id: {},
      swiped_businesses: []
    }
  }
  var swiped = obj.search.user.swiped_businesses
  swiped.push('HELLO WORLD :::')
  console.log('SWIGGITY SWIPED', swiped)
}

router.get('/likes', function(req, res) {
  req.session.businesses[0].likes = 1
  console.log('WRECK SESH BIZ 0 likes', req.session.businesses[0].likes)
  res.send('LIKESSSS')
})


router.get('./dislikes', function(req, res) {
  User.find({fb_id: req.session.user.fb_id})
    .then( users => {
      var business = users[0];
      for (var i=0; i<business.liked_businesses.length; i++){
        if ( req.session.user.liked_businesses._id === business.liked_businesses[i]._id) {
          business.liked_businesses[i].likes += 1;
          business.save();
      }
    }
  })
})


module.exports = router

