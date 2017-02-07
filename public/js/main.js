const $search = $('#searchBttn');

$search.on('click', function(evt){
  const $location = {location: $("#locationInput").val()};
  // const $restaurant = {restaurant: $('#restaurantInput').val()};
  // const $data = {
  //   restaurant: $restaurant,
  //   location: $location
  // }
  $.post('/search', $location, (data) => {
    // console.log(data.businesses);
    // var req.session.businesses = data.businesses
    // $('body').append(data.businesses[0].name);
    // console.log(data.businesses[0].name);
    console.log(list)
  })
})
