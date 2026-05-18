<?php
session_start();
include "../config/db_config.php";

if (!isset($_SESSION['username'], $_SESSION['id']) || $_SESSION['role'] != 'clients_updated') {
    header("Location:../login.php");
    exit;
}

$clientcode = $_SESSION['clientcode'] ?? '';
$fullname   = $_SESSION['name'] ?? '';
$username   = $_SESSION['username'] ?? '';
$pno        = $_SESSION['pno'] ?? '';

$currentPage = basename($_SERVER['PHP_SELF']);

$balance = 0.00;
$handling_fee = 0;

$success = $_SESSION['withdraw_success'] ?? '';
$error   = $_SESSION['withdraw_error'] ?? '';

unset($_SESSION['withdraw_success'], $_SESSION['withdraw_error']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Withdrawal</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<?php require 'withdrawalcss.css'; ?>

<style>
#loadingOverlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.85);
    display:none;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    z-index:999999;
    color:#fff;
    font-family:Arial, sans-serif;
}

.loader{
    width:55px;
    height:55px;
    border:6px solid #333;
    border-top:6px solid #f5c542;
    border-radius:50%;
    animation:spin 1s linear infinite;
    margin-bottom:15px;
}

@keyframes spin{
    to{
        transform:rotate(360deg);
    }
}
</style>
</head>

<body>

<div class="mobile-app">

    <div class="header">
        <a href="home.php"><i class="bi bi-chevron-left"></i></a>
        <h1>Withdrawal</h1>
        <a href="#"><i class="bi bi-clipboard"></i></a>
    </div>

    <div class="currency-bar">
        <div class="currency-left">
            <div class="currency-icon">U</div>
            <span>USDT</span>
        </div>

        <a href="#" class="currency-select">
            Select currency <i class="bi bi-chevron-right"></i>
        </a>
    </div>
<!-- ----------------------Form to controls insert----------------------------------------- -->
    <form method="POST" action="../controls/insert_withdrawal.php" class="login-page" id="withdrawForm">

        <div class="card">

            <div class="input-group">
                <h3>Withdrawal address</h3>
                <div class="input-box">
                    <input type="text" name="address" placeholder="Please enter wallet address" required>
                </div>
            </div>

            <input type="hidden" name="clientcode" value="<?= htmlspecialchars($clientcode); ?>">
            <input type="hidden" name="fullname" value="<?= htmlspecialchars($fullname); ?>">

            <div class="input-group">
                <h3>Withdrawal amount</h3>
                <div class="input-box">
                    <input type="number" name="amount" min="1" step="0.01" placeholder="Enter amount" required>
                </div>
                <div class="balance">
                    Balance: <?= number_format($balance, 2); ?> USDT
                </div>
            </div>

            <div class="input-group">
                <h3>Handling fee</h3>
                <div class="input-box">
                    <input type="text" name="fee" value="<?= htmlspecialchars($handling_fee); ?>" readonly>
                </div>
            </div>

        </div>

        <div class="card notice">
            <h2>Important Notice</h2>

            <ol>
                <li>
                    After submitting the withdrawal application, the funds are in a frozen state because the withdrawal is in progress.
                </li>
                <li>
                    The account will be received within 24 hours after submitting the withdrawal application.
                </li>
                <li>
                    In order to prevent arbitrage behavior, the transaction volume can be applied for withdrawal after reaching the limit.
                </li>
                <li>
                    The withdrawal fee for USDT ETH BTC is 12%!
                </li>
            </ol>

            <div class="feedback">
                Encounter problems? feedback immediately
            </div>

            <button type="submit" class="confirm-btn">
                Confirm
            </button>
        </div>

    </form>

    <!-- ----------------------Form to controls insert----------------------------------------- -->
</div>

<?php require 'bottom_menu.php'; ?>

<div id="loadingOverlay">
    <div class="loader"></div>
    <p>Processing withdrawal...</p>
</div>



<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<?php if (isset($_GET['success'])): ?>
<script>
Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: 'Withdrawal request submitted successfully.',
    confirmButtonText: 'OK'
});
</script>
<?php endif; ?>

<?php if (isset($_GET['error'])): ?>
<script>
Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: '<?= htmlspecialchars($_GET['error'], ENT_QUOTES); ?>',
    confirmButtonText: 'OK'
});
</script>
<?php endif; ?>

</body>
</html>