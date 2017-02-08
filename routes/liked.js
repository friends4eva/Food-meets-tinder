const express = require('express')
const router = express.Router()
const request = require('request');

router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('liked')
});

router.post('/', (req, res, next) => {
  res.send('showing results placeholder')
})

module.exports = router;
