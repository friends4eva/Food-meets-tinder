
const $search = $('#searchBttn');
// $search.on('click', function(evt){

const searchFunc = function(evt){
var $input = {location: $("#locationInput").val()};
  //if input field is blank, searches current location
  console.log('clicked')
  if ($("#locationInput").val() === '') {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      $input.location = pos.lat + ',' + pos.lng;
    $.post('/search', $input, (data) => {
      console.log(data.businesses[0]);
      var restaurantName = data.businesses[0].name;
      var image = data.businesses[0].image_url;
      var id = data.businesses[0].id;
      var rating = data.businesses[0].rating_img_url;
      var review = data.businesses[0].snippet_text;
      var yelpUrl = data.businesses[0].url;
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
      $('#search').append(html);
      $('#advanced-button').remove();
      $('#hide').remove();
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
}

//event listener for search button, when clicked
//does yelp api post request

$search.on('click', searchFunc);
$('#submit').on('click', searchFunc);

// Bao(test) this will save to the database
// var likebutton = ();
// var dislikebutton = ();

// var results = [];
// var counter = 0

// likebutton.on('click', (event) => {
//   counter++
//   results.push();
//   this.css('display', 'none');
//   if(counter = 20) {
//     results.save();
//   }
// })

// dislikebutton.on('click', (event) => {
//   counter++
//   this.css('display', 'none');
// })

// // Going to the Search Page
// const $searchPage = $('#searchButton');

// $searchPage.on('click', (event) => {
//   window.location.href = '/search';
// })

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

