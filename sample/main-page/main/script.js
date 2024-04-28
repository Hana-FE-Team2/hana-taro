// magicball js
const magicBall = document.querySelector(".magicball1")
// magicball에 마우스 올렸을 때
magicBall.addEventListener("mouseover", ()=>{
  magicBall.classList.add("magicball-hover")
})
// magicball에 마우스 나갔을 때
magicBall.addEventListener("mouseout", () => {
  magicBall.classList.remove("magicball-hover")
})

// message 띄우려고 가져옴
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
cards.forEach((ele) => {
  console.log(ele)
  // 카드 클릭 시 
  ele.addEventListener('click', () => {
    const clickedCard = document.querySelectorAll("#cards.clicked")
    ele.classList.contains("clicked") ?  ele.classList.remove("clicked") : ele.classList.add("clicked")
    console.log(document.querySelectorAll("#cards.clicked").length)
    // 카드를 4장 째 뒤집을 시
    if (clickedCard.length+1 >= 4) {
      clickedCard.forEach((elem)=> elem.classList.remove("clicked"))
      document.querySelector("#cards.clicked").classList.remove("clicked")
      openModal(['카드를 마음대로 만지지 말아주세요.....'])
      background.classList.contains("clicked") ? background.classList.remove("clicked") : background.classList.add("clicked")
    }
  })
})