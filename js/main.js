const minLifetime = 1500;
const maxLifetime = 5000;

/**
 * производим все действия только после того, как структура документа будет полностью готова
 */
$(document).ready(function () {

  new WOW({mobile: false}).init();

  let jumpBt = $('.jump-btn');

  jumpBt.click(function () {
    jump('.navbar', {
      duration: 750
    })
  });

  $(window).scroll(function (e) {
    if ($(window).scrollTop() !== 0) {
      jumpBt.fadeIn();
    } else {
      jumpBt.fadeOut();
    }
  });


  // Ошибки валидации будем показывать в балонах
  // $('input').balloon();

   // Валидация с помощью плагина jQuery
  const requiredMsg = 'Заполните поле';
  const wrongEmailMsg = 'Введите корректный email';
  $.validator.addMethod('phoneRu', function (value, element) {
    return /^8 ?\(?\d{3}\)?[ -]?\d{3}-?\d{2}-?\d{2}$/g.test(value);
  });

  function validateSuccessHandler(label, element) {
    const e = $(element);

    e.hideBalloon();
    e.off();
  }

  function validateErrorPlacement(error, element) {
    element.showBalloon({
      minLifetime: minLifetime,
      maxLifetime: maxLifetime,
      contents: function() {
        return error.html();
      }
    })
  }

  const validateOptions = {
    errorClass: 'invalid',
    errorElement: "div",
    rules: {
      username: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      phone: {
        required: true,
        phoneRu: true,
        maxlength: 17
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      username: {
        required: requiredMsg,
        minlength: $.validator.format('Требуется как минимум {0} символа!'),
        maxlength: $.validator.format('Имя не должно превышать {0} символов')
      },
      phone: {
        required: requiredMsg,
        phoneRu: 'Некорретный номер телефона'
      },
      email: {
        required: requiredMsg,
        email: wrongEmailMsg
      }
    },

    success: validateSuccessHandler,
    errorPlacement: validateErrorPlacement
  };

  const forms = $('form');

  for (let i = 0; i < forms.length; i++) {
    const formDom = forms[i];
    const form = $(formDom);

    form.validate(validateOptions);
    form.on('submit', formSubmitHandler);

    function formSubmitHandler(event) {
      event.preventDefault();

      if (form.valid()) {
        const ajaxOptions = {
          type: 'post',
          url: 'send.php',
          data: form.serialize(),
          success: function (response) {
            console.log('Ответ от сервера: $s', response);

            $.toast({
              text: response,
              position: 'top-right',
              loader: false,
              allowToastClose: true,
              showHideTransition: 'slide',
              textAlign: 'center',
              hideAfter: 10000
            });
            formDom.reset();
          },
          error: function (jqXHR, textStatus) {
            console.error('Ошибка пре отправлении формы Offer')
          }
        };

        $.ajax(ajaxOptions)
      }
    }
  }


  // Маска для телефона
  $('input[name=phone]').mask('8 (999) 999-99-99');

  /* Скрипт слайдера */
  const options = {
    items: 3,
    margin: 30,
    loop: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    navText: [
      `<div><img src="../images/key/left-arrow.png" alt="Стрелка влево"></div>`,
      `<div><img src="../images/key/right-arrow.png" alt="Стрелка вправо"></div>`
    ]
  };

  $('.portfolio-items').owlCarousel(options);

})
;

