var messages = [
  "정신을 집중해서 카드에 손을 올려주세요.....\n손을 올리면 카드를 섞습니다.....",
];
openedCard = [];
var shuffleFlag = false;

$(function () {
  $(document).ready(function () {
    playAudioWithStorage();
    if (!window.isShuffleBound) {
      $(document).on("mouseover", ".card-shuffle", function () {
        clearTimeout(this.hoverTimeout); // Clear any existing timeouts
        this.hoverTimeout = setTimeout(makeShuffle, 2000);
      });
      window.isShuffleBound = true;
    }
  });

  $(document).on("click", "#move-next-page", function (data) {
    $("#modal").fadeOut();
    loadNextContent("hanat-03.html");
  });

  $(document).ready(function () {
    if (!window.shuffleAgainBound) {
      $(document).on("click", "#shuffle-again", function () {
        $("#modal").fadeOut();
        makeShuffle();
      });
      window.shuffleAgainBound = true; // Set a flag to indicate binding
    }
  });

  $(document).on("mouseout", ".card-shuffle", function () {
    clearTimeout(this.hoverTimeout);
  });

  // 실제 모달을 띄우는 함수 - 이건 김민재한테만 해당함
  function openModalMulti(messageList) {
    var modal = $("#modal");
    $.get("../modal/modal-multi.html", function (data) {
      modal.html(data);
      var messageText = messageList[nextButtonClickCount];
      var messageTextWithBr = messageText.replace(/\n/g, "<br>");

      $("#modal-message").html(messageTextWithBr);

      animateLetters($("#modal-message"));

      modal.fadeIn();
    });
  }

  // open-modal-multi에 click 이벤트 발생 시, 어쩌고.. 이건 @김민재 꺼라 안 건드려도 됨
  $("#open-modal-multi").on("click", function () {
    openModalMulti(messages);
    nextButtonClickCount = 0;
  });
});

async function makeShuffle() {
  if (shuffleFlag) return;
  var random = Math.floor(Math.random() * 2);
  shuffleFlag = true;
  if (random == 0) {
    await shuffle1();
    shuffleFlag = false;
  } else {
    await shuffle2();
    shuffleFlag = false;
  }
  messages = ["카드를 다시 섞겠습니까.....?"];
  $("#open-modal-multi").click();
}

function shuffle1() {
  return new Promise((resolve) => {
    const card = document.querySelectorAll(".card-shuffle");
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
var getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
var shuffle2 = async () => {
  return new Promise(async (resolve) => {
    const SHUFFLE_NUM = 3; // 셔플 횟수
    const TIME = 750; // 셔플 애니메이션 시간
    const card = document.querySelectorAll(".card-shuffle");
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
