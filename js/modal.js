// 모달과 관련된 js 파일

$(function () {
  // 메시지 수를 파악하기 위한 변수
  let nextButtonClickCount = 0;

  // 실제 모달을 띄우는 함수 - 화살표 버튼 하나만 있는 경우
  function openModal(messageList) {
    var modal = $('#modal');
    $.get('../modal/modal.html', function (data) {
      modal.html(data);
      var messageText = messageList[nextButtonClickCount];
      var messageTextWithBr = messageText.replace(/\n/g, '<br>');

      $('#modal-message').html(messageTextWithBr);

      animateLetters($('#modal-message'));

      modal.fadeIn();
    });
  }

  // dom 로딩 후, 2초 뒤 정해진 메시지를 갖고 모달을 띄움
  // shuffle-card.html에 있는 messages가 여기에 해당

  setTimeout(function () {
    openModal(messages);
  }, 2000);

  // open-modal에 click 이벤트 발생 시, 화살표 버튼 있는 모달을 띄움
  $('#open-modal').on('click', function () {
    openModal(messages);
    nextButtonClickCount = 0;
  });

  // 다음 메시지 버튼 클릭 시
  $(document).on('click', '#next-modal', function () {
    // 모달에서 화살표를 누를 경우 호출됨
    nextButtonClickCount++;

    // 이미 messages 리스트에 담긴 모든 메시지를 다 봤을 경우 모달을 닫음
    if (nextButtonClickCount >= messages.length) {
      setTimeout(function () {
        $('#modal').fadeOut();
      }, 500);
      return;
    }
    var messageText = messages[nextButtonClickCount];

    // 모달 메시지에 줄바꿈을 <br>로 바꿔서 출력
    var messageTextWithBr = messageText.replace(/\n/g, '<br>');
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
