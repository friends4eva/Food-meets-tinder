const express = require('express')
const router = express.Router()

router.get('/:id', (req, res, next) => {
  let yelpname = req.params.id
  let html = yelpname + ' USERS PAGE'
  res.send(html)
})

module.exports = router
