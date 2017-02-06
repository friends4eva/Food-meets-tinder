const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  let html = "👍 / 👎"
  res.render('swipe')
})

router.get('/results', (req, res, next) => {
  let results ={
            "mobile_url": "https://m.yelp.com/biz/101-noodle-express-arcadia?adjust_creative=E5e_-Bf9bN0nwj-LcaG7gQ&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=E5e_-Bf9bN0nwj-LcaG7gQ",
            "rating_img_url": "https://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png",
            "review_count": 417,
            "name": "101 Noodle Express",
            "rating_img_url_small": "https://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png"
          };

  // let obj = JSON.parse(results)

  let html = results.name
  res.send(html)
})

module.exports = router
