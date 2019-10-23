/**
 * производим все действия только после того, как структура документа будет полностью готова
 */
$(document).ready(function () {
  const modalActiveCls = 'modal_active';


  let modal = $('#modal');
  let closeBtn = $('#modal-close');

  /**
   * Открываем диалог по нажанию на кнопку "Перезвоните мне"
   */
  $('#call-me').click(function () {
    modal.addClass(modalActiveCls);
  });


  /**
   * Закрываем диалог по нажанию на кнопку "крестик" в диалоговом окне
   */
  closeBtn.click(function () {
    modal.removeClass(modalActiveCls);
  })

});
