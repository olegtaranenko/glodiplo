const breakpoint_xl = 1200;
const breakpoint_lg = 992;
const breakpoint_md = 768;
const breakpoint_sm = 646;
const breakpoint_xs = 520;
const breakpoint_2xs = 396;
const breakpoint_3xs = 320;
let saleSlider;

$(document).ready(function () {
  $(window).resize(function () {
    let width = $(this).outerWidth();
    if (width) {
      console.log(width);
    }
  });


  let width = $(window).outerWidth();
  let viewMode = 'gallery';
  let itemsNumber = 4;
  let autoplay = false;

  if (width < breakpoint_lg) {
    viewMode = 'carousel';
    itemsNumber = width < breakpoint_xs ? 1 : 2;
    autoplay = true;
  }


  const slideOptions = {
    container: '.my-slider',
    mode: viewMode,
    items: itemsNumber,
    slideBy: 1,
    autoplay: autoplay
  };

  // saleSlider = tns(slideOptions);
});