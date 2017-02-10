const $search_now_bttn = $('#search_now_Bttn');

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
    swipeRight();
    swipeLeft();
    $('#advanced-button').remove();
    $('#search_now_Bttn').remove();
    $('#hide').remove();
    $('#locationInput').remove();
  })
}

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

var count;

function swipe (evt) {
  var myElement = this;
  var swipeCard = new Hammer(myElement)
  var last = document.querySelectorAll('.card')
  count = last.length -1
  swipeCard.on("swipe", function(evt) {
    last[count].classList.toggle('hide')
    console.log('count', count)
    if (count === 0) {
      swipeCard.off("swipe", function(evt) {
      })
    }
  })
}

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
      // console.log('data to get the final countDOWNNN', '[', data, ']')
    })

  } else {
    count--;
    $.post('/search/likes', bizIdx, (data) => {
      console.log('liked!', data)
    })
  }
}

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
      // console.log('data to get the final countDOWNNN', '[', data, ']')
    })
  } else {
    count--;
    $.post('/search/likes', bizIdx, (data) => {
      console.log('disliked!!!', data)
    })
  }
}

function swipeRight(evt) {
  var myElement = this;
  var swipeCard = new Hammer(myElement)
  var last = document.querySelectorAll('.card')
  swipeCard.on("swiperight", function(evt) {
  addLike();
  })
}



function swipeLeft(evt) {
  var myElement = this;
  var swipeCard = new Hammer(myElement)
  var last = document.querySelectorAll('.card')
  swipeCard.on("swipeleft", function(evt) {
    addDislike();
  })
}

function hideCard(evt) {
  var card = $(this).parent();
  var listItem = card.parent();
  listItem.toggleClass('hide');
};

function checkBox(evt) {
  $(this).toggleClass('checked');
}

function deleteLikeItem(evt) {
  var exe = $(' ')
  $.delete('/search/delete', derete, (data) => {
    console.log('dereeted', data)
  })
}

//======E V E N T * L I S T E N E R S =======//
$search_now_bttn.on('click', searchFunc);
$('#adv_search_btn').on('click', searchFunc);
$('#deal').on('click', checkBox);
$('#open').on('click', checkBox);
