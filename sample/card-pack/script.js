/* 카드가 쌓여보이도록 조정하는 함수 */
const DISTANCE = [-275, -225, -175, -125];
const INTERVAL = [30, 25, 20, 15];
let spreadCard = (distance, interval) => {
  for (let i = 0; i < $(".card").length; i++) {
    $(`#${i}`).css({
      left: `${distance + interval * i}px`,
    });
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
