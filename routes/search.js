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

yelp.search({
  term: 'food',
  location: req.body.location
})
.then((data) => {
  console.log(data)
})


module.exports = router;
