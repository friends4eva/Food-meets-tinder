const express = require('express')
const router = express.Router()
const request = require('request');

// var liked = {
//   name: 'mcdonalds',
//   price: '$',
//   img: "www.mcdonalds.com"
// example object sent to hbs}



router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('liked') //{liked:liked} example object to be sent to HBS
});

router.post('/', (req, res, next) => {
  res.send('showing results placeholder')
})

module.exports = router;
