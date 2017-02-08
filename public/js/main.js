const $search = $('#searchBttn');

//event listener for search button, when clicked
//does yelp api post request
var $input = {location: $("#locationInput").val()};
$search.on('click', function(evt){
  //if input field is blank, searches current location
  if ($("#locationInput").val() === '') {
    document.querySelector('#locationInput').placeholder = 'current location'
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      $input.location = pos.lat + ',' + pos.lng;
    $.post('/search', $input, (data) => {
      console.log(data[0]);
      var restaurantName = data[0].name;
      var image = data[0].image_url;
      var id = data[0].id;
      var rating = data[0].rating_img_url;
      var review = data[0].snippet_text;
      var yelpUrl = data[0].url;
      var html = `
        <div class="container">
          <h1 class="col-md-7">we think you might like...</h1>
          <div class="col-md-5 col-md-offset-1">
            <div id="${id}" class="card" style="width: 100%; background: #bdbdbd; text-align: center">
              <img class="card-img-top" style="width: 25%" src="${image}" alt="yelp image">
              <div class="card-block">
                <h4 class="card-title"><a href="${yelpUrl}">${restaurantName}</a></h4>
                <img src="${rating}">
                <p class="card-text">$$</p>
                <p class="card-text">${review}</p>
                <a href="#" class="btn btn-primary btn-lg">
                  <span class="glyphicon glyphicon-thumbs-up"></span>
                </a>
                <a href="#" class="btn btn-primary btn-lg">
                  <span class="glyphicon glyphicon-thumbs-down"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        `
      $('#test').append(html);
     })
    return position;
    })
  } else {
      $.post('/search', $input, (data) => {
      console.log(data);
      $('body').append(data)
    })
  }
})
