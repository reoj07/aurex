<?php
$currentPage = basename($_SERVER['PHP_SELF']);

$selected = strtoupper($_GET['currency'] ?? '');

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

$tokenColors = [
    "USDT" => "#30c59b",
    "ETH" => "#b0b4be",
    "USDC" => "#2775ca",
];

$data = $wallets[$selected] ?? null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Deposit Crypto</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<link rel="stylesheet" href="./assets/common.css">
<link rel="stylesheet" href="./assets/pages/deposit-crypto.css">
</head>

<body data-static-route="/deposit/crypto" data-page="deposit-crypto">
<div id="root">
<div class="app-shell">

<?php if(!$data): ?>

    <div class="screen no-bottom-nav deposit-currency-screen crypto-currency-picker">
        <header class="deposit-currency-header">
            <a href="home.php" class="icon-button ghost deposit-currency-back" aria-label="Back to deposit methods">
                <i class="bi bi-chevron-left"></i>
            </a>
            <h1>Select Deposit Currency</h1>
        </header>

        <section class="deposit-currency-panel">
            <div class="deposit-currency-list">
                <?php foreach ($wallets as $symbol => $wallet): ?>
                    <a href="deposit_crypto.php?currency=<?= urlencode($symbol); ?>" class="deposit-currency-item">
                        <div class="deposit-currency-item-main">
                            <span class="token-badge" style="--token-color: <?= htmlspecialchars($tokenColors[$symbol]); ?>">
                                <?= htmlspecialchars(substr($symbol, 0, 1)); ?>
                            </span>
                            <strong><?= htmlspecialchars($symbol); ?></strong>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        </section>
    </div>

<?php else: ?>

    <div class="screen deposit-service-screen crypto-deposit-flow">
        <header class="page-title-row crypto-title-row">
            <a href="deposit_crypto.php" class="icon-button ghost" aria-label="Back to currency selection">
                <i class="bi bi-chevron-left"></i>
            </a>
            <h1>Recharge</h1>
            <a href="#" class="icon-button ghost" aria-label="Open records">
                <i class="bi bi-clipboard"></i>
            </a>
        </header>

        <?php if (isset($_GET['success'])): ?>
            <div class="crypto-alert success-alert" id="alertBox">
                <i class="bi bi-check-circle-fill"></i>
                <span>Deposit request submitted successfully and saved to database.</span>
            </div>
        <?php endif; ?>

        <?php if (isset($_GET['error'])): ?>
            <div class="crypto-alert error-alert" id="alertBox">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span>Failed to submit deposit request.</span>
            </div>
        <?php endif; ?>

        <section class="form-card crypto-card">
            <div class="label-line-between crypto-token-row">
                <div class="deposit-currency-item-main static-token">
                    <span class="token-badge" style="--token-color: <?= htmlspecialchars($tokenColors[$selected] ?? '#7f8ca3'); ?>">
                        <?= htmlspecialchars(substr($selected, 0, 1)); ?>
                    </span>
                    <strong><?= htmlspecialchars($selected); ?></strong>
                </div>
                <a href="deposit_crypto.php" class="inline-action">Select currency <i class="bi bi-chevron-right"></i></a>
            </div>
        </section>

        <section class="form-card crypto-card">
            <div class="detail-group">
                <h3>Network</h3>
                <p><?= htmlspecialchars($data['chain']); ?></p>
            </div>

            <div class="qr-box">
                <img src="<?= htmlspecialchars($data['qr']); ?>" class="qr-preview" alt="QR Code for <?= htmlspecialchars($selected); ?>">
            </div>

            <a href="<?= htmlspecialchars($data['qr']); ?>" download class="outline-action">Save the QR code</a>

            <div class="detail-group">
                <div class="label-line-between">
                    <h3>Deposit address</h3>
                </div>
                <div class="static-field crypto-address" id="walletAddress"><?= htmlspecialchars($data['address']); ?></div>
                <p class="crypto-copy-feedback" id="copyFeedback" aria-live="polite"></p>
                <button type="button" class="help-link" onclick="copyAddress()">Copy</button>
            </div>
        </section>

        <section class="form-card crypto-card">
            <h3 class="form-section-title">Deposit Form</h3>
            <p class="crypto-section-copy">
                Send the transfer first, then submit the amount, TX hash, and proof for verification.
            </p>

            <form action="../controls/insert_deposit.php" method="POST" enctype="multipart/form-data" class="crypto-form-stack">
                <input type="hidden" name="currency" value="<?= htmlspecialchars($selected); ?>">
                <input type="hidden" name="chain" value="<?= htmlspecialchars($data['chain']); ?>">
                <input type="hidden" name="wallet_address" value="<?= htmlspecialchars($data['address']); ?>">

                <label class="field-label" for="depositAmount">Deposit amount (<?= htmlspecialchars($selected); ?>)</label>
                <input id="depositAmount" class="crypto-field" type="number" step="0.000001" name="amount" placeholder="Enter <?= htmlspecialchars($selected); ?> amount" required>

                <label class="field-label" for="transactionHash">Transaction hash</label>
                <input id="transactionHash" class="crypto-field" type="text" name="transaction_hash" placeholder="Paste the blockchain transaction hash" required>

                <label class="crypto-upload" for="proofUpload">
                    <span>Proof of transfer</span>
                    <strong>Choose screenshot or receipt image</strong>
                    <input id="proofUpload" type="file" name="proof" accept="image/*,.pdf" required>
                </label>

                <button type="submit" class="primary-action">Submit For Admin Approval</button>
            </form>
        </section>

        <section class="form-card crypto-card">
            <h3 class="form-section-title">Deposit tracking</h3>
            <div class="detail-group compact">
                <h3>Current Exchange balance</h3>
                <p>0.00 <?= htmlspecialchars($selected); ?></p>
            </div>
            <p class="crypto-empty-state">No crypto deposit requests submitted yet.</p>
        </section>

        <section class="form-card crypto-card notice-card">
            <h3>Important Notice</h3>
            <ol>
                <li>Please select the above-mentioned token system and currency type and transfer the corresponding amount for deposit.</li>
                <li>After you recharge the above address, you need to confirm the entire network node before it can be credited.</li>
                <li>Please make sure your computer and browser are safe to prevent information from being tampered with.</li>
            </ol>
        </section>
    </div>

<?php endif; ?>

</div>
 </div>
<?php require'bottom_menu.php'; ?>

<script>
function copyAddress(){
    const addressNode = document.getElementById("walletAddress");
    const feedbackNode = document.getElementById("copyFeedback");

    if (!addressNode || !feedbackNode) {
        return;
    }

    navigator.clipboard.writeText(addressNode.innerText).then(function(){
        feedbackNode.textContent = "Deposit address copied.";
        feedbackNode.classList.add("visible");
    }).catch(function(){
        feedbackNode.textContent = "Copy failed. Please copy the address manually.";
        feedbackNode.classList.add("visible", "error");
    });

    window.clearTimeout(window.copyFeedbackTimer);
    window.copyFeedbackTimer = window.setTimeout(function(){
        feedbackNode.classList.remove("visible", "error");
    }, 2400);
}
</script>

</body>
</html>