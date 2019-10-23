<?php
// Файлы phpmailer
require '../dist/php/phpmailer/PHPMailer.php';
require '../dist/php/phpmailer/SMTP.php';
require '../dist/php/phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
// сохраняем в сессию, чтобы использовать дальше
session_start();
$_SESSION['userName'] = $userName = $_POST['username'];
$_SESSION['userPhone'] = $userPhone = $_POST['phone'];
$_SESSION['userEmail'] = $userEmail = $_POST['email'];

$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
  $msg = "ok";
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth = true;

  // Настройки вашей почты
  $mail->Host = 'smtp.yandex.ru'; // SMTP сервера GMAIL
  $mail->Username = 'valerasadikoff'; // Логин на почте
  $mail->Password = 'rF36hZztsCvDY..'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->setFrom('valerasadikoff@yandex.ru', 'Valera Sadikov'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('jostulorti@enayu.com');

  // Прикрипление файлов к письму
  if (!empty($_FILES['myfile']['name'][0])) {
    for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
      $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
      $filename = $_FILES['myfile']['name'][$ct];
      if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
      } else {
        $msg .= 'Не удалось прикрепить файл ' . $uploadfile;
      }
    }
  }

  // -----------------------
  // Само письмо
  // -----------------------
  $mail->isHTML(true);

  $mail->Subject = 'Новая заявка';
  $mail->Body = "<b>Имя:</b> $userName <br>
        <b>Телефон:</b> $userPhone<br>";
  if ($userEmail != null) {
    $mail->Body .= "<br><b>Емейл:</b> $userEmail";
  }


// Проверяем отравленность сообщения
  if ($mail->send()) {
    echo "Благодарим Вас за заявку. В ближайшее вркмя наш менеджер свяжется с вами";
  } else {
    echo "Форма не была отправлена. Скорее всего, неверно указаны настройки аккаунта";
  }

} catch (Exception $e) {
  echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
