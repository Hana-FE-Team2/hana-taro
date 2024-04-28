// card와 관련된 js 파일

$(function () {
  $(document).on("mouseover", ".card-shuffle", function () {
    this.hoverTimeout = setTimeout(() => {
      makeShuffle();
    }, 2000);
  });

  $(document).on("click", "#shuffle-again", function () {
    $("#modal").fadeOut();
    makeShuffle();
  });

  $(document).on("mouseout", ".card-shuffle", function () {
    clearTimeout(this.hoverTimeout);
  });
});

/* 카드가 쌓여보이도록 조정하는 함수 */
const DISTANCE = [-275, -225, -175, -125];
const INTERVAL = [30, 25, 20, 15];

let spreadCard = (distance, interval) => {
  const SPEED = 25;

  for (let n = 0; n < CARD_COUNT; n++) {
    setTimeout(() => {
      for (let i = n; i < CARD_COUNT; i++) {
        $(`#${i}`).css("left", `${distance + n * interval}px`);
      }
    }, SPEED * (n + 1));
  }
};

/* spreadCard 간격 조정 함수 */
let controlCardIntervalByWitdh = () => {
  if (windowWidth > 1024) {
    spreadCard(DISTANCE[0], INTERVAL[0]);
  } else if (768 <= windowWidth && windowWidth <= 1023) {
    spreadCard(DISTANCE[1], INTERVAL[1]);
  } else if (576 <= windowWidth && windowWidth <= 767) {
    spreadCard(DISTANCE[2], INTERVAL[2]);
  } else {
    spreadCard(DISTANCE[3], INTERVAL[3]);
  }
};
let controlCardIntervalByHeight = () => {
  if (windowHeight > 640) {
    spreadCard(DISTANCE[0], INTERVAL[0]);
  } else if (541 <= windowHeight && windowHeight <= 640) {
    spreadCard(DISTANCE[1], INTERVAL[1]);
  } else if (420 <= windowHeight && windowHeight <= 540) {
    spreadCard(DISTANCE[2], INTERVAL[2]);
  } else {
    spreadCard(DISTANCE[3], INTERVAL[3]);
  }
};

/* 가로, 세로 창 크기 변화 변수 */
let lastWindowHeight;
let lastWindowWidth;
let windowWidth;
let windowHeight;

/* 첫 화면 로드, 사이즈 조정 시 카드 간격 조정 */
$(document).ready(() => {
  windowHeight = $(window).height();
  windowWidth = $(window).width();
  controlCardIntervalByWitdh();

  $(window).resize(() => {
    windowHeight = $(window).height();
    windowWidth = $(window).width();
    if (lastWindowHeight != windowHeight) {
      controlCardIntervalByHeight();
    }
    if (lastWindowWidth != windowWidth) {
      controlCardIntervalByWitdh();
    }
    lastWindowHeight = windowHeight;
    lastWindowWidth = windowWidth;
  });
});

// @장규은: 규은이도 카드 다 선택하면 모달을 띄워야 하는데 이 부분 참고하면 좋을 듯
// 대신 너는 open-modal-multi가 아니라 open-modal을 사용하면 될 것 같아
async function makeShuffle() {
  var random = Math.floor(Math.random() * 2);
  if (random == 0) {
    await shuffle1();
  } else {
    await shuffle2();
  }
  messages = ["카드를 다시 섞겠습니까.....?"];
  $("#open-modal-multi").click();
}

function shuffle1() {
  return new Promise((resolve) => {
    const card = document.querySelectorAll(".card");
    const SPEED = 100;
    const DISTANCE = 250;
    let maxTimeout = 0;

    for (let i = 0; i < card.length; i++) {
      setTimeout(() => {
        card[i].style.transform =
          i % 2 === 0
            ? `translate(${DISTANCE}px)`
            : `translate(-${DISTANCE}px)`;
      }, SPEED * i);
      maxTimeout = SPEED * i;
    }

    setTimeout(() => {
      for (let i = 0; i < card.length; i++) {
        setTimeout(() => {
          card[i].style.transform = "translate(0px)";
          if (i === card.length - 1) resolve();
        }, SPEED * i);
      }
    }, maxTimeout + SPEED);
  });
}

// Improved shuffle2 with async-await and promises
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
let shuffle2 = async () => {
  return new Promise(async (resolve) => {
    const SHUFFLE_NUM = 3; // 셔플 횟수
    const TIME = 750; // 셔플 애니메이션 시간
    const card = document.querySelectorAll(".card");
    for (let j = 0; j < SHUFFLE_NUM; j++) {
      for (let i = 0; i < card.length; i++) {
        let randomX = getRandom(-600, 600);
        let randomY = getRandom(-150, 150);
        let randomAngle = getRandom(-70, 70);
        setTimeout(() => {
          card[
            i
          ].style.cssText += `transform: rotate(${randomAngle}deg) translate(${randomX}px, ${randomY}px)`;
        }, TIME * (j + 1));
      }
    }

    setTimeout(() => {
      for (let i = 0; i < card.length; i++) {
        setTimeout(() => {
          card[
            i
          ].style.cssText += `transform: rotate(0deg) translate(0px, 0px)`;
          if (i === card.length - 1) resolve();
        }, TIME);
      }
    }, TIME * (SHUFFLE_NUM + 1));
  });
};

// 카드 선택 애니메이션을 위한 변수 선언
const CARD_COUNT = 22; // 타로 카드 갯수
const SCROLL_SCOPE = 400; // 이 변수 값을 통해 단위로 카드를 움직인다.
let index; // 스크롤을 통해 현재 카드를 저정하는 변수
let lastScroll; // 스크롤 UP / DOWN을 구별하기 위한 변수
let cnt = 0; // 클릭 이벤트 발생 횟수
const TRANSLATE = {
  // 선택한 카드를 오른쪽 상단부터 하나씩 나열하기 위한 변수
  x: "225%",
  y: ["-70%", "0%", "70%"],
};

// 카드 선택 애니메이션 기본 설정
$(document).ready(() => {
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

  $(`#${id}`).removeClass("current-card"); // 선택된 카드는 card, current-card 클래스를 지운다.
  $(`#${id}`).addClass(`selected-card`); // 선택된 카드는 selected-card 클래스를 부여한다.
  $(`#${id - 1}`).addClass("current-card"); // 선택된 카드의 다음 카드를 선택할 수 있도록 클래스 부여한다.
  $(window).scrollTop((CARD_COUNT - id - 1) * SCROLL_SCOPE + 100); // 선택된 카드의 다음 카드로 스크롤을 이동한다.

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

// 선택된 카드 배열
let selectedNum = []; // 카드 번호를 저장할 배열 선언
let selectedDir = []; // 카드 방향을 저장할 배열 선언

while (selectedNum.length < 3) {
  let randomNum = Math.floor(Math.random() * 22); // 0 ~ 21
  if (!selectedNum.includes(randomNum)) {
    // 이미 선택된 번호와 겹치지 않도록
    selectedNum.push(randomNum);
    selectedDir.push(Math.round(Math.random())); // 0 or 1
  }
}
// 배열 사용하실 땐 card_lists[selectedNum[0]].url 이런 식으로 index로 접근하시면 됩니다!
