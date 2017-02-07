// BARRETT'S LOCATION FINDER

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
      console.log(data);
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
let $price = undefined;
let $radius_filter = undefined;


$('li').on('click', function(evt){
  console.log($(this).attr('id'))
  $(this).toggleClass('selection')
  // console.log(`li ${this.attr('id')} clicked`)
})


const $advSearchBtn = $('#advSearchBtn');

$advSearchBtn.on('click', function(evt){
  if(($('.budget.selection')).length === 0){
    $price = "1,2,3,4"
  } else {
    $price = $('.budget.selection')
  }

  if(($('#distance.selection')).length===0){
    $radius_filter = 0;
  } else {
    $radius_filter = $('#distance.selection')
  }


  const $input = {
    location: $("#locationInput").val(),
    // term: `food, ${$('#terms').val().split(' '|| ',').join(',')}`,
    term: `"food", "${$('#terms').val().split(' '|| ',').join('","')}"`,
    price: $price,
    radius_filter: $radius_filter
    // open_now: true,
    // deal_filter:
  };
  console.log($input);
  $.post('/search', $input, (data) => {
    console.log(data);
  })
})
