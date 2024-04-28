const magicBall = document.querySelector(".magicball1")
magicBall.addEventListener("mouseover", ()=>{
  magicBall.classList.add("magicball-hover")
})
magicBall.addEventListener("mouseout", () => {
  magicBall.classList.remove("magicball-hover")
})

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

// cards
const cards = document.querySelectorAll("#cards")
const card = document.querySelectorAll(".card")
const background = document.querySelector(".backgroud")
// const clickedCard = document.querySelectorAll("#cards.clicked")
cards.forEach((ele) => {
  console.log(ele)
  ele.addEventListener('click', () => {
    const clickedCard = document.querySelectorAll("#cards.clicked")
    ele.classList.contains("clicked") ?  ele.classList.remove("clicked") : ele.classList.add("clicked")
    console.log(document.querySelectorAll("#cards.clicked").length)
    if (clickedCard.length+1 >= 4) {
      clickedCard.forEach((elem)=> elem.classList.remove("clicked"))
      document.querySelector("#cards.clicked").classList.remove("clicked")
      openModal(['카드를 마음대로 만지지 말아주세요.....'])
      background.classList.contains("clicked") ? background.classList.remove("clicked") : background.classList.add("clicked")
    }
  })
})

// mouse-movement
// const background = document.querySelector(".backgroud")
// background.addEventListener('click', () => {
//   background.classList.contains("clicked") ? background.classList.remove("clicked") : background.classList.add("clicked") 
// })

// 모달 열기 버튼 클릭 시
// $('#openModal').on('click', function () {
//   background.classList.contains("clicked") ? background.classList.remove("clicked") : background.classList.add("clicked")
// });