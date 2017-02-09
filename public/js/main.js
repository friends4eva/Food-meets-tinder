const $search_now_bttn = $('#search_now_Bttn');
// $search.on('click', function(evt){

  function renderCard(result) {
    var listHeader =
      `
        <div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-2" style="text-align: center">
        <p style="font-size: 14px; margin-left: 5%">we think you might like...</p>
        <ul style="list-style: none; text-align: center" id="list-header"></ul>
        </div>
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
          <li style="margin-left: -25%">
            <div id="${id}" class="card" style="position:absolute; width: 100%; background: #bdbdbd; text-align: center">
              <img class="card-img-top" style="width: 25%" src="${image}" alt="yelp image">
              <div class="card-block">
                <h4 class="card-title"><a href="${yelpUrl}">${restaurantName}</a></h4>
                <img src="${rating}">
                <p class="card-text">${review}</p>
                <button class="dislike btn btn-primary btn-lg">
                  <span class="glyphicon glyphicon-thumbs-down"></span>
                </button>
                <button class="like btn btn-primary btn-lg">
                  <span class="glyphicon glyphicon-thumbs-up"></span>
                </button>
              </div>
            </div>
          </li>
          `
        $('#list-header').append(html);
    })
    $('.dislike').on('click', hideCard);
    $('.like').on('click', hideCard);
    $('#advanced-button').remove();
    $('#hide').remove();
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

// =============
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
// >>>>>>> 55f3551bc30407cda8e26bc8a7a8edf70754a3a6
     })
    return position;
    })
  } else {
      $.post('/search', $input, (data) => {
        renderCard(data);
    })
  }
}

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

