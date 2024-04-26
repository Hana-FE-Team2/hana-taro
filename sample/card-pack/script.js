// 좌우, 상하 화면 변경 감지
const CARD_PLATE_RATIO = 1.3; // 카드판 비율
const CARD_RATIO = 2.7; // 카드 크기 비율 (2.5~2.8이 적당한듯)
let windowWidth;
let windowHeight;
let windowRatio;
let lastWindowWidth;
let lastWindowHeight;
$(document).ready(() => {
  lastWindowWidth = $(window).width();
  lastWindowHeight = $(window).height();
  windowRatio = lastWindowHeight / lastWindowWidth;

  // 가로 > 세로 비율
  if (windowRatio <= CARD_PLATE_RATIO) {
    let height = $(window).height() / CARD_RATIO; // 화면 높이에 맞게 카드 크기 생성
    let width = height * (2 / 3);
    $(".card").css({
      width: `${width}px`,
      height: `${height}px`,
      // "max-width": "500px",
      // "max-height": "1000px",
    });
  } else {
    // 세로 > 가로 비율 ex) 모바일
    let height = $(window).width() / 2;
    let width = height * (2 / 3);
    $(".card").css({
      width: `${width}px`,
      height: `${height}px`,
    });
  }
});

$(window).resize(() => {
  windowHeight = $(window).height();
  windowWidth = $(window).width() / 2;
  windowRatio = windowHeight / windowWidth;
  // 상하 화면을 변경했을때
  // card_plate 비율을 넘어선 경우
  // 카드 크기 동일
  // card_plate 비율보다 작은 경우
  // scale 조정
  if (windowHeight != lastWindowHeight && windowRatio < CARD_PLATE_RATIO) {
    $(".cards-wrapper").css("transform", `scale(${windowHeight / 700})`);
  }
  // 좌우 화면을 변경했을때
  // card_plate 비율을 넘어선 경우
  // scale 조정
  // card_plate 비율보다 작은 경우
  // 카드 크기 동일
  if (windowWidth != lastWindowWidth) {
    if (windowRatio > CARD_PLATE_RATIO)
      $(".cards-wrapper").css("transform", `scale(${windowWidth / 600})`);
  }
});

for (let i = 0; i < $(".card").length; i++) {
  $(".card")
    .eq(i)
    .css({
      left: `${-200 + 20 * i}px`, // 카드가 쌓여보이도록 조정
    });
}
