var openedCard = []; // 오픈한 카드 번호를 저장할 배열 선언
var messages = ["당신의 금전운을 점쳐줄 카드를 선택해 \n결과를 확인하세요...."];
$(document).ready(function () {
  playAudioWithStorage();
  // 카드 뒤집기 함수
  $(function () {
    $(".flip-inner").on("click", function () {
      const cardId = parseInt($(this).attr("id").slice(4)); // 선택한 카드의 id 불러오기

      $("#card" + cardId + "-front").attr(
        // 선택한 카드의 이미지 추가
        "src",
        card_lists[selectedNum[cardId]].url
      );

      $("#card" + cardId + "-front").css({
        transform: "rotateY(180deg)",
      }); // 뒤집을 때 좌우 반전되는 것 방지
      if (selectedDir[cardId] == 1) {
        $("#card" + cardId + "-front").css({
          transform: "rotate(180deg)",
        }); // 역방향일 경우 180도 회전
      }

      $("#card" + cardId).css({ transform: "rotateY(180deg)" }); // 카드 뒤집기

      setTimeout(function () {
        openModal2(cardId); // 뒤집으면 모달 열기
      }, 1000);
    });
  });

  // 모달 열기 함수
  function openModal2(cardId) {
    if (!openedCard.includes(cardId)) {
      // 모든 카드를 뒤집었는지 확인하기 위한 검사
      openedCard.push(cardId);
    }
    const modal = $("#modal");
    // Load modal content from /modal.modal.html
    $.get("../modal/hanat-04-modal.html", function (data) {
      // Insert modal content into the modal div
      modal.html(data);
      // Display a card
      $("#modal-img").attr("src", card_lists[selectedNum[cardId]].url);
      if (selectedDir[cardId] == 1) {
        $("#modal-img").css({ transform: "rotate(180deg)" }); // 역방향일 경우 180도 회전
      }
      // Display a message
      const messageText =
        card_lists[selectedNum[cardId]].description[selectedDir[cardId]];
      const messageTextWithBr = messageText.replace(/\n/g, "<br>");
      $("#modal-message").css("font-size", "1.2rem");
      $("#modal-message").css("width", "70%");
      $("#modal-message").html(messageTextWithBr);
      animateLetters($("#modal-message"));

      modal.fadeIn();
      modal.css("display", "flex");
    });
  }
});

// 모달 종료
$(document).on("click", "#next-modal2", function () {
  $("#modal").fadeOut();
  if (openedCard.length > 2) {
    // 다 뒤집었을 경우
    setTimeout(() => {
      // 약 2초 후 모달을 띄운다.
      messages = [
        "점꾀는 어떠셨나요... \n다음 버튼을 누르면 결과화면으로 넘어갑니다....",
      ];
      $("#open-modal").click();
    }, 2000);
  }
});

$(document).on("click", "#next-modal", function () {
  if (openedCard.length > 2) {
    $("#modal").fadeOut();

    loadNextContent("hanat-05.html");
  }
});
