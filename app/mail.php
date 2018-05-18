<?php
   $back = "<p><a href=\"javascript: history.back()\">Вернутись і дописати</a></p>";

   if(!empty($_POST['name']) and !empty($_POST['phone']) and !empty($_POST['mail'])
   and !empty($_POST['message'])){
      $name = trim(strip_tags($_POST['name']));
      $phone = trim(strip_tags($_POST['phone']));
      $mail = trim(strip_tags($_POST['mail']));
      $message = trim(strip_tags($_POST['message']))  . '<br> phone:' . $phone  . '<br> name:' . $name;

       /*
           * Enable error reporting
           */
          ini_set( 'display_errors', 1 );
          error_reporting( E_ALL );

          /*
           * Setup email addresses and change it to your own
           */
          $to = "kysil.rk@gmail.com";
          $subject = "Simple test for mail function" ;
          $headers = "From:" . $mail;
          $headers .= "MIME-Version: 1.0\r\n";
          $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

          /*
           * Test php mail function to see if it returns "true" or "false"
           * Remember that if mail returns true does not guarantee
           * that you will also receive the email
           */
          if(mail($to,$subject,$message, $headers))
          {
              echo "Test email send.";
              header("Location: http://vdmebli.com");
              alert("Hello World");
              function alert($msg) {
                  echo "<script type='text/javascript'>alert('$msg');</script>";
              }
              die();

          }
          else
          {
              echo "Failed to send.";
          }
      exit;
   }
   else {
      echo "Заповніть будь ласка всі поля $back";
      exit;
   }
?>