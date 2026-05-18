<?php
session_start();
include "../config/db_config.php"; // adjust path if needed
date_default_timezone_set("Asia/Manila");

if (!isset($_SESSION['username'], $_SESSION['id'])) {
    header("Location: ../login.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: deposit_crypto.php");
    exit;
}

$clientcode = $_SESSION['clientcode'] ?? '';
$fullname   = $_SESSION['username'] ?? '';

$currency = trim($_POST['currency'] ?? '');
$chain    = trim($_POST['chain'] ?? '');
$amount   = (float)($_POST['amount'] ?? 0);
$txhash   = trim($_POST['transaction_hash'] ?? '');
$note     = trim($_POST['note'] ?? '');

if ($amount <= 0) {
    die("Invalid amount.");
}

if ($txhash == '') {
    die("Transaction hash is required.");
}

$req_code = "RF-" . strtoupper(substr(md5(uniqid()), 0, 8));
$reseller_code = $currency . "-" . $chain;
$fund_seller_name = "Crypto Deposit";
$ref_no = $txhash;
$date_req = date("Y-m-d H:i:s");
$status = 0;
$filename = "";

/* Upload proof */
if (isset($_FILES['proof']) && $_FILES['proof']['error'] === UPLOAD_ERR_OK) {

    $uploadDir = "uploads/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = strtolower(pathinfo($_FILES['proof']['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'pdf'];

    if (!in_array($ext, $allowed)) {
        die("Invalid file type.");
    }

    $filename = "proof_" . time() . "_" . rand(1000,9999) . "." . $ext;
    $targetFile = $uploadDir . $filename;

    if (!move_uploaded_file($_FILES['proof']['tmp_name'], $targetFile)) {
        die("Failed to upload proof.");
    }
}

/* Insert to request_fund */
$stmt = $conn->prepare("
    INSERT INTO request_fund 
    (req_code, reseller_code, clientcode, fullname, amount, fund_seller_name, ref_no, date_req, status, filename)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssdsssis",
    $req_code,
    $reseller_code,
    $clientcode,
    $fullname,
    $amount,
    $fund_seller_name,
    $ref_no,
    $date_req,
    $status,
    $filename
);

if ($stmt->execute()) {
    header("Location: ../client/deposit_crypto.php?success=Deposit submitted successfully");
    exit;
} else {
    die("Insert failed: " . $stmt->error);
}
?>