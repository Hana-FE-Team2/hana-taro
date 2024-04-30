var messages = ["카드를 스크롤해서\n원하는 카드 세장을 선택해주세요....."];
// 카드 선택 애니메이션 기본 설정
$(document).ready(() => {
  playAudioWithStorage();
  $(window).scrollTop(0); // 첫 화면은 스크롤이 0부터 시작한다.
  index = CARD_COUNT - 1; // index는 21부터 시작한다.
  $(`#${index}`).addClass("current-card"); // 첫 index에 클릭할 수 있는 클래스 지정
  $(".scroll").css("height", `${SCROLL_SCOPE * (CARD_COUNT + 2)}`); // 2를 더해 여유있는 스크롤 범위를 주면서 마지막 카드도 스크롤이 가능하게 한다.
});

// 스크롤 애니메이션 (스크롤 영역에 맞는 index로 동작)
$(window).on("scroll", () => {
  // let cardTranslate = parseInt($(".card").css("height").slice(0, -2)) * 5; // 반응형을 위한 카드 이동 값 설정 변수
  let scroll = $(window).scrollTop();
  index = Math.floor(CARD_COUNT - scroll / SCROLL_SCOPE) - 1; // 스크롤 범위에 따라 카드를 선택할 수 있는 index 설정

  if (scroll - lastScroll < 0) {
    // 스크롤 UP
    // 인덱스 범위를 벗어난 경우 실행하지 않는다.
    if (index < 0) {
      return;
    }

    $(".card").eq(index).removeClass("scroll-card"); // 카드를 위로 올림
    $(".card")
      .eq(index - 1)
      .removeClass("current-card"); // 이전 카드를 선택할 수 없도록 설정
    $(".card").eq(index).addClass("current-card"); // 올린 카드를 선택할 수 있도록 설정
  } else {
    // 스크롤 DOWN
    $(".card")
      .eq(index + 1)
      .addClass("scroll-card"); // 카드를 아래로 내림
    $(".card").eq(index).addClass("current-card"); // 다음 카드를 선택할 수 있도록 설정
    $(".card")
      .eq(index + 1)
      .removeClass("current-card"); // 내린 카드를 선택할 수 없도록 설정
  }
  lastScroll = scroll;
});

// 카드 선택 애니메이션 (e.target.id로 동작)
$(document).on("click", ".current-card", (e) => {
  let id = e.target.id; // 클릭 이벤트가 발생한 카드 번호

  if ($(`#${id}`).hasClass("selected-card")) {
    // 이미 선택된 카드가 클릭된다면 아무 이벤트가 발생하지 않는다.
    return;
  }
  if (cnt >= 3) {
    return;
  }

  $(`#${id}`).removeClass("current-card"); // 선택된 카드는 card, current-card 클래스를 지운다.
  $(`#${id}`).addClass(`selected-card`); // 선택된 카드는 selected-card 클래스를 부여한다.
  $(`#${id - 1}`).addClass("current-card"); // 선택된 카드의 다음 카드를 선택할 수 있도록 클래스 부여한다.
  $(window).scrollTop((CARD_COUNT - id - 1) * SCROLL_SCOPE + 100); // 선택된 카드의 다음 카드로 스크롤을 이동한다.
  changingWindowSize = true;

  $(`#${id}`).css({
    // 선택된 카드를 이동시키는 애니메이션
    left: "0px",
    transform: `translate(${TRANSLATE.x}, ${TRANSLATE.y[cnt]}) scale(0.5)`,
  });
  cnt++;
  // 3번의 클릭이 발생했다면 다음 화면으로 이동할 수 있도록 모달을 띄운다.
  if (cnt == 3) {
    $(`#${index}`).removeClass("current-card"); // 더 이상의 카드를 선택할 수 없도록 지정
    setTimeout(() => {
      // 약 2초 후 모달을 띄운다.
      messages = ["다 뽑으셨다면 설명을 해드리죠....."];
      $("#open-modal").click();
    }, 2000);
  }
});

$(document).on("click", "#next-modal", function () {
  if (cnt == 3) {
    changingWindowSize = false;
    $("#modal").fadeOut();
    loadNextContent("hanat-04.html");
    cnt = 0;
  }
});
