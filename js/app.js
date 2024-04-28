function loadNextContent(nextPage) {
  $.get(nextPage, function (data) {
    $('body').html(data);
  });
}

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