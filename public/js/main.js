
const $search_now_bttn = $('#search_now_Bttn');
// $search.on('click', function(evt){

function renderCard(result) {
  var listHeader =
    `
    <div class="container">
      <h1 class="col-md-7">we think you might like...</h1>
      <div class="col-md-5 col-md-offset-1">
      <ul style="list-style: none;" id="list-header" class="col-md-8 col-md-offset-1"></ul>
    `
  $('#search').append(listHeader);
  result.businesses.forEach(function(biz) {
    console.log(biz.name)
    var restaurantName = biz.name;
    var image = biz.image_url;
    var id = biz.id;
    var rating = biz.rating_img_url;
    var review = biz.snippet_text;
    var yelpUrl = biz.url;
      var html =
        `
        <li>
          <div id="${id}" class="card" style="position: absolute; width: 100%; background: #bdbdbd; text-align: center">
            <img class="card-img-top" style="width: 25%" src="${image}" alt="yelp image">
            <div class="card-block">
              <h4 class="card-title"><a href="${yelpUrl}">${restaurantName}</a></h4>
              <img src="${rating}">
              <p class="card-text">${review}</p>
              <a href="#" class="btn btn-primary btn-lg likeBtn">
                <span class="glyphicon glyphicon-thumbs-up"></span>
              </a>
              <p class="btn btn-primary btn-lg dislikeBtn">
                <span class="glyphicon glyphicon-thumbs-down"></span>
              </p>
            </div>
          </div>
        </li>
        `
      $('#list-header').append(html);
  })
}

const searchFunc = function(evt){
  var $input = {
    location: $("#locationInput").val(),
    term: `food, ${$('#term').val().split(' '|| ',').join(',')}`,
    price: $('#price').val()// ,
  };  //if input field is blank, searches current location
  console.log('clicked')
  console.log($input)
  if ($("#locationInput").val() === '') {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      $input.location = pos.lat + ',' + pos.lng;
    $.post('/search', $input, (data) => {

      renderCard(data);
      // inserting hammer here onto cards
      var myElement = document.querySelector('.card');

      var swipeCard = new Hammer(myElement);

      // // listen to events...
      swipeCard.on("swiperight swipeleft tap press", function(ev) {
          console.log(ev.type);
      });


      $('#advanced-button').remove();
      $('#hide').remove();
     })
    return position;
    })
  } else {
      $.post('/search', $input, (data) => {
        renderCard(data);
    })
  }
}


var checkAndLike = function(event) {
  console.log("HERE IS THE LIKE ID", $(this).closest('div.card').attr('id'));
  User.find().exec()
    .then( users => {
      for (var j=0; j<users.length; j++){
        if ( req.session.user.id === users.fb_id[j] ) {
          var businessArr = users[1];
          for (var i=0; i<businessArr.liked_businesses.length; i++){
            // if (req.session.businesses[i].id === businessArr.liked_businesses[i].id) {
            if ($(this).closest('div.card').attr('id') === businessArr.liked_businesses[i].id) {
              businessArr.liked_businesses[i].likes++;
              businessArr.save();
          } else {
              businessArr.liked_businesses.push(req.session.businesses[i])
              businessArr.liked_businesses[i].likes++;
              businessArr.save();
          }
        }
      }
    }
  })
}

var checkAndDislike = function(event) {
  console.log("HERE IS THE DISLIKE ID", $(this).closest('div.card').attr('id'));
  User.find().exec()
    .then( users => {
      for (var j=0; j<users.length; j++){
        if ( req.session.user.id === users.fb_id[j] ) {
          var business = users[1];
          for (var i=0; i<user.liked_businesses.length; i++){
            if (req.session.businesses[i].id === businessArr.liked_businesses[i].id) {
              businessArr.liked_businesses[i].dislikes++;
              businessArr.liked_businesses[i].dislikes.save();
          } else {
              businessArr.liked_businesses.push(req.session.businesses[i])
              businessArr.liked_businesses[i].dislikes++;
              businessArr.save()
          }
        }
      }
    }
  })
}


//event listener for search button, when clicked
//does yelp api post request
$search_now_bttn.on('click', searchFunc);
$('#adv_search_btn').on('click', searchFunc);

// event listeners for (dis/)like buttons
// should update (dis/)like counts on each business
$('.likeBtn').on('click', checkAndLike);
$('.dislikeBtn').on('click', checkAndDislike);

