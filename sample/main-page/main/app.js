function loadNextContent(nextPage) {
  $.get(nextPage, function (data) {
    $('body').html(data);
  });
}
