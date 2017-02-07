//
let $price = undefined;
let $radius_filter = undefined;


$('li').on('click', function(evt){
  console.log($(this).attr('id'))
  $(this).toggleClass('selection')
  // console.log(`li ${this.attr('id')} clicked`)
})


const $search = $('#searchBttn');

$search.on('click', function(evt){
  const $input = {location: $("#locationInput").val()};
  $.post('/search', $input, ($input) => {
    console.log(data);
  })
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
    radius_filter: $radius_filter,
    // open_now: true,
    // deal_filter:
  };
  console.log($input);
  $.post('/search', $input, (data) => {
    console.log(data);
  })
})
