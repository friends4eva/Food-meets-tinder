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
      console.log(data);
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
