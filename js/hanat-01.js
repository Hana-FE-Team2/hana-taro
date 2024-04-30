openedCard = [];
localStorage.clear();
playAudioWithStorage();
// 입움직임
window.onload = function () {
  setTimeout(function () {
    background.classList.add("clicked");
  }, 2000);
};

var messages = [
  "안녕하세요....\n하나타로에 오신것을 환영합니다....",
  "당신의 금전운을 알고 싶다면...\n수정구를 클릭해주세요....",
];
$(document).on("click", ".mainpage-magicball.magicball1", function (data) {
  $("#modal").fadeOut();
  loadNextContent("hanat-02.html");
});

// magicball js
var magicBall = document.querySelector(".magicball1");
// magicball에 마우스 올렸을 때
magicBall.addEventListener("mouseover", () => {
  magicBall.classList.add("magicball-hover");
});
// magicball에 마우스 나갔을 때
magicBall.addEventListener("mouseout", () => {
  magicBall.classList.remove("magicball-hover");
});

// mainpage-cards
var cards = document.querySelectorAll("#mainpage-cards");
var card = document.querySelectorAll(".mainpage-card");
var background = document.querySelector(".mainpage-background");
cards.forEach((ele) => {
  // 카드 클릭 시
  ele.addEventListener("click", () => {
    var clickedCard = document.querySelectorAll("#mainpage-cards.clicked");
    ele.classList.contains("clicked")
      ? ele.classList.remove("clicked")
      : ele.classList.add("clicked");
    // 카드를 4장 째 뒤집을 시
    if (clickedCard.length + 1 >= 4) {
      clickedCard.forEach((elem) => elem.classList.remove("clicked"));
      document
        .querySelector("#mainpage-cards.clicked")
        .classList.remove("clicked");
      messages = ["카드를 마음대로 만지지 말아주세요....."];
      $("#open-modal").click();
      background.classList.remove("clicked");
      background.classList.contains("clicked")
        ? background.classList.remove("clicked")
        : background.classList.add("clicked");
    }
  });
});
