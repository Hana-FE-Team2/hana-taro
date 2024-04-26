// 카드 선택 애니메이션 기본 세팅
const CARD_COUNT = 22;
const SCROLL_SCOPE = 400;
let lastScroll;
let index;
$(document).ready(() => {
  index = CARD_COUNT - 1;
  $(`#${index}`).addClass("current-card");
  $(window).scrollTop(0);
});
// 스크롤 애니메이션
$(window).on("scroll", () => {
  let cardTranslate = parseInt($(".card").css("height").slice(0, -2)) * 3;
  let scroll = $(window).scrollTop();
  index = Math.floor(22 - scroll / SCROLL_SCOPE);
  if (index < 0 || index > 21) {
    return;
  }
  // console.log(index);
  // console.log($(".card").css("height"));
  // console.log("scroll:" + $(window).scrollTop());
  // console.log("index: " + index);
  if (scroll - lastScroll < 0) {
    let scale = $(".card").eq(0).css("transform");
    $(".card").eq(index).css("transform", `translateY(0px)`);
    $(".card")
      .eq(index - 1)
      .removeClass("current-card");
    $(".card").eq(index).addClass("current-card");
  } else {
    $(".card").eq(index).css("transform", `translateY(${cardTranslate}px)`);
    $(".card").eq(index).removeClass("current-card");
    $(".card")
      .eq(index - 1)
      .addClass("current-card");
  }

  // 스크롤 조정 필요
  // if (index < 0) {
  //   $(window).scrollTop(100);
  //   index = 0;
  // }
  lastScroll = scroll;
});

// 카드 선택 애니메이션
let count = 1;
$(document).on("click", ".current-card", (e) => {
  // console.log("카드 누르셨어요!");
  let id = e.target.id;
  let left = $(`#${id}`).css("left");
  let translateY;
  if (count == 1) {
    translateY = "-75%";
  } else if (count == 2) {
    translateY = "0%";
  } else if (count == 3) {
    translateY = "75%";
  }
  console.log(left);

  $(`#${id}`).removeClass("card current-card");
  $(`#${id}`).css("left", "0px");
  $(`#${id}`).addClass(`selected-card`);

  $(`#${id}`).css("transform", `translate(200%, ${translateY}) scale(0.4)`);

  count++;
});
