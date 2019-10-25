const sectionsWithSlider = ['sale',
  'brandnews'];
const sliders = [];

$(document).ready(function () {

  // Следим за измением размера окна, чтобы попеременно  показывать
  // либо slider, либо cards
  $(window).resize(function () {
    let width = $(this).outerWidth();
    let showSlider = width < breakpoint_lg;

    sectionsWithSlider.forEach(function (section) {
      const sliderEl = $(`.${section}-slider`);
      const cardsEl = $(`.${section}-cards`);
      toggleSliderCards(showSlider, sliderEl, cardsEl);
    });
  });


  let width = $(this).outerWidth();
  sectionsWithSlider.forEach(function (section) {
    const sliderEl = $(`.${section}-slider`);
    const cardsEl = $(`.${section}-cards`);
    toggleSliderCards(width < breakpoint_lg, sliderEl, cardsEl);

    [sliderEl, cardsEl].forEach(function (element) {
      let wrapper = element;
      if (element === sliderEl) {
        wrapper = element.find('.swiper-wrapper');
      }

      wrapper.load(`./html/${section}.html #content>div`, function () {
        if (element === sliderEl) {
          const cards = element.find('.card');
          for (let i = 0; i < cards.length; i++) {
            const card = $(cards[i]);
            card.addClass('swiper-slide');
          }

/*

          const responsiveOptions = {};
          responsiveOptions[breakpoint_lg] = {
            gutter: 30,
            items: 1
          };

          responsiveOptions[breakpoint_sm] = {
            gutter: 30,
            items: 2
          };

          const slideOptions = {
            container: `.${section}-slider`,
            mode: 'carousel',
            slideBy: 1,
            autodWidth: true,
            gutter: 30,
            // autoplay: true,
            responsive: responsiveOptions
          };

          tns(slideOptions);

*/

          sliders.push(new Swiper (`.${section}-slider.swiper-container`, {

            slidesPerView: 1,
            loop: true,
            wrapperClass: `${section}-wrapper`,
            // loopedSlides: 2,
            // slidePrevClass: `${section}-prev-button`,
            // slideNextClass: `${section}-next-button`,


            spaceBetween: 30,
            autoplay: true,
            breakpoints: {
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                // spaceBetween: 30
              },
              // when window width is >= 640px
              646: {
                slidesPerView: 2,
                // spaceBetween: 30
              }
            },
            // noSwiping: false,
            // If we need pagination
            // pagination: {
            //   el: '.swiper-pagination',
            // },

            // Navigation arrows
            navigation: {
              nextEl: `.${section}-nav-button.swiper-button-next`,
              prevEl: `.${section}-nav-button.swiper-button-prev`,
            },
            //
            // // And if we need scrollbar
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          }));
        }
      });
    })
  });


  function toggleSliderCards(showSlider, slider, cards) {
    if (showSlider) {
      slider.show();
      cards.hide()
    } else {
      slider.hide();
      cards.show();
    }
  }

});