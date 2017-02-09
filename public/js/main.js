
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

//     $.post('/search', $input, (data) => {
//       var listHeader =
//       `
//       <div class="container">
//           <h1 class="col-md-7">we think you might like...</h1>
//           <div class="col-md-5 col-md-offset-1">
//           <ul style="list-style: none;" id="list-header" class="col-md-8 col-md-offset-1"></ul>
//       `
//       $('#search').append(listHeader);
//       console.log(data);
//       data.forEach(function(biz) {
//       console.log(biz.name)
//       var restaurantName = biz.name;
//       var image = biz.image_url;
//       var id = biz.id;
//       var rating = biz.rating_img_url;
//       var review = biz.snippet_text;
//       var yelpUrl = biz.url;
//       var html =
//         `
//         <li>
//           <div id="${id}" class="card" style="position: absolute; width: 100%; background: #bdbdbd; text-align: center">
//             <img class="card-img-top" style="width: 25%" src="${image}" alt="yelp image">
//             <div class="card-block">
//               <h4 class="card-title"><a href="${yelpUrl}">${restaurantName}</a></h4>
//               <img src="${rating}">
//               <p class="card-text">${review}</p>
//               <a href="#" class="btn btn-primary btn-lg">
//                 <span class="glyphicon glyphicon-thumbs-up"></span>
//               </a>
//               <a href="#" class="btn btn-primary btn-lg">
//                 <span class="glyphicon glyphicon-thumbs-down"></span>
//               </a>
//             </div>
//           </div>
//         </li>
//         `
//       $('#list-header').append(html);
//       zIndex++;
//       })
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
$search_now_bttn.on('click', searchFunc);
$('#adv_search_btn').on('click', searchFunc);

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
    term: `food, restaurants, ${$('#terms').val().split(' '|| ',').join(',')}`,
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
