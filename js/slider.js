const breakpoint_xl = 1200;
const breakpoint_lg = 992;
const breakpoint_md = 768;
const breakpoint_sm = 646;
const breakpoint_xs = 520;
const breakpoint_2xs = 396;
const breakpoint_3xs = 320;

$(document).ready(function () {
  $(window).resize(function () {
    let width = $(this).width();
    if (width) {
      console.log(width);
    }
  });

  let width = $(window).width();
  if (width >= breakpoint_lg) {}
  var slider = tns({
    container: '.my-slider',
    mode: 'gallery'
    // items: 3,
    // slideBy: 'page',
    // autoplay: true
  });


});