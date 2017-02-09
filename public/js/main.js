const $search_now_bttn = $('#search_now_Bttn');

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

function getCoords(){
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
    }
    var $input = {
    location: pos.lat + ',' + pos.lng,
    term: `food, ${$('#term').val().split(' '|| ',').join(',')}`,
    price: $('#price').val()
    };
    console.log($input)
    post($input);
  })
}

function post(obj) {
  $.post('/search', obj, (data) => {
    renderCard(data);
    swipe();
    $('#advanced-button').remove();
    $('#search_now_Bttn').remove();
    $('#hide').remove();
  })
}

const searchFunc = function(evt){

  if ($("#locationInput").val() === '') {
    getCoords()
  }
  else {
    var $input = {
    location: $("#locationInput").val(),
    term: `food, ${$('#term').val().split(' '|| ',').join(',')}`,
    price: $('#price').val()
    };
    post($input);
  }
}

function swipe (evt) {
  var myElement = this;
  console.log('my element', myElement);
  var swipeCard = new Hammer(myElement)
  var last = document.querySelectorAll('.card')
  var count = last.length - 1
  swipeCard.on("swipe", function(evt) {
    last[count].classList.toggle('hide')
    count--;
    console.log(evt.type)
    if (count === 0) {
      return console.log ('no more cards!')
    }
  })
}

$search_now_bttn.on('click', searchFunc);
$('#adv_search_btn').on('click', searchFunc);

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

