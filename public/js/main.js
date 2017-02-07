//

const $search = $('#searchBttn');

$search.on('click', function(evt){
  const $input = {location: $("#locationInput").val()};
  $.post('/search', $input, ($input) => {
    console.log(data);
  })
})
