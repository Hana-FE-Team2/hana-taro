$(document).on('click', '#tohome', function (data) {
  $('#modal').fadeOut();
  loadNextContent('hanat-01.html');
});
$(document).on('click', '#tohanat-02', function (data) {
  $('#modal').fadeOut();
  loadNextContent('hanat-02.html');
});
var cardbox = document.querySelectorAll('.card-box-frame');
cardbox.forEach((ele, idx) => {
  ele.children[0].style.backgroundImage = `url(${
    card_lists[selectedNum[idx]].url
  })`;
  console.log(selectedNum[idx]);
  console.log(selectedNum);
  if (selectedDir[idx] == 1) {
    ele.children[0].style.transform = 'rotate(180deg)';
  }
});
var descriptionBox = document.querySelectorAll('.description-box-frame');
descriptionBox.forEach((ele, idx) => {
  ele.children[0].innerText =
    card_lists[selectedNum[idx]].description[selectedDir[idx]];
});
