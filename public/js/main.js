const $search_now_bttn = $('#search_now_Bttn');

const $thumbDown = $('#dumbsUp')
const $thumbUp = $('#dumbsDown')
// $search.on('click', function(evt)

function renderCard(result) {
  var listHeader =
    `
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" style="text-align: center">
      <p style="font-size: 24px; margin-left: 5%">we think you might like...</p>
      <ul style="list-style: none; padding-left: 0" id="list-header"></ul>
      </div>
    `
  var num = 20;
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
          <div id="${id}" class="card" style="border-radius: 10px; position:absolute; max-width: 100%; background: #bdbdbd; text-align: center; border: 2px solid #654321">
            card ${num} of 20<br>
            <img class="card-img-top img-rounded" style="width: 25%" src="${image}" alt="yelp image">
            <div class="card-block">
              <h4 class="card-title"><a href="${yelpUrl}">${restaurantName}</a></h4>
              <img src="${rating}">
              <p class="card-text">${review}</p>
<<<<<<< HEAD
              <a href="#" class="btn btn-primary btn-lg">
                <span id='dumbsUp' class="glyphicon glyphicon-thumbs-up"></span>
              </a>
              <a href="#" id="dizLike" class="btn btn-primary btn-lg">
               <span id='dumbsDown' class="glyphicon glyphicon-thumbs-down"></span>
             </a>
=======
              <button class="dislike btn btn-primary btn-lg">
                <span class="glyphicon glyphicon-thumbs-down"></span>
              </button>
              <button class="like btn btn-primary btn-lg">
                <span class="glyphicon glyphicon-thumbs-up"></span>
              </button>
>>>>>>> fa7bf693919ba271c38a1547845c7c5acc35a164
            </div>
          </div>
        </li>
        `
      $('#list-header').append(html);
      num--;
  })
  $('.dislike').on('click', hideCard);
  $('.like').on('click', hideCard);
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
<<<<<<< HEAD
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
    getCoords()
  } else {
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

var hideCard = function(evt) {
  var card = $(this).parent();
  var listItem = card.parent();
  console.log(listItem)
  listItem.toggleClass('hide');
};

// TODO:
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
//         <img src="${rating}" alt="rating">
//         <p class="card-text">${review}</p>
//       </div>
//     </div>
//    </li>
//   `
// }

//event listener for search button, when clicked
//does yelp api post request


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



$thumbUp.on('click', (event) => {
  $.post('/search/likes', data, (data) => {
    console.log(data);
  });
});

$thumbDown.on('click', (event) => {
  $.post('/search/likes', data, (data) => {
    console.log(data);
  });
});
