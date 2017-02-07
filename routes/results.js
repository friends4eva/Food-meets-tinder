const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/results', (req, res) => {
  res.render('results', 'hi')
})

module.exports = router
