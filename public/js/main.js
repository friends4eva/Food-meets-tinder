const $search = $('#searchBttn');

$search.on('click', function(evt){
  const $location = {location: $("#locationInput").val()};
  // const $restaurant = {restaurant: $('#restaurantInput').val()};
  // const $data = {
  //   restaurant: $restaurant,
  //   location: $location
  // }
  $.post('/search', $location, (data) => {
    console.log(data);
    $('body').append(data.businesses[0])
  })
})
