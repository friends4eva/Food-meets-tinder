
const express = require('express');
const request = require('request');
const router = express.Router();
const Yelp = require('yelp');

const yelp = new Yelp({
  consumer_key: process.env.YELP_CLIENT_ID,
  consumer_secret: process.env.YELP_CLIENT_SECRET,
  token: process.env.YELP_CLIENT_TOKEN,
  token_secret: process.env.YELP_CLIENT_TOKEN_SECRET
});

// router.get('/', function(req, res){
//   res.send('hello')
// })

// router.post('/', function(req, res){
//   // let termArr = req.body.
//   yelp.search({
//     term: "food",
//     location: req.body.location,
//     open_now: true,
//   })
//   .then((data)=>{
//     console.log(data)
//   })
//   res.send('data')
// })

router.post('/', function(req, res){
  console.log(req.body)
  yelp.search({
    location: req.body.location,
    // term: 'clothes'
    term: req.body.term,
    location: req.body.location,
    price: req.body.price,
    // radius_filter: req.body.radius_filter,
    open_now: true,
    deals_filter: true,
    limit: 3
  })
  .then((data)=>{
  // yelp.search.term += ', food';
  // console.log(yelp.search.term)
    req.session.businesses = data.businesses
    //data
        //businesses [] use forEach or similar to loop all results
    console.log('yelp bizzzzzz', data.businesses[0].name)
  res.send(data)
  })
  // .then((data) => {

  // })
  .catch(err) => {
    console.log(err);
  }
})

// router.get('/results', function(req, res) {
//   res.render('results')
// })

router.get('/', function(req, res) {
  res.render('search')
})

module.exports = router

