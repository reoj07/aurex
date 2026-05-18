<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Buy with PHP</title>

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
    background:#202734;
    padding:12px 15px 95px;
}

/* HEADER */
.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:25px;
}

.header a{
    color:#fff;
    text-decoration:none;
    font-size:18px;
}

/* TABS */
.tabs{
    width:190px;
    height:48px;
    background:#2a3140;
    border-radius:28px;
    display:flex;
    padding:3px;
    margin-bottom:35px;
}

.tabs a{
    flex:1;
    text-decoration:none;
    color:#9faac0;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:25px;
    font-size:14px;
    font-weight:bold;
}

.tabs a.active{
    background:#f1f4fb;
    color:#111927;
}

/* AMOUNT */
.amount-section{
    margin-bottom:35px;
}

.amount-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.amount-display{
    font-size:88px;
    font-weight:900;
    color:#535c70;
    line-height:1;
}

.currency{
    color:#fff;
    text-decoration:none;
    font-weight:bold;
    font-size:14px;
}

.amount-usdt{
    margin-top:10px;
    font-size:14px;
}

.balance{
    margin-top:12px;
    color:#9eb0cd;
    font-size:13px;
}

/* OPTION ROW */
.option-row{
    display:flex;
    align-items:center;
    gap:14px;
    min-height:76px;
    border-bottom:1px solid rgba(255,255,255,.08);
    text-decoration:none;
    color:#fff;
}

.option-icon{
    width:36px;
    height:36px;
    border-radius:50%;
    background:#1fc69a;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
}

.option-icon.wallet{
    background:#363629;
    color:#d5b64f;
}

.option-info{
    flex:1;
}

.option-info h3{
    font-size:15px;
    margin-bottom:10px;
}

.option-info p{
    color:#40e4cd;
    font-size:13px;
}

.option-info p.gray{
    color:#9ba8bd;
}

/* QUICK AMOUNT */
.quick-amounts{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:10px;
    margin:15px 0 25px;
}

.quick-amounts button{
    height:46px;
    background:transparent;
    color:#fff;
    border:1px solid rgba(255,255,255,.16);
    border-radius:13px;
    font-size:16px;
    font-weight:bold;
    cursor:pointer;
}

/* KEYPAD */
.keypad{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:30px 10px;
    margin-top:20px;
    text-align:center;
}

.key{
    background:transparent;
    border:none;
    color:#fff;
    font-size:28px;
    font-weight:bold;
    cursor:pointer;
    padding:8px;
}

/* BUTTON */
.submit-btn{
    width:100%;
    height:44px;
    border:none;
    border-radius:30px;
    background:#f0c65d;
    color:#fff;
    font-weight:bold;
    font-size:14px;
    margin-top:24px;
    cursor:pointer;
}

.hidden-input{
    display:none;
}
</style>
</head>

<body>

<div class="mobile-app">

    <div class="header">
        <a href="deposit.php"><i class="bi bi-chevron-left"></i></a>
        <a href="#"><i class="bi bi-clipboard"></i></a>
    </div>

    <div class="tabs">
        <a href="#" class="active">Buy</a>
        <a href="#">Sell</a>
    </div>

    <form action="select_admin.php" method="POST">

        <input type="hidden" name="amount" id="amountInput" value="0">
        <input type="hidden" name="currency" value="PHP">
        <input type="hidden" name="crypto" value="USDT">
        <input type="hidden" name="payment_method" value="Bank Transfer">

        <div class="amount-section">
            <div class="amount-row">
                <div class="amount-display" id="amountDisplay">0</div>

                <a href="#" class="currency">
                    PHP <i class="bi bi-chevron-down"></i>
                </a>
            </div>

            <div class="amount-usdt">
                ≈ <span id="usdtValue">0.00</span> USDT
            </div>

            <div class="balance">
                Account balance: 0.00 USDT
            </div>
        </div>

        <a href="select_currency.php" class="option-row">
            <div class="option-icon">U</div>
            <div class="option-info">
                <h3>Buy</h3>
                <p>USDT | 3.81% APR</p>
            </div>
            <i class="bi bi-chevron-right"></i>
        </a>

        <a href="payment_method.php" class="option-row">
            <div class="option-icon wallet">
                <i class="bi bi-wallet2"></i>
            </div>
            <div class="option-info">
                <h3>Payment method</h3>
                <p class="gray">Bank Transfer</p>
            </div>
            <i class="bi bi-chevron-right"></i>
        </a>

        <div class="quick-amounts">
            <button type="button" onclick="setAmount(0)">Min</button>
            <button type="button" onclick="setAmount(3000)">₱3,000</button>
            <button type="button" onclick="setAmount(100000)">Max</button>
        </div>

        <div class="keypad">
            <button type="button" class="key" onclick="pressKey('1')">1</button>
            <button type="button" class="key" onclick="pressKey('2')">2</button>
            <button type="button" class="key" onclick="pressKey('3')">3</button>

            <button type="button" class="key" onclick="pressKey('4')">4</button>
            <button type="button" class="key" onclick="pressKey('5')">5</button>
            <button type="button" class="key" onclick="pressKey('6')">6</button>

            <button type="button" class="key" onclick="pressKey('7')">7</button>
            <button type="button" class="key" onclick="pressKey('8')">8</button>
            <button type="button" class="key" onclick="pressKey('9')">9</button>

            <button type="button" class="key" onclick="pressKey('.')">.</button>
            <button type="button" class="key" onclick="pressKey('0')">0</button>
            <button type="button" class="key" onclick="backspace()">×</button>
        </div>

        <button type="submit" class="submit-btn">
            Select Admin To Continue
        </button>

    </form>

</div>

<script>
let amount = "0";
const usdtRate = 56.50;

function updateDisplay(){
    let cleanAmount = parseFloat(amount || 0);

    document.getElementById("amountDisplay").innerText = amount;
    document.getElementById("amountInput").value = cleanAmount;

    let usdt = cleanAmount / usdtRate;
    document.getElementById("usdtValue").innerText = usdt.toFixed(2);
}

function pressKey(key){
    if(key === "." && amount.includes(".")) return;

    if(amount === "0" && key !== "."){
        amount = key;
    }else{
        amount += key;
    }

    updateDisplay();
}

function backspace(){
    amount = amount.slice(0, -1);

    if(amount === ""){
        amount = "0";
    }

    updateDisplay();
}

function setAmount(value){
    amount = String(value);
    updateDisplay();
}

updateDisplay();
</script>

</body>
</html>