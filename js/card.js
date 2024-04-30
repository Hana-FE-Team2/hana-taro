// card와 관련된 js 파일

// $(function () {
//   $(document).on('mouseover', '.card-shuffle', function () {
//     this.hoverTimeout = setTimeout(() => {
//       makeShuffle();
//     }, 2000);
//   });

//   $(document).on('click', '#shuffle-again', function () {
//     $('#modal').fadeOut();
//     makeShuffle();
//   });

//   $(document).on('mouseout', '.card-shuffle', function () {
//     clearTimeout(this.hoverTimeout);
//   });
// });
var changingWindowSize = false;
/* 카드가 쌓여보이도록 조정하는 함수 */
var DISTANCE = [-275, -225, -175, -125];
var INTERVAL = [30, 25, 20, 15];

var spreadCard = (distance, interval) => {
  const SPEED = 25;

  for (let n = 0; n < CARD_COUNT; n++) {
    setTimeout(() => {
      for (let i = n; i < CARD_COUNT; i++) {
        $(`#${i}`).css('left', `${distance + n * interval}px`);
      }
    }, SPEED * (n + 1));
  }
};

/* spreadCard 간격 조정 함수 */
var controlCardIntervalByWitdh = () => {
  if (changingWindowSize) {
    return;
  }
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
var controlCardIntervalByHeight = () => {
  if (changingWindowSize) {
    return;
  }
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
var lastWindowHeight;
var lastWindowWidth;
var windowWidth;
var windowHeight;

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

// 카드 선택 애니메이션을 위한 변수 선언
var CARD_COUNT = 22; // 타로 카드 갯수
var SCROLL_SCOPE = 400; // 이 변수 값을 통해 단위로 카드를 움직인다.
var index; // 스크롤을 통해 현재 카드를 저정하는 변수
var lastScroll; // 스크롤 UP / DOWN을 구별하기 위한 변수
var cnt = 0; // 클릭 이벤트 발생 횟수
var TRANSLATE = {
  // 선택한 카드를 오른쪽 상단부터 하나씩 나열하기 위한 변수
  x: '225%',
  y: ['-70%', '0%', '70%'],
};

// 선택된 카드 배열
var selectedNum = []; // 카드 번호를 저장할 배열 선언
var selectedDir = []; // 카드 방향을 저장할 배열 선언

while (selectedNum.length < 3) {
  var randomNum = Math.floor(Math.random() * 22); // 0 ~ 21
  if (!selectedNum.includes(randomNum)) {
    // 이미 선택된 번호와 겹치지 않도록
    selectedNum.push(randomNum);
    selectedDir.push(Math.round(Math.random())); // 0 or 1
  }
}
// 배열 사용하실 땐 card_lists[selectedNum[0]].url 이런 식으로 index로 접근하시면 됩니다!
