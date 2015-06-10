<?php
 
if(isset($_POST['email'])) {
 
     
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
 
    $email_to = "adriansiulik@gmail.com";
 
    $email_subject = "CreativeRecruitment kontakt od kandydata";
 
     
 
     
 
    function died($error) {
 
        // your error code can go here
 
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
 
        echo "These errors appear below.<br /><br />";
 
        echo $error."<br /><br />";
 
        echo "Please go back and fix these errors.<br /><br />";
 
        die();
 
    }
 
     
 
    // validation expected data exists
 
    if(!isset($_POST['first_name']) ||
 
        !isset($_POST['email']) ||
 
        !isset($_POST['telephone']) ||
 
        !isset($_POST['comments'])) {
 
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
 
    }
 
     
 
    $first_name = $_POST['first_name']; // required
 
    $email_from = $_POST['email']; // required
 
    $telephone = $_POST['telephone']; // not required
 
    $comments = $_POST['comments']; // required

    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    $name_of_uploaded_file =
    basename($_FILES['uploaded_file']['name']);
 
    //get the file extension of the file
    $type_of_uploaded_file =
        substr($name_of_uploaded_file,
        strrpos($name_of_uploaded_file, '.') + 1);
     
    $size_of_uploaded_file =
        $_FILES["uploaded_file"]["size"]/1024;//size in KBs
 
  if(!preg_match($email_exp,$email_from)) {
 
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
 
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
 
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
 
  }
 
 
  if(strlen($comments) < 2) {
 
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
 
  }
 
  if(strlen($error_message) > 0) {
 
    died($error_message);
 
  }
 
    $email_message ='<html><body>';
 
     
 
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
    $email_message .= '<img src="http://creativerecruitment.pl/creative-www/images/logo-cr.png" alt="CreativeRecruitment" />';
    $email_message .= '<table rules="all" style="border-color: #000;" cellpadding="10">';
    $email_message .= "<tr style='background: #fff;'><td><strong>Imię i nazwisko:</strong> </td><td>" . clean_string($first_name) . "</td></tr>";
    $email_message .= "<tr><td><strong>Adres email:</strong> </td><td>" . clean_string($email_from) . "</td></tr>";
    $email_message .= "<tr><td><strong>Telefon:</strong> </td><td>" . clean_string($telephone) . "</td></tr>";
    $email_message .= "<tr><td><strong>Wiadomość:</strong> </td><td>" . clean_string($comments) . "</td></tr>";
   
 
     
 
// create email headers
 
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
$headers .= "CC: susan@example.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
 
@mail($email_to, $email_subject, $email_message, $headers);  
 
?>

 
<!-- include your own success html here -->
 
 
 
Thank you for contacting us. We will be in touch with you very soon.
 
 
 
<?php
 
}
 
?>