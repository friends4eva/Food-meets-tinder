//
// $('li').each(function(idx){
//   $('li').index(idx).on('click', function(evt){
//   })
// })

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
  const $input = {
    location: $("#locationInput").val(),
    term: `food, ${$('#terms').val().split(' '|| ',').join(',')}`,
    price: $('.budget.selection'),
    radius_filter: $('#distance.selection'),//||null,
    // open_now: true,
    // deal_filter:
  };
  $.post('/search', $input, (data) => {
    console.log(data);
  })
})
