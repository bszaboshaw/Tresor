<?php
usleep(500000);
if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
    echo 'You forgot one or more fields!';
    exit;
}

$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

$ip = getenv('REMOTE_ADDR');
$message = $name.' with e-mail address '.$email.' and IP address '.$ip.' sent the following message:
____________________________________
'.$message.'
------------------------------------';

mail('studio@tresordesign.com', 'Message from www.tresordesign.com', $message, 'From: '.$email);

echo 'Thank you for your message!';
?>