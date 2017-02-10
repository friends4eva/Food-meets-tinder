const express = require('express')
const router = express.Router()
const request = require('request');

router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('likes') //{liked:liked} example object to be sent to HBS
});

router.post('/', (req, res, next) => {

  res.send('FINAL COUNTDOWN')
})



// var checkAndLike = function(event) {
//   console.log(user);
//   console.log("HERE IS THE LIKE ID", $(this).closest('div.card').attr('id'));
//   User.findOne({'fb_id': req.session.user.id}).exec()
//     console.log('')
//     .then( users => {
//       for (var j=0; j<users.length; j++){
//         if ( req.session.user.id === users.fb_id[j] ) {
//           var businessArr = users[1];
//           for (var i=0; i<businessArr.liked_businesses.length; i++){
//             // if (req.session.businesses[i].id === businessArr.liked_businesses[i].id) {
//             if ($(this).closest('div.card').attr('id') === businessArr.liked_businesses[i].id) {
//               businessArr.liked_businesses[i].likes++;
//               businessArr.save();
//           } else {
//               businessArr.liked_businesses.push(req.session.businesses[i])
//               businessArr.liked_businesses[i].likes++;
//               businessArr.save();
//           }
//         }
//       }
//     }
//   })
// }

// var checkAndDislike = function(event) {
//   console.log("HERE IS THE DISLIKE ID", $(this).closest('div.card').attr('id'));
//   User.find().exec()
//     .then( users => {
//       for (var j=0; j<users.length; j++){
//         if ( req.session.user.id === users.fb_id[j] ) {
//           var business = users[1];
//           for (var i=0; i<user.liked_businesses.length; i++){
//             if (req.session.businesses[i].id === businessArr.liked_businesses[i].id) {
//               businessArr.liked_businesses[i].dislikes++;
//               businessArr.liked_businesses[i].dislikes.save();
//           } else {
//               businessArr.liked_businesses.push(req.session.businesses[i])
//               businessArr.liked_businesses[i].dislikes++;
//               businessArr.save()
//           }
//         }
//       }
//     }
//   })
// }





module.exports = router;
