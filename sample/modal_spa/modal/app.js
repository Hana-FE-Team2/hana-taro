$(function () {
  let nextButtonClickCount = 0;

  function openModal(messageList) {
    const modal = $('#modal');
    $.get('/modal.modal.html', function (data) {
      modal.modal.html(data);
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
  $('#openModal').on('click', function () {
    openModal(messages);
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

  // 모달 메시지의 글자 크기를 창 크기에 맞춰 조절
  $(window).resize(function () {
    var modalContentWidth = $('.modal-content').width();
    var modalContentHeight = $('.modal-content').height();
    var fontSize = Math.min(modalContentWidth, modalContentHeight) * 0.09;
    $('#modal-message').css('font-size', fontSize + 'px');
  });

  $(window).trigger('resize');
});

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
