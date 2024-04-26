$(function () {
  let nextButtonClickCount = 0;

  function openModal(messageList) {
    const modal = $('#modal');
    // console.log('messageList:', messageList);
    $.get('modal.html', function (data) {
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
