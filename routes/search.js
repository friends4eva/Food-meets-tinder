const Yelp = require('yelp');
const express = require('express');
const request = require('request');
const router = express.Router();

var yelp = new Yelp({
  consumer_key: process.env.YELP_CLIENT_ID,
  consumer_secret: process.env.YELP_CLIENT_SECRET,
  token: process.env.YELP_CLIENT_TOKEN,
  token_secret: process.env.YELP_CLIENT_TOKEN_SECRET
})


router.post('/', function(req, res, next){
  console.log(req.body)
  yelp.search({
    term: req.body.term,
    location: req.body.location,
    price: req.body.price,
    // TODO implement input fields to allow radius
    // radius_filter: req.body.radius_filter,
    open_now: true,
    deals_filter: true,
    limit: 3
  })
  .then((data)=>{
  // TODO add food back to default searches
  // yelp.search.term += ', food';
    req.session.businesses = data.businesses
  //NOTE data returned drills down to businesses as [] use forEach or similar to loop all results
    console.log('yelp bizzzzzz', data)
    res.send(data)
  })
  .catch(next)
})

router.get('/', function(req, res) {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('search', {user: user})
})

module.exports = router
