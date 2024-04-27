$(function () {
  $(document).on('mouseover', '.card', function () {
    this.hoverTimeout = setTimeout(() => {
      makeShuffle();
    }, 2000);
  });

  $(document).on('click', '#shuffle-again', function () {
    $('#modal').fadeOut();
    makeShuffle();
  });

  $(document).on('mouseout', '.card', function () {
    clearTimeout(this.hoverTimeout);
  });
});

/* 카드가 쌓여보이도록 조정하는 함수 */
const DISTANCE = [-275, -225, -175, -125];
const INTERVAL = [30, 25, 20, 15];
let spreadCard = (distance, interval) => {
  for (let i = 0; i < $('.card').length; i++) {
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

async function makeShuffle() {
  var random = Math.floor(Math.random() * 2);
  if (random == 0) {
    await shuffle1();
  } else {
    await shuffle2();
  }
  messages = ['카드를 다시 섞겠습니까.....?'];
  // $('#open-modal').click();
  $('#open-modal-multi').click();
}

function shuffle1() {
  return new Promise((resolve) => {
    const card = document.querySelectorAll('.card');
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
          card[i].style.transform = 'translate(0px)';
          if (i === card.length - 1) resolve(); // Resolve when the last card is reset
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
    const card = document.querySelectorAll('.card');
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
          if (i === card.length - 1) resolve(); // Resolve when the last reset occurs
        }, TIME);
      }
    }, TIME * (SHUFFLE_NUM + 1));
  });
};
