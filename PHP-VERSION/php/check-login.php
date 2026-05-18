<?php
session_start();
include "../config/db_config.php";

if (!isset($_POST['identifier'], $_POST['password'], $_POST['login_type'])) {
    header("Location: ../login.php?error=Invalid access");
    exit;
}

$identifier = trim($_POST['identifier']);
$passcode   = trim($_POST['password']);
$login_type = trim($_POST['login_type']);

if ($identifier == '' || $passcode == '') {
    header("Location: ../login.php?error=Please enter your login details");
    exit;
}

$password = md5($passcode);

if ($login_type == "email") {
    $stmt = $conn->prepare("
        SELECT * FROM users 
        WHERE email = ? AND password = ? 
        LIMIT 1
    ");
} else {
    $stmt = $conn->prepare("
        SELECT * FROM users 
        WHERE pno = ? AND password = ? 
        LIMIT 1
    ");
}

if (!$stmt) {
    header("Location: ../login.php?error=Database error");
    exit;
}

$stmt->bind_param("ss", $identifier, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {

    $row = $result->fetch_assoc();

    $_SESSION['pno']         = $row['pno'];
    $_SESSION['link']        = $row['link'];
    $_SESSION['sponsor']     = $row['sponsor'];
    $_SESSION['name']        = $row['name'];
    $_SESSION['id']          = $row['id'];
    $_SESSION['clientcode']  = $row['clientcode'];
    $_SESSION['patch_log']   = $row['patch_log'];
    $_SESSION['role']        = $row['role'];
    $_SESSION['username']    = $row['username'];
    $_SESSION['email']       = $row['email'];
    $_SESSION['account_no']  = $row['account_no'];

    $trackReqId = substr(str_shuffle("ABCDEFGHIJKLMOPQRSTUVWXYZ123456789"), 0, 7);
    $datenow2   = date('Y-m-d H:i:s');
    $clientcode = $row['clientcode'];

    $log = $conn->prepare("
        INSERT INTO login_logs 
        (log_code, date_logs, clientcode) 
        VALUES (?, ?, ?)
    ");

    if ($log) {
        $log->bind_param("sss", $trackReqId, $datenow2, $clientcode);
        $log->execute();
    }

    if ($row['role'] == 'admin') {
        header("Location: ../admin/home_admin.php");
        exit;
    }

    if ($row['role'] == 'clients_updated') {
        header("Location: ../client/home.php");
        exit;
    }

    session_destroy();
    header("Location: ../login.php?error=Unauthorized role");
    exit;

} else {
    header("Location: ../login.php?error=Invalid email/mobile or password");
    exit;
}
?>