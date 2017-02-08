const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('results');
});

router.post('/', (req, res) => {
  res.render('results')
});

module.exports = router
