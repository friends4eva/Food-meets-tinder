const express = require('express')
const router = express.Router()
const request = require('request');

router.get('/', (req, res, next) => {
  const user = req.session.user;
  console.log(req.session.user)
  if (!user) return res.redirect('/');
  res.render('user', {user: user});
});

router.get('/me', (req, res, next) => {
  const url = 'https://graph.facebook.com/v2.2/me';
  const access_token = req.session.access_token;
  if (!access_token) return res.redirect('/');
  const options = {
    method: 'GET',
    url,
    headers: { 'Authorization' : `Bearer ${access_token}`}
  }
  request(options, (err, response, body) => {
    const user = JSON.parse(body);
    req.session.user = user;
    // return res.send(req.session.user)
    return res.redirect('/user');
  })
});

router.get('/permission', (req, res, next) => {
  const url = 'https://graph.facebook.com/v2.2/me';
  const access_token = req.session.access_token;
  if (!access_token) return res.redirect('/');
  const options = {
    method: 'GET',
    url,
    headers: { 'Authorization' : `Bearer ${access_token}`}
  }
  request(options, (err, response, body) => {
    const user = JSON.parse(body);
    req.session.user = user;
    return res.send(req.session.user)
    // return res.redirect('/user');
  })
});

module.exports = router;
