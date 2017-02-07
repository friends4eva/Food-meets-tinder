const $search = $('#searchBttn');

//event listener for search button, when clicked
//does yelp api post request

$search.on('click', function(evt){
var $input = {location: $("#locationInput").val()};
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
      data.businesses.forEach(function(obj) {
      $('body').append('<li>' + obj.name + '</li>')
      })
     })
    return position;
    })
  } else {
      $.post('/search', $input, (data) => {
      data.businesses.forEach(function(obj) {
        // debugger;
      $('body').append('<li>' + obj.name + '</li>')
      })
    })
  }
})
