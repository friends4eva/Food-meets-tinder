//========GLOBAL VARIABLES======

const $search_now_bttn = $('#search_now_Bttn');
//global variable used by the swipe functions that counts
//the number of cards
var count;

//=========FUNCTIONS=======

//renders all 20 cards based off of yelp search results
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
    // console.log(biz.name)
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
            ${num} of 20<br>
            <img class="card-img-top img-rounded" style="width: 25%" src="${image}" alt="yelp image">
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
      num--;
  })
  $('.dislike').on('click', hideCard);
  $('.dislike').on('click', addDislike);
  $('.like').on('click', hideCard);
  $('.like').on('click', addLike);
}

//finds current location and performs $.post with the coordinates
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

//performs post request with the obj as an argument to be sent as data
function post(obj) {
  $.post('/search', obj, (data) => {
    renderCard(data);
    swipe();
    swipeRight();
    swipeLeft();
    $('#advanced-button').remove();
    $('#search_now_Bttn').remove();
    $('#hide').remove();
    $('#locationInput').remove();
  })
}

//performs api request to yelp based off of location input
const searchFunc = function(evt){
  if ($("#locationInput").val() === '') {
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

//event listener for any swipe, and sets the counter
function swipe (evt) {
  var myElement = this;
  var swipeCard = new Hammer(myElement)
  var last = document.querySelectorAll('.card')
  count = last.length -1
  swipeCard.on("swipe", function(evt) {
    last[count].classList.toggle('hide')
    if (count === 0) {
      swipeCard.off("swipe", function(evt) {
      })
    }
  })
}

//performs post requests to add likes to businesses
function addLike() {
  var bizIdx = {
    index: count,
    likes: true
  };
  if (count === 0) {
    $.post('/search/likes', bizIdx, (data) => {
      console.log('liked! now calculating results..', data)
    })
    $.post('/likes', (data) => {
      document.documentElement.innerHTML = data
    })
    $.post('/search/save', (data) => {
      console.log(data)
    })
  } else {
    count--;
    $.post('/search/likes', bizIdx, (data) => {
    })
  }
}

//performs post requests to add dislikes to businesses
function addDislike() {
  var bizIdx = {
    index: count,
    likes: false
  };
  if (count === 0) {
    $.post('/search/likes', bizIdx, (data) => {
      console.log('disliked, now calculating results...', data)
    })
    $.post('/likes', (data) => {
      document.documentElement.innerHTML = data
    })
    $.post('/search/save', (data) => {
      console.log(data)
    })
  } else {
    count--;
    $.post('/search/likes', bizIdx, (data) => {
    })
  }
}

//event listener that calls addLikes when swiped right
function swipeRight(evt) {
  var myElement = this;
  var swipeCard = new Hammer(myElement)
  var last = document.querySelectorAll('.card')
  swipeCard.on("swiperight", function(evt) {
    addLike();
  })
}

//event listener that calls addDislikes when swiped left
function swipeLeft(evt) {
  var myElement = this;
  var swipeCard = new Hammer(myElement)
  var last = document.querySelectorAll('.card')
  swipeCard.on("swipeleft", function(evt) {
    var bizIdx = {
      index: count,
      likes: false
    };
    if (count === 0) {
      $.post('/search/likes', bizIdx, (data) => {
        console.log('disliked!!!', data)
      })
      $.post('/likes', (data) => {
          document.documentElement.innerHTML = data
        // console.log('data to get the final countDOWNNN', '[', data, ']')
      })

      swipeCard.off("swipe", function(evt) {
        return console.log('swiping disabled')
      })
    } else {
      count--;
      $.post('/search/likes', bizIdx, (data) => {
        console.log('disliked!!!', data)
      })
    }
    addDislike();
  })
}

//toggles hide class to cards
function hideCard(evt) {
  var card = $(this).parent();
  var listItem = card.parent();
  listItem.toggleClass('hide');
};

function checkBox(evt) {
  $(this).toggleClass('checked');
}

var exe = $('#deleteBtn')

function deleteLikeItem(evt) {
  var nameClass = $(evt.target).attr('class')
  console.log(nameClass)
  var obj = {yelp_id: nameClass}
  $.post('/search/delete', obj, (data) => {
//     console.log('dereeted')
  })
}

exe.on('click', deleteLikeItem)

//======E V E N T * L I S T E N E R S =======//
$search_now_bttn.on('click', searchFunc);
$('#adv_search_btn').on('click', searchFunc);
$('#deal').on('click', checkBox);
$('#open').on('click', checkBox);
