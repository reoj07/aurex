<?php
session_start();

$total_assets = 0;
$today_pnl    = 0;

$accounts = [
    ["name" => "Exchange",  "amount" => 0, "link" => "exchange.php"],
    ["name" => "Trade",     "amount" => 0, "link" => "trade.php"],
    ["name" => "Perpetual", "amount" => 0, "link" => "perpetual.php"],
];

$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<title>Assets</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #07111f;
    color: #fff;
}

.mobile-app {
    max-width: 390px;
    min-height: 100vh;
    margin: auto;
    background: #07111f;
    padding: 14px 13px 95px;
}

.page-title {
    text-align: center;
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 15px;
}

.asset-card {
    position: relative;
    overflow: hidden;
    min-height: 205px;
    border-radius: 9px;
    padding: 24px 20px;
    background: linear-gradient(135deg, #ffd073, #ffad42);
}

.asset-card::before {
    content: "";
    position: absolute;
    right: -38px;
    top: 12px;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    border: 14px solid rgba(255,255,255,.14);
}

.asset-card::after {
    content: "";
    position: absolute;
    right: 35px;
    top: 50px;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: rgba(255,255,255,.13);
    box-shadow: 0 0 0 23px rgba(255,255,255,.10);
}

.card-label {
    position: relative;
    z-index: 2;
    font-size: 13px;
    opacity: .95;
    margin-bottom: 8px;
}

.card-label i {
    font-size: 13px;
    margin-left: 4px;
}

.asset-amount {
    position: relative;
    z-index: 2;
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 18px;
}

.pnl-label {
    position: relative;
    z-index: 2;
    font-size: 13px;
    margin-bottom: 6px;
}

.pnl-amount {
    position: relative;
    z-index: 2;
    font-size: 38px;
    font-weight: 800;
    line-height: 1;
}

.refresh {
    position: relative;
    z-index: 2;
    font-size: 14px;
    margin-top: 5px;
}

.action-menu {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 15px 0 19px;
    text-align: center;
}

.action-menu a {
    color: #fff;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
}

.action-icon {
    width: 35px;
    height: 35px;
    margin: 0 auto 10px;
    border-radius: 50%;
    border: 1.5px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f6c35f;
    background: rgba(255,255,255,.03);
}

.section-title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 15px;
}

.account-card {
    display: block;
    text-decoration: none;
    color: #fff;
    background: #0a1727;
    border-radius: 11px;
    padding: 21px 14px;
    margin-bottom: 12px;
    min-height: 133px;
}

.account-card h4 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 27px;
}

.account-card .amount {
    font-size: 27px;
    font-weight: 800;
    margin-bottom: 11px;
}

.account-card i {
    font-size: 18px;
}

.bottom-nav {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    max-width: 390px;
    width: 100%;
    background: #0a1422;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 22px 22px 0 0;
    padding: 8px 12px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    z-index: 99;
}

.bottom-nav a {
    text-decoration: none;
    color: #8e99aa;
    font-size: 10px;
    text-align: center;
    padding: 8px 0;
    border-radius: 17px;
}

.bottom-nav i {
    display: block;
    font-size: 16px;
    margin-bottom: 4px;
}

.bottom-nav a.active {
    background: #172438;
    color: #f2bf45;
    font-weight: 700;
}
</style>
</head>

<body>

<div class="mobile-app">

    <h1 class="page-title">Assets</h1>

    <div class="asset-card">
        <div class="card-label">
            Total Assets <i class="bi bi-eye"></i>
        </div>

        <div class="asset-amount">
            ≈ $<?= number_format($total_assets, 2); ?>
        </div>

        <div class="pnl-label">Today's PnL:</div>

        <div class="pnl-amount">
            <?= number_format($today_pnl, 0); ?>
        </div>

        <div class="refresh">
            <i class="bi bi-arrow-clockwise"></i>
        </div>
    </div>

    <div class="action-menu">
        <a href="deposit.php">
            <div class="action-icon"><i class="bi bi-upload"></i></div>
            Deposit
        </a>

        <a href="withdrawal.php">
            <div class="action-icon"><i class="bi bi-download"></i></div>
            Withdrawal
        </a>

        <a href="convert.php">
            <div class="action-icon"><i class="bi bi-arrow-left-right"></i></div>
            Convert
        </a>

        <a href="transfer.php">
            <div class="action-icon"><i class="bi bi-arrow-repeat"></i></div>
            Transfer
        </a>
    </div>

    <h2 class="section-title">My account</h2>

    <?php foreach ($accounts as $acc): ?>
        <a href="<?= htmlspecialchars($acc['link']); ?>" class="account-card">
            <h4><?= htmlspecialchars($acc['name']); ?></h4>

            <div class="amount">
                ≈ $<?= number_format($acc['amount'], 2); ?>
            </div>

            <i class="bi bi-chevron-right"></i>
        </a>
    <?php endforeach; ?>

</div>

<?php require 'bottom_menu.php'; ?>

</body>
</html>