// BARRETT'S LOCATION FINDER

const $search = $('#searchBttn');
const searchFunc = function(evt){
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
      var zIndex = 1;
      var listHeader =
      `
      <div class="container">
          <h1 class="col-md-7">we think you might like...</h1>
          <div class="col-md-5 col-md-offset-1">
          <ul style="list-style: none;" id="list-header" class="col-md-8 col-md-offset-1"></ul>
      `
      $('#search').append(listHeader);
      console.log(data);
      data.forEach(function(biz) {
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
              <a href="#" class="btn btn-primary btn-lg">
                <span class="glyphicon glyphicon-thumbs-up"></span>
              </a>
              <a href="#" class="btn btn-primary btn-lg">
                <span class="glyphicon glyphicon-thumbs-down"></span>
              </a>
            </div>
          </div>
        </li>
        `
      $('#list-header').append(html);
      zIndex++;
      })
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

// some request to get back every restaurant they liked
// and then append html for each to "liked" page

// const likedFunc = function(evt) {
//   $.get
//        blah blah
//   var html =
//   `
//    <li>
//     <div id="${id}" class="card" style="width: 85%; background: #bdbdbd; text-align: center">
//       <img class="card-img-top" style="width: 25%" src="${image}" alt="yelp image">
//       <div class="card-block">
//         <h4 class="card-title"><a href="${yelpUrl}">${restaurantName}</a></h4>
//         <p>${address}</p>
//         <p>${phoneNumber}</p>
//         <img src="${rating}" alt="rating">
//         <p class="card-text">${review}</p>
//       </div>
//     </div>
//    </li>
//   `
// }

//event listener for search button, when clicked
//does yelp api post request

$search.on('click', searchFunc);
$('#submit').on('click', searchFunc);


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
    term: `food, ${$('#terms').val().split(' '|| ',').join(',')}`,
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
