// BARRETT'S LOCATION FINDER

const $search = $('#searchBttn');

//event listener for search button, when clicked
//does yelp api post request

$search.on('click', function(evt){
var $input = {location: $("#locationInput").val()};
  //if input field is blank, searches current location
  console.log('clicked')
  if ($("#locationInput").val() === '') {
    // document.querySelector('#locationInput').placeholder = 'current location'
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


// MIBLEE'S BROKE AF ADVANCED SEARCH FILTERS
let $price = $('#price').val();
let $radius_filter = $('#radius').val();


const $advSearchBtn = $('#advSearchBtn');

$advSearchBtn.on('click', function(evt){
  const $input = {
    location: $("#locationInput").val(),
    term: `food, $($('#terms').val().split(' '|| ',').join(','))`,
    price: $('.budget.selection'),
    radius_filter: $('#distance.selection')||null//,
    // open_now: ,
    // deal_filter:
  };
  $.get('/search', (data) => {
    console.log(data);
  })
})

