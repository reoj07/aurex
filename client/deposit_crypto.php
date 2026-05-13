<?php
$currentPage = basename($_SERVER['PHP_SELF']);

$selected = $_GET['currency'] ?? '';

$wallets = [
    "USDT" => [
        "chain" => "TRC20",
        "address" => "TRDYDZJ4r84pMjLxxwMKvgC8KnZURTBRvm",
        "note" => "Default TRC20 wallet for USDT deposits.",
        "qr" => "cryp.png"
    ],
    "ETH" => [
        "chain" => "ERC20",
        "address" => "0x0000000000000000000000000000000000000000",
        "note" => "Default ERC20 wallet for ETH deposits.",
        "qr" => "cryp.png"
    ],
    "USDC" => [
        "chain" => "ERC20",
        "address" => "0x1111111111111111111111111111111111111111",
        "note" => "Default ERC20 wallet for USDC deposits.",
        "qr" => "cryp.png"
    ],
];

$data = $wallets[$selected] ?? null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Deposit Crypto</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif}
body{background:#020b16;color:#fff;display:flex;justify-content:center}
.mobile-app{width:100%;max-width:390px;min-height:100vh;background:#07111f;padding-bottom:90px}

.header{
    height:46px;
    display:grid;
    grid-template-columns:32px 1fr 32px;
    align-items:center;
    padding:0 16px;
}
.header a{color:#fff;text-decoration:none;font-size:18px}
.header h1{text-align:center;font-size:25px}

.search-wrap{
    display:flex;
    align-items:center;
    gap:10px;
    padding:6px 18px 14px;
}
.search-box{
    flex:1;
    height:28px;
    border:1px solid rgba(255,255,255,.22);
    border-radius:20px;
    display:flex;
    align-items:center;
    gap:8px;
    padding:0 14px;
    color:#c8d2e5;
}
.search-box input{
    flex:1;
    background:transparent;
    border:0;
    outline:0;
    color:#fff;
}

.card{
    margin:0 16px 14px;
    background:#0b1828;
    border-radius:16px;
    padding:16px 14px;
}

.currency-card{
    display:flex;
    align-items:center;
    gap:12px;
    height:46px;
    padding:0 14px;
    background:#171c23;
    border:1px solid rgba(255,255,255,.06);
    border-radius:13px;
    color:#fff;
    text-decoration:none;
    margin-top:12px;
    font-weight:bold;
}

.coin{
    width:21px;
    height:21px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:12px;
    font-weight:bold;
    color:#fff;
}
.usdt{background:#22c79c}
.eth{background:#9aa0aa}
.usdc{background:#2f7ddc}

.method-card{
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.method-card small{
    color:#8ea1c0;
    letter-spacing:1px;
}
.method-card h3{
    margin-top:14px;
    font-size:14px;
}
.method-card a{
    border:1px solid #e4bd4f;
    border-radius:24px;
    padding:10px 28px;
    color:#ffd24f;
    text-decoration:none;
    font-size:13px;
}

.currency-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:0 16px 12px;
}
.currency-left{
    display:flex;
    align-items:center;
    gap:10px;
    font-weight:bold;
}
.currency-row a{
    color:#fff;
    text-decoration:none;
    font-size:13px;
}

.deposit-box h4,
.form-box h4{
    font-size:14px;
    margin-bottom:12px;
}
.chain{
    color:#dce6ff;
    font-size:13px;
}
.chain span{color:#8392a8}
.qr{
    display:block;
    width:95px;
    height:95px;
    object-fit:cover;
    margin:26px auto 26px;
    background:#fff;
}
.btn-outline{
    display:block;
    width:150px;
    margin:0 auto 20px;
    padding:10px;
    border:1px solid #ffd24f;
    color:#ffd24f;
    text-align:center;
    border-radius:25px;
    text-decoration:none;
    font-size:12px;
}
.address{
    font-size:12px;
    font-weight:bold;
    word-break:break-all;
    margin:12px 0;
}
.btn-main{
    width:100%;
    border:0;
    border-radius:28px;
    padding:14px;
    background:#f0c65d;
    color:#fff;
    font-weight:bold;
    font-size:14px;
    cursor:pointer;
}

.info{
    line-height:1.8;
    font-size:13px;
    color:#9fb0cc;
}
.info b{color:#fff}

.form-box label{
    display:block;
    font-size:14px;
    font-weight:bold;
    margin:16px 0 8px;
}
.form-box input,
.form-box textarea{
    width:100%;
    background:#07111e;
    border:1px solid rgba(255,255,255,.08);
    border-radius:12px;
    color:#fff;
    padding:15px;
    outline:none;
}
.form-box textarea{
    min-height:130px;
    resize:vertical;
}
.upload{
    border:1px dashed rgba(255,255,255,.18);
    border-radius:14px;
    padding:18px 14px;
    margin:16px 0;
    color:#9fb0cc;
    font-size:12px;
}
.upload strong{
    display:block;
    color:#fff;
    margin:14px 0;
}

.center-text{
    text-align:center;
    color:#9fb0cc;
    font-size:13px;
    line-height:1.8;
}
.notice ol{
    padding-left:18px;
    line-height:1.8;
    font-size:13px;
}
.notice li{margin-bottom:10px}

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
.bottom-nav a.active{
    background:#132640;
    color:#ffd33f;
    font-weight:bold;
}
</style>
</head>

<body>
<div class="mobile-app">

<?php if(!$data): ?>

    <div class="search-wrap">
        <a href="deposit.php" style="color:#fff"><i class="bi bi-chevron-left"></i></a>
        <div class="search-box">
            <i class="bi bi-search"></i>
            <input type="text">
        </div>
        <a href="#" style="color:#fff"><i class="bi bi-clipboard"></i></a>
    </div>

    <div class="card">
        <h3>Select The Currency You Want To Recharge</h3>

        <a href="deposit_crypto.php?currency=USDT" class="currency-card">
            <span class="coin usdt">U</span> USDT
        </a>

        <a href="deposit_crypto.php?currency=ETH" class="currency-card">
            <span class="coin eth">E</span> ETH
        </a>

        <a href="deposit_crypto.php?currency=USDC" class="currency-card">
            <span class="coin usdc">U</span> USDC
        </a>
    </div>

<?php else: ?>

    <div class="header">
        <a href="deposit_crypto.php"><i class="bi bi-chevron-left"></i></a>
        <h1>Recharge</h1>
        <a href="#"><i class="bi bi-clipboard"></i></a>
    </div>
<?php if(isset($_GET['success'])): ?>
    <div class="alert-box success-alert" id="alertBox">
        <i class="bi bi-check-circle-fill"></i>
        Deposit request submitted successfully and saved to database!
    </div>
<?php endif; ?>

<?php if(isset($_GET['error'])): ?>
    <div class="alert-box error-alert" id="alertBox">
        <i class="bi bi-exclamation-triangle-fill"></i>
        Failed to submit deposit request!
    </div>
<?php endif; ?>
    <div class="card method-card">
        <div>
            <small>DEPOSIT METHOD</small>
            <h3>Deposit Crypto</h3>
        </div>
        <a href="deposit.php">Select Method</a>
    </div>

    <div class="currency-row">
        <div class="currency-left">
            <span class="coin <?= strtolower($selected); ?>">
                <?= substr($selected,0,1); ?>
            </span>
            <?= htmlspecialchars($selected); ?>
        </div>
        <a href="deposit_crypto.php">Select currency <i class="bi bi-chevron-right"></i></a>
    </div>

    <div class="card deposit-box">
        <h4>Chain name:</h4>
        <div class="chain"><?= htmlspecialchars($data['chain']); ?><span>ERC20</span></div>

        <img src="<?= htmlspecialchars($data['qr']); ?>" class="qr" alt="QR Code">

        <a href="<?= htmlspecialchars($data['qr']); ?>" download class="btn-outline">
            Save the QR code
        </a>

        <h4>Deposit address</h4>
        <div class="address" id="walletAddress"><?= htmlspecialchars($data['address']); ?></div>

        <button type="button" class="btn-main" onclick="copyAddress()">Copy</button>
    </div>

    <div class="card info">
        <p><b>Offsite link:</b>No offsite link configured.</p>
        <p><b>Admin note:</b><?= htmlspecialchars($data['note']); ?></p>
    </div>

    <div class="card form-box">
        <h4>Submit deposit for approval</h4>
        <p class="center-text">
            Send the transfer first, then submit the amount, TX hash, and proof so admin can verify and credit your Exchange asset balance.
        </p>

        <form action="../controls/insert_deposit.php" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="currency" value="<?= htmlspecialchars($selected); ?>">
            <input type="hidden" name="chain" value="<?= htmlspecialchars($data['chain']); ?>">
            <input type="hidden" name="wallet_address" value="<?= htmlspecialchars($data['address']); ?>">

            <label>Deposit amount (<?= htmlspecialchars($selected); ?>)</label>
            <input type="number" step="0.000001" name="amount" placeholder="Enter <?= htmlspecialchars($selected); ?> amount" required>

            <label>Transaction hash</label>
            <input type="text" name="transaction_hash" placeholder="Paste the blockchain transaction hash" required>

            <label>Transfer note</label>
            <textarea name="note" placeholder="Wallet app note, sending platform, or any detail admin should verify."></textarea>

            <div class="upload">
                Proof of transfer
                <strong>Choose screenshot or receipt image</strong>
                <input type="file" name="proof" accept="image/*,.pdf" required>
            </div>

            <button type="submit" class="btn-main">Submit For Admin Approval</button>
        </form>
    </div>

    <div class="card">
        <h4>Deposit tracking</h4>
        <br>
        <p><b>Current Exchange balance:</b> <span style="color:#9fb0cc">0.00 <?= htmlspecialchars($selected); ?></span></p>
        <br>
        <p class="center-text">No crypto deposit requests submitted yet.</p>
    </div>

    <div class="card notice">
        <h3>Important Notice</h3>
        <br>
        <ol>
            <li>Please select the above-mentioned token system and currency type and transfer the corresponding amount for deposit.</li>
            <li>After you recharge the above address, you need to confirm the entire network node before it can be credited.</li>
            <li>Please make sure your computer and browser are safe to prevent information from being tampered with.</li>
        </ol>
    </div>

<?php endif; ?>

</div>
<?php require'bottom_menu.php'; ?>

<script>
function copyAddress(){
    const address = document.getElementById("walletAddress").innerText;

    navigator.clipboard.writeText(address).then(function(){
        alert("Deposit address copied!");
    });
}
</script>

</body>
</html>