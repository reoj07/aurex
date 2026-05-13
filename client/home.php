<?php
$markets = [
  ["pair"=>"XPDUSD", "price"=>"1516.000", "change"=>"-0.12%", "type"=>"down"],
  ["pair"=>"XAGUSD", "price"=>"86.241", "change"=>"-0.89%", "type"=>"down"],
  ["pair"=>"XPTUSD", "price"=>"2093.000", "change"=>"-2.54%", "type"=>"down"],
  ["pair"=>"SHIBUSDT", "price"=>"0.000007", "change"=>"+1.54%", "type"=>"up"],
  ["pair"=>"XAUUSD", "price"=>"4721.300", "change"=>"-0.96%", "type"=>"down"],
  ["pair"=>"CHFUSD", "price"=>"1.282", "change"=>"-0.08%", "type"=>"down"],
];

$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>AURX Exchange</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<?php require'indexcss.css'; ?>
</head>
<body>

<div class="mobile-app">
<!-- ----------------------HEADER Design----------------------------------------- -->
    <!-- HEADER -->
    <div class="header">
        <div class="brand">
            <div class="logo">A</div>
            <div class="brand-text">
                <h2>AURX</h2>
                <span>AURX EXCHANGE</span>
            </div>
        </div>
        <a href="../config/logout.php">
        <div class="profile"></div></a>
    </div>

    <!-- HERO -->
    <section class="hero">
        <h3>AI-Powered Trading</h3>
        <h1>Elevating Investment<br>Efficiency</h1>
        <p>Technology Empowering Finance</p>

        <div class="hero-card">
            Pioneering the Digital Asset<br>
            Era
        </div>

        <div class="dots">
            <span></span>
            <span></span>
        </div>
    </section>

    <!-- NOTICE -->
    <div class="notice">
        <i class="bi bi-megaphone-fill"></i>
        <span>THIS IS A TEST</span>
        <i class="bi bi-chevron-right"></i>
    </div>
<!-- ----------------------Center menu----------------------------------------- -->
    <!-- MENU -->
    <div class="menu">
        <a href="withdrawal.php" class="menu-item">
            <div class="menu-icon"><i class="bi bi-currency-exchange"></i></div>
            Withdrawal
        </a>

        <a href="deposit.php" class="menu-item">
            <div class="menu-icon"><i class="bi bi-upload"></i></div>
            Deposit
        </a>

        <a href="invite.php" class="menu-item">
            <div class="menu-icon"><i class="bi bi-person-plus"></i></div>
            Invite
        </a>

        <a href="support.php" class="menu-item">
            <div class="menu-icon"><i class="bi bi-question-circle"></i></div>
            Support
        </a>
    </div>
<!-- ----------------------HEADER Design----------------------------------------- -->



    
<!-- ----------------------Center menu----------------------------------------- -->
    <!-- PROMO -->
    <div class="promo">
        <h3>Easy Follow Trade</h3>
        <p>Safe and convenient</p>
        <div class="arrow">
            <i class="bi bi-arrow-right"></i>
        </div>
    </div>
<!-- ----------------------static widgets----------------------------------------- -->
    <!-- MARKET -->
    <div class="market">
        <div class="market-head">
            <span>Pair</span>
            <span>Price</span>
            <span>
                <b class="live">● LIVE 12:01:13</b><br>
                24-Hour Change
            </span>
        </div>

        <?php foreach($markets as $m): ?>
        <div class="market-row">
            <div><?= htmlspecialchars($m['pair']); ?></div>
            <div class="price"><?= htmlspecialchars($m['price']); ?></div>
            <div class="change <?= $m['type']; ?>">
                <?= htmlspecialchars($m['change']); ?>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
<!-- ----------------------static widgets----------------------------------------- -->
</div>
<!-- ----------------------Bottom menu----------------------------------------- -->
<!-- BOTTOM NAV -->
<?php require'bottom_menu.php'; ?>

<!-- ----------------------Bottom menu----------------------------------------- -->

</body>
</html>