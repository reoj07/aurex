<?php
$mode = $_GET['buy'] ?? '';

$ads = [
    [
        "id" => 1,
        "user" => "User-416f1",
        "price" => "59.87",
        "trades" => "21 Trades (100.00%) | 100.00%",
        "limit" => "5,000 PHP - 33,000 PHP",
        "available" => "1262.13 USDT",
        "payment" => "Bank Transfer",
        "time" => "15 min",
        "badge" => "gold"
    ],
    [
        "id" => 2,
        "user" => "User-c6f49",
        "price" => "59.91",
        "trades" => "698 Trades (100.00%) | 72.73%",
        "limit" => "5,000 PHP - 23,000 PHP",
        "available" => "511.70 USDT",
        "payment" => "Bank Transfer",
        "time" => "15 min",
        "badge" => "gray"
    ],
    [
        "id" => 3,
        "user" => "xm631975",
        "price" => "59.92",
        "trades" => "652 Trades (100.00%) | 87.22%",
        "limit" => "1,000 PHP - 12,956 PHP",
        "available" => "216.23 USDT",
        "payment" => "Bank Transfer",
        "time" => "15 min",
        "badge" => "gold"
    ],
];

$selected = null;
foreach($ads as $ad){
    if($mode == $ad['id']){
        $selected = $ad;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>P2P Trading</title>

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
    background:#282e38;
    padding-bottom:30px;
}

.header{
    height:56px;
    display:flex;
    align-items:center;
    gap:18px;
    padding:0 16px;
}

.header a{
    color:#fff;
    text-decoration:none;
}

.top-tabs{
    display:grid;
    grid-template-columns:1fr 1fr 1fr auto;
    align-items:center;
    gap:12px;
    padding:10px 16px;
    font-weight:bold;
    color:#b8c5df;
    font-size:13px;
}

.top-tabs .active{
    color:#fff;
}

.currency-pill{
    border:1px solid rgba(255,255,255,.25);
    padding:10px 14px;
    border-radius:12px;
    color:#fff;
    text-decoration:none;
}

.buy-sell{
    width:135px;
    height:45px;
    background:#343b48;
    border-radius:18px;
    display:flex;
    padding:3px;
    margin:8px 16px;
}

.buy-sell a{
    flex:1;
    text-decoration:none;
    color:#aebbd4;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:15px;
    font-weight:bold;
    font-size:13px;
}

.buy-sell a.active{
    background:#f3f6fb;
    color:#111827;
}

.filters{
    display:flex;
    gap:8px;
    padding:6px 14px 10px;
}

.filter{
    color:#fff;
    text-decoration:none;
    border:1px solid rgba(255,255,255,.22);
    border-radius:10px;
    padding:8px 10px;
    font-size:13px;
    display:flex;
    align-items:center;
    gap:6px;
}

.coin{
    width:20px;
    height:20px;
    border-radius:50%;
    background:#23c59b;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    font-size:11px;
    font-weight:bold;
}

.ads-list{
    padding:0 14px;
}

.ad-card{
    padding:22px 0;
    border-bottom:1px solid rgba(255,255,255,.08);
}

.ad-user{
    display:flex;
    align-items:center;
    gap:10px;
    font-size:14px;
    font-weight:bold;
}

.avatar{
    width:27px;
    height:27px;
    border-radius:50%;
    background:#545c6c;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:13px;
}

.dot{
    width:8px;
    height:8px;
    border-radius:50%;
    display:inline-block;
}

.gold{
    background:#d7b765;
}

.gray{
    background:#9aa5b6;
}

.online-dot{
    background:#26d3b4;
}

.trade{
    color:#c4d4f4;
    font-size:13px;
    margin:8px 0 18px 35px;
}

.price-row{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
}

.price{
    font-size:22px;
    font-weight:bold;
}

.method{
    text-align:right;
    font-size:13px;
    font-weight:bold;
}

.time{
    color:#c4d4f4;
    font-size:13px;
    margin-top:18px;
}

.limit{
    color:#c4d4f4;
    font-size:13px;
    margin-top:18px;
}

.available{
    color:#c4d4f4;
    font-size:13px;
    margin-top:12px;
}

.buy-btn{
    float:right;
    width:88px;
    height:37px;
    border-radius:9px;
    background:#3abd86;
    color:#fff;
    text-decoration:none;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    margin-top:-28px;
}

/* ORDER PAGE */
.order-head{
    height:66px;
    display:flex;
    align-items:center;
    gap:14px;
    padding:0 14px;
}

.order-title h1{
    font-size:21px;
}

.order-title p{
    font-size:13px;
    margin-top:4px;
}

.refresh{
    margin-left:auto;
    color:#fff;
}

.order-card{
    margin:6px 12px 14px;
    padding:18px 13px;
    background:#353b45;
    border:1px solid rgba(255,255,255,.05);
    border-radius:20px;
}

.order-tabs{
    display:flex;
    gap:28px;
    font-size:13px;
    font-weight:bold;
}

.order-tabs .active{
    color:#fff;
    position:relative;
}

.order-tabs .active::after{
    content:"";
    position:absolute;
    left:0;
    bottom:-12px;
    width:42px;
    height:3px;
    background:#f0c65d;
    border-radius:10px;
}

.amount-row{
    height:135px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-bottom:1px solid rgba(255,255,255,.08);
}

.amount{
    font-size:58px;
    font-weight:bold;
    color:#b7c1d5;
}

.php{
    font-size:13px;
    font-weight:bold;
}

.max{
    color:#f0c65d;
    margin-left:12px;
}

.receive{
    color:#c2cce0;
    margin-top:22px;
    font-weight:bold;
}

.pay-card{
    margin:0 12px 14px;
    padding:20px 14px;
    background:#353b45;
    border:1px solid rgba(255,255,255,.05);
    border-radius:16px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.green-line{
    width:3px;
    height:25px;
    background:#20d7b0;
    border-radius:10px;
    margin-right:10px;
}

.pay-left{
    display:flex;
    align-items:center;
}

.order-section{
    padding:0 12px 16px;
}

.order-section h3{
    font-size:15px;
    margin-bottom:18px;
}

.earn-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:18px;
    border-bottom:1px solid rgba(255,255,255,.08);
}

.apr{
    color:#20d7b0;
    margin-top:14px;
    font-size:13px;
}

.switch{
    width:16px;
    height:16px;
    border-radius:50%;
    background:#fff;
}

.ad-info{
    padding:20px 12px;
}

.ad-info h3{
    font-size:15px;
    margin-bottom:24px;
}

.ad-info-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:26px;
}

.online{
    color:#fff;
    font-size:13px;
}

.warning{
    font-size:13px;
    line-height:1.9;
}

.place-order{
    width:calc(100% - 24px);
    height:45px;
    margin:18px 12px;
    border:none;
    border-radius:9px;
    background:#3abd86;
    color:#fff;
    font-weight:bold;
    font-size:15px;
}
</style>
</head>

<body>

<div class="mobile-app">

<?php if(!$selected): ?>

    <div class="top-tabs">
        <a href="deposit.php" style="color:#fff;text-decoration:none;"><i class="bi bi-chevron-left"></i></a>
        <span>Express</span>
        <span class="active">P2P</span>
        <span>Block Trade</span>
        <a href="#" class="currency-pill">PHP <i class="bi bi-chevron-down"></i></a>
    </div>

    <div class="buy-sell">
        <a href="#" class="active">Buy</a>
        <a href="#">Sell</a>
    </div>

    <div class="filters">
        <a href="#" class="filter">
            <span class="coin">U</span> USDT <i class="bi bi-chevron-down"></i>
        </a>
        <a href="#" class="filter">Amount <i class="bi bi-chevron-down"></i></a>
        <a href="#" class="filter">Payment <i class="bi bi-chevron-down"></i></a>
    </div>

    <div class="ads-list">
        <?php foreach($ads as $ad): ?>
        <div class="ad-card">
            <div class="ad-user">
                <div class="avatar"><?= strtoupper(substr($ad['user'],0,1)); ?></div>
                <?= htmlspecialchars($ad['user']); ?>
                <span class="dot <?= $ad['badge']; ?>"></span>
            </div>

            <div class="trade">
                Trade: <?= htmlspecialchars($ad['trades']); ?>
            </div>

            <div class="price-row">
                <div class="price">₱ <?= htmlspecialchars($ad['price']); ?>/USDT</div>
                <div class="method">
                    <?= htmlspecialchars($ad['payment']); ?>
                    <div class="time"><?= htmlspecialchars($ad['time']); ?></div>
                </div>
            </div>

            <div class="limit">Limit <?= htmlspecialchars($ad['limit']); ?></div>
            <div class="available">Available <?= htmlspecialchars($ad['available']); ?></div>

            <a href="p2p.php?buy=<?= $ad['id']; ?>" class="buy-btn">Buy</a>
        </div>
        <?php endforeach; ?>
    </div>

<?php else: ?>

    <div class="order-head">
        <a href="p2p.php" style="color:#fff;text-decoration:none;"><i class="bi bi-chevron-left"></i></a>
        <span class="coin">U</span>
        <div class="order-title">
            <h1>Buy USDT</h1>
            <p>Price ₱ <?= htmlspecialchars($selected['price']); ?></p>
        </div>
        <a href="#" class="refresh"><i class="bi bi-arrow-repeat"></i></a>
    </div>

    <form action="place_order.php" method="POST">
        <input type="hidden" name="seller" value="<?= htmlspecialchars($selected['user']); ?>">
        <input type="hidden" name="price" value="<?= htmlspecialchars($selected['price']); ?>">

        <div class="order-card">
            <div class="order-tabs">
                <span class="active">By PHP</span>
                <span>By USDT</span>
            </div>

            <div class="amount-row">
                <input 
                    type="number" 
                    name="php_amount" 
                    id="phpAmount" 
                    value="0"
                    min="0"
                    style="width:60%;background:transparent;border:0;outline:0;color:#b7c1d5;font-size:58px;font-weight:bold;"
                    oninput="calculateReceive()"
                >

                <div class="php">
                    PHP <span class="max" onclick="setMax()">Max</span>
                </div>
            </div>

            <div class="limit">
                Limit <?= htmlspecialchars($selected['limit']); ?>
            </div>

            <div class="receive">
                You Receive <span id="receiveAmount">0</span> USDT
            </div>
        </div>

        <div class="pay-card">
            <div class="pay-left">
                <div class="green-line"></div>
                <div>
                    <strong>Bank Transfer</strong>
                    <div style="margin-top:12px;color:#c2cce0;font-size:13px;">2</div>
                </div>
            </div>
            <i class="bi bi-chevron-right"></i>
        </div>

        <div class="order-section">
            <h3>Subscribe to Earn</h3>

            <div class="earn-row">
                <div>
                    <strong>Enable Auto-Earn</strong>
                    <div class="apr">3.84% APR</div>
                </div>
                <div class="switch"></div>
            </div>
        </div>

        <div class="ad-info">
            <h3>Advertiser's Info</h3>

            <div class="ad-info-row">
                <div>
                    <strong><?= htmlspecialchars($selected['user']); ?></strong>
                    <span class="dot <?= $selected['badge']; ?>"></span>
                </div>

                <div class="online">
                    <span class="dot online-dot"></span> Online
                    <i class="bi bi-chevron-right"></i>
                </div>
            </div>

            <div class="warning">
                STRICTLY NO THIRD PARTY PAYMENT<br><br>
                PLEASE DO NOT PROCEED WITH THE PAYMENT WHEN I'M NOT REPLYING WITH YOUR CHAT TO AVOID ANY INCONVENIENCES
            </div>
        </div>

        <button type="submit" class="place-order">
            Place Order
        </button>
    </form>

<?php endif; ?>

</div>

<script>
const price = <?= $selected ? json_encode((float)$selected['price']) : '0'; ?>;

function calculateReceive(){
    const amount = parseFloat(document.getElementById("phpAmount").value || 0);
    const receive = price > 0 ? amount / price : 0;
    document.getElementById("receiveAmount").innerText = receive.toFixed(2);
}

function setMax(){
    document.getElementById("phpAmount").value = 33000;
    calculateReceive();
}

calculateReceive();
</script>

</body>
</html>