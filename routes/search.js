
const express = require('express');
const request = require('request');
const router = express.Router();
const Yelp = require('yelp');
const user = require('../models/user.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/food');



const yelp = new Yelp({
  consumer_key: process.env.YELP_CLIENT_ID,
  consumer_secret: process.env.YELP_CLIENT_SECRET,
  token: process.env.YELP_CLIENT_TOKEN,
  token_secret: process.env.YELP_CLIENT_TOKEN_SECRET
});

// router.get('/', function(req, res){
//   res.send('hello')
// })

router.post('/', function(req, res){
  console.log(req.body)
  yelp.search({
    // location: req.body.location,
    term: 'food',
    // term: req.body.term,
    location: req.body.location,
    price: req.body.price,
    // radius_filter: req.body.radius_filter,
    open_now: true,
    deals_filter: true,
    limit: 20
  })
  .then((data)=>{
  // yelp.search.term += ', food';
  // console.log(yelp.search.term)
    req.session.businesses = data.businesses
    //data
        //businesses [] use forEach or similar to loop all results
    console.log('yelp bizzzzzz', data.businesses)

    var fb_name = req.session.user.name;

    var fb_name = new user( {
      fb_id: req.session.user.id
    });
    for(var i=0; i<req.session.businesses.length;i++) {
      let obj = {
        date: new Date(),
        name: req.session.businesses[i].name,
        rating: req.session.businesses[i].rating,
        mobile_url: req.session.businesses[i].mobile_url,
        rating_img_url: req.session.businesses[i].rating_img_url,
        url: req.session.businesses[i].url,
        snippet_text: req.session.businesses[i].snipper_text,
        yelp_id: req.session.businesses[i].id,
        location: req.session.businesses[i].location,
        liked: 0,
        dislike: 0
      }
      fb_name.liked_businesses.push(obj);
      fb_name.save();
    }
    res.send(data.businesses)
  })
})

// router.get('/results', function(req, res) {
//   res.render('results')
// })

router.get('/', function(req, res) {
  res.render('search')
})

module.exports = router

