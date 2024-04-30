playAudioWithStorage();
$(document).on("click", "#tohome", function (data) {
  $("#modal").fadeOut();
  localStorage.clear;
  window.location.reload();
});
$(document).on("click", "#tohanat-02", function (data) {
  $("#modal").fadeOut();
  messages = [
    "정신을 집중해서 카드에 손을 올려주세요.....\n손을 올리면 카드를 섞습니다.....",
  ];
  loadNextContent("hanat-02.html");
});
var cardbox = document.querySelectorAll(".card-box-frame");
cardbox.forEach((ele, idx) => {
  ele.children[0].style.backgroundImage = `url(${
    card_lists[selectedNum[idx]].url
  })`;
  if (selectedDir[idx] == 1) {
    ele.children[0].style.transform = "rotate(180deg)";
  }
});
var descriptionBox = document.querySelectorAll(".description-box-frame");
descriptionBox.forEach((ele, idx) => {
  ele.children[0].innerText =
    card_lists[selectedNum[idx]].description[selectedDir[idx]];
});
var rotateArr = [];
for (let i = 0; i < selectedDir.length; i++) {
  if (selectedDir[i] == 1) {
    rotateArr.push("rotate(180deg)");
  } else {
    rotateArr.push("rotate(0deg)");
  }
}
$("#past-img").attr("src", `${card_lists[selectedNum[0]].url}`);
$("#past-img").css("transform", `${rotateArr[0]}`);
$("#current-img").attr("src", `${card_lists[selectedNum[1]].url}`);
$("#current-img").css("transform", `${rotateArr[1]}`);
$("#future-img").attr("src", `${card_lists[selectedNum[2]].url}`);
$("#future-img").css("transform", `${rotateArr[2]}`);

$("#past-text").html(card_lists[selectedNum[0]].description[selectedDir[0]]);
$("#current-text").html(card_lists[selectedNum[1]].description[selectedDir[1]]);
$("#future-text").html(card_lists[selectedNum[2]].description[selectedDir[2]]);
