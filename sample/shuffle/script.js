const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

btn1.addEventListener("click", () => {
  shuffle1();
});
btn2.addEventListener("click", () => {
  shuffle2();
});

// 셔플1: 좌우 셔플
let shuffle1 = async () => {
  const card = document.querySelectorAll(".card");
  const SPEED = 250;
  const DISTANCE = 250;

  for (let i = 0; i < card.length; i++) {
    setTimeout(() => {
      // 짝수 번째, 홀수 번째 카드에 따라 좌우로 분산시킴
      if (i % 2 == 0) card[i].style.transform = `translate(${DISTANCE}px)`;
      else card[i].style.transform = `translate(-${DISTANCE}px)`;
    }, SPEED * i);
  }
  await delay(SPEED * card.length);
  // 가운데로 이동
  for (let i = 0; i < card.length; i++) {
    setTimeout(() => {
      card[i].style.transform = `translate(0px)`;
    }, SPEED * i);
  }
};

// 셔플2: 원형으로 셔플
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
let shuffle2 = async () => {
  const SHUFFLE_NUM = 3; // 셔플 횟수
  const TIME = 750; // 셔플 애니메이션 시간
  const card = document.querySelectorAll(".card");
  for (let j = 0; j < SHUFFLE_NUM; j++) {
    for (let i = 0; i < card.length; i++) {
      // 픽셀 단위 설정
      let randomX = getRandom(-600, 600); // x축 범위
      let randomY = getRandom(-150, 150); // y축 범위
      let randomAngle = getRandom(-70, 70); // 카드 섞일 각도 설정
      setTimeout(() => {
        card[
          i
        ].style.cssText = `transform: rotate(${randomAngle}deg) translate(${randomX}px, ${randomY}px)`;
      }, TIME * (j + 1));
    }
  }
  // 가운데로 이동
  for (let i = 0; i < card.length; i++) {
    setTimeout(() => {
      card[i].style.cssText = `transform: rotate(0deg) translate(0px, 0px)`;
    }, TIME * (SHUFFLE_NUM + 1));
  }
};

const title = document.getElementById("title");
const letter1 = "셔플 시뮬레이션 입니다.";
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < letter1.length; i++) {
    setTimeout(() => {
      title.innerHTML += letter1[i];
    }, 200 * (i * 1));
  }
});
