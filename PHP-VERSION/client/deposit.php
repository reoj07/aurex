<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Deposit</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, sans-serif;
}

body{
    background:#020b16;
    color:#fff;
    display:flex;
    justify-content:center;
}

.mobile-app{
    width:100%;
    max-width:390px;
    min-height:100vh;
    background:#02070d;
    position:relative;
    padding-bottom:90px;
}

/* HEADER */
.header{
    height:55px;
    display:grid;
    grid-template-columns:40px 1fr 40px;
    align-items:center;
    padding:0 18px;
}

.header a{
    color:#7f8792;
    text-decoration:none;
    font-size:20px;
}

.header h1{
    text-align:center;
    font-size:25px;
    color:#777;
    font-weight:800;
}

/* CONTENT */
.deposit-content{
    padding:0 30px;
    color:#777f8c;
    font-size:14px;
    line-height:2;
}

.deposit-content b{
    color:#868b92;
}

/* BOTTOM SHEET */
.deposit-sheet{
    position:absolute;
    left:16px;
    right:16px;
    bottom:0;
    background:#151a23;
    border-radius:22px 22px 0 0;
    padding:18px 14px 22px;
    border:1px solid rgba(255,255,255,.06);
}

.drag-line{
    width:70px;
    height:3px;
    background:#656b74;
    border-radius:20px;
    margin:0 auto 14px;
}

.deposit-sheet h2{
    font-size:16px;
    margin-bottom:14px;
}

.method-card{
    display:flex;
    gap:14px;
    align-items:flex-start;
    padding:16px 13px;
    border-radius:15px;
    background:#171c25;
    border:1px solid rgba(255,255,255,.06);
    margin-bottom:10px;
    text-decoration:none;
    color:#fff;
}

.method-card.active{
    border-color:#c7a13a;
    background:#2a271d;
}

.method-icon{
    min-width:35px;
    height:35px;
    border-radius:50%;
    background:#3a3320;
    color:#d8b54e;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:15px;
}

.method-card h3{
    font-size:14px;
    margin-bottom:8px;
}

.method-card p{
    font-size:12px;
    line-height:1.35;
    color:#9299a7;
}

/* BOTTOM NAV */
.bottom-nav{
    position:fixed;
    left:50%;
    bottom:0;
    transform:translateX(-50%);
    width:100%;
    max-width:390px;
    height:74px;
    background:#071426;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    align-items:center;
    padding:8px;
    border-top:1px solid rgba(255,255,255,.08);
    z-index:9999;
}

.bottom-nav a{
    height:56px;
    text-decoration:none;
    color:#9eb2d3;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:4px;
    font-size:12px;
    border-radius:18px;
}

.bottom-nav a i{
    font-size:19px;
}

.bottom-nav a.active{
    background:linear-gradient(180deg,#132847,#0d1d33);
    color:#ffd33f;
    font-weight:bold;
}

@media(max-width:430px){
    .mobile-app,
    .bottom-nav{
        max-width:100%;
    }

    .deposit-sheet{
        left:0;
        right:0;
    }
}
</style>
</head>
<body>

<div class="mobile-app">

    <div class="header">
        <a href="home.php"><i class="bi bi-chevron-left"></i></a>
        <h1>Deposit</h1>
        <a href="#"><i class="bi bi-clipboard"></i></a>
    </div>

    <div class="deposit-content">
        Select how you want to add funds <b>Choose a deposit method to continue.</b>
    </div>

    <div class="deposit-sheet">
        <div class="drag-line"></div>

        <h2>Select Deposit Method</h2>

        <a href="deposit_crypto.php" class="method-card active">
            <div class="method-icon">
                <i class="bi bi-download"></i>
            </div>
            <div>
                <h3>Deposit Crypto</h3>
                <p>Deposit crypto from other exchanges or external wallets to your account.</p>
            </div>
        </a>

        <a href="buy_php.php" class="method-card">
            <div class="method-icon">
                <i class="bi bi-wallet2"></i>
            </div>
            <div>
                <h3>Buy with PHP</h3>
                <p>Buy crypto easily via bank transfer, card, and other local payment methods.</p>
            </div>
        </a>

        <a href="p2p.php" class="method-card">
            <div class="method-icon">
                <i class="bi bi-person-plus"></i>
            </div>
            <div>
                <h3>P2P Trading</h3>
                <p>Buy directly from users with competitive pricing and local payment rails.</p>
            </div>
        </a>
    </div>

</div>
<?php require'bottom_menu.php'; ?>

</body>
</html>