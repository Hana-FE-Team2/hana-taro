$(function () {
  let nextButtonClickCount = 0;

  function openModal(messageList) {
    const modal = $('#modal');
    $.get('modal.html', function (data) {
      modal.html(data);
      const messageText = messageList[nextButtonClickCount];
      const messageTextWithBr = messageText.replace(/\n/g, '<br>');

      $('#modal-message').html(messageTextWithBr);

      animateLetters($('#modal-message'));

      modal.fadeIn();
    });
  }

  function openModalMulti(messageList) {
    const modal = $('#modal');
    $.get('modal-multi.html', function (data) {
      modal.html(data);
      const messageText = messageList[nextButtonClickCount];
      const messageTextWithBr = messageText.replace(/\n/g, '<br>');

      $('#modal-message').html(messageTextWithBr);

      animateLetters($('#modal-message'));

      modal.fadeIn();
    });
  }

  setTimeout(function () {
    openModal(messages);
  }, 2000);

  // 모달 열기 버튼 클릭 시
  $('#open-modal').on('click', function () {
    openModal(messages);
    nextButtonClickCount = 0;
  });

  $('#open-modal-multi').on('click', function () {
    openModalMulti(messages);
    nextButtonClickCount = 0;
  });

  // 다음 메시지 버튼 클릭 시
  $(document).on('click', '#nextModal', function () {
    nextButtonClickCount++;

    if (nextButtonClickCount >= messages.length) {
      setTimeout(function () {
        $('#modal').fadeOut();
      }, 500);
      return;
    }

    const messageText = messages[nextButtonClickCount];
    const messageTextWithBr = messageText.replace(/\n/g, '<br>');

    $('#modal-message').html(messageTextWithBr);

    animateLetters($('#modal-message'));
  });

  $(document).on('click', '#shuffle-again', function () {
    $('#modal').fadeOut();
    makeShuffle();
  });

  $(document).on('click', '#move-next-page', function () {
    $('#modal').fadeOut();
    loadNextContent('index.html');
  });

  $(document).on('mouseover', '.card', function () {
    this.hoverTimeout = setTimeout(() => {
      makeShuffle();
    }, 2000);
  });

  $(document).on('mouseout', '.card', function () {
    clearTimeout(this.hoverTimeout);
  });

  // 모달 메시지의 글자 크기를 창 크기에 맞춰 조절
  $(window).resize(function () {
    var modalContentWidth = $('.modal-content').width();
    var modalContentHeight = $('.modal-content').height();
    var fontSize = Math.min(modalContentWidth, modalContentHeight) * 0.09;
    $('#modal-message').css('font-size', fontSize + 'px');
  });

  $(window).trigger('resize');
});

function loadNextContent(nextPage) {
  $.get(nextPage, function (data) {
    $('body').html(data);
  });
}

// 모달에 띄울 메시지 애니메이션
function animateLetters(element) {
  var text = element.html();
  var letters = text.split('');
  element.empty();

  var index = 0;

  while (index < letters.length) {
    var letter = letters[index];

    if (letter === '<') {
      var tag = '';
      while (letters[index] !== '>') {
        tag += letters[index];
        index++;
      }
      tag += '>';
      index++;
      element.append(tag);
    } else {
      $('<span>')
        .text(letter)
        .hide()
        .appendTo(element)
        .delay(100 * index)
        .fadeIn(500);
      index++;
    }
  }
}

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
    $('.card').css({
      width: `${width}px`,
      height: `${height}px`,
      // "max-width": "500px",
      // "max-height": "1000px",
    });
  } else {
    // 세로 > 가로 비율 ex) 모바일
    let height = $(window).width() / 2;
    let width = height * (2 / 3);
    $('.card').css({
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
    $('.cards-wrapper').css('transform', `scale(${windowHeight / 700})`);
  }
  // 좌우 화면을 변경했을때
  // card_plate 비율을 넘어선 경우
  // scale 조정
  // card_plate 비율보다 작은 경우
  // 카드 크기 동일
  if (windowWidth != lastWindowWidth) {
    if (windowRatio > CARD_PLATE_RATIO)
      $('.cards-wrapper').css('transform', `scale(${windowWidth / 600})`);
  }
});

for (let i = 0; i < $('.card').length; i++) {
  $('.card')
    .eq(i)
    .css({
      left: `${-200 + 20 * i}px`, // 카드가 쌓여보이도록 조정
    });
}

async function makeShuffle() {
  var random = Math.floor(Math.random() * 2);
  if (random == 0) {
    await shuffle1();
  } else {
    await shuffle2();
  }
  messages = ['카드가 섞였습니다.'];
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
