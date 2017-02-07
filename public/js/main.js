//
const $search = $('#searchBttn');

$search.on('click', (event) => {
  const $input = $('#locationInput').val();
  $.post('/search', {location: $input}, (data) => {
console.log(data);
  })
})
