<?php
session_start();
include "../config/db_config.php";

date_default_timezone_set("Asia/Manila");

if (!isset($_SESSION['username'], $_SESSION['id']) || $_SESSION['role'] != 'clients_updated') {
    header("Location: ../../login.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../withdrawal.php");
    exit;
}

$clientcode = $_POST['clientcode'] ?? '';
$fullname   = $_POST['fullname'] ?? '';
$address    = trim($_POST['address'] ?? '');
$amount     = (float)($_POST['amount'] ?? 0);
$fee        = (float)($_POST['fee'] ?? 0);

$pno        = $_SESSION['pno'] ?? '';
$username   = $_SESSION['username'] ?? '';

if ($address == '') {
    header("Location: ../withdrawal.php?error=Wallet address is required");
    exit;
}

if ($amount <= 0) {
    header("Location: ../withdrawal.php?error=Invalid withdrawal amount");
    exit;
}

$w_code      = 'WD-' . strtoupper(substr(md5(uniqid()), 0, 8));
$invest_code = '';
$status      = 0;
$branch      = 'USDT';
$account     = $address;
$receiver    = $fullname;
$days        = date("d");
$month       = date("m");
$year        = date("Y");
$date_w      = date("Y-m-d H:i:s");

$stmt = $conn->prepare("
    INSERT INTO withdraw_table 
    (
        w_code,
        invest_code,
        fullname,
        pno,
        clientcode,
        withdraw_user,
        amount,
        minus_five,
        date_w,
        status,
        branch,
        account,
        receiver,
        days,
        month,
        year
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}

$stmt->bind_param(
    "ssssssddsissssss",
    $w_code,
    $invest_code,
    $fullname,
    $pno,
    $clientcode,
    $username,
    $amount,
    $fee,
    $date_w,
    $status,
    $branch,
    $account,
    $receiver,
    $days,
    $month,
    $year
);

if ($stmt->execute()) {
    header("Location: ../client/withdrawal.php?success=1");
    exit;
} else {
    header("Location: ../client/withdrawal.php?error=Insert failed");
    exit;
}
?>