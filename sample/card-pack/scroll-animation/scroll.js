// 카드 선택 애니메이션 기본 세팅
const CARD_COUNT = 22;
const SCROLL_SCOPE = 400;
let lastScroll;
let index;
$(document).ready(() => {
  index = CARD_COUNT - 1;
  $(`#${index}`).addClass('current-card');
  $(window).scrollTop(0);
});
// 스크롤 애니메이션
$(window).on('scroll', () => {
  let cardTranslate = parseInt($('.card').css('height').slice(0, -2)) * 3;
  let scroll = $(window).scrollTop();
  index = Math.floor(22 - scroll / SCROLL_SCOPE);
  // 인덱스 범위를 벗어난 경우 실행하지 않는다.
  if (index < 0 || index > 21) {
    return;
  }

  if (scroll - lastScroll < 0) {
    $('.card').eq(index).css('transform', `translateY(0px)`);
    $('.card')
      .eq(index - 1)
      .removeClass('current-card');
    $('.card').eq(index).addClass('current-card');
  } else {
    $('.card').eq(index).css('transform', `translateY(${cardTranslate}px)`);
    $('.card').eq(index).removeClass('current-card');
    $('.card')
      .eq(index - 1)
      .addClass('current-card');
  }

  // 스크롤 조정 필요
  // if (index < 0) {
  //   $(window).scrollTop(100);
  //   index = 0;
  // }
  lastScroll = scroll;
});

// 카드 선택 애니메이션
let cnt = 0;
const TRANSLATE = {
  x: '175%',
  y: ['-60%', '0%', '60%'],
};
$(document).on('click', '.current-card', (e) => {
  let id = e.target.id;

  $(`#${id}`).removeClass('card current-card');
  $(`#${id}`).css('left', '0px');
  $(`#${id}`).addClass(`selected-card`);
  $(`#${id - 1}`).addClass('current-card');

  $(`#${id}`).css(
    'transform',
    `translate(${TRANSLATE.x}, ${TRANSLATE.y[cnt]}) scale(0.4)`
  );
  index--;
  cnt++;
  if (cnt == 3) {
    $(`#${id - 1}`).removeClass('current-card');
    return;
  }
});
