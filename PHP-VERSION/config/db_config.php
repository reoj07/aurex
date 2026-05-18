<?php
$mysql_host = 'localhost';
$mysql_user = 'root';
$mysql_pass = '';
$mysql_db ='protar';
$conn = new mysqli($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else{
//echo " Connected";
}
$timezone = "Asia/Manila";
date_default_timezone_set ($timezone);	
?>

