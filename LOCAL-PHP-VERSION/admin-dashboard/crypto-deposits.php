<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURX Admin Crypto Deposits</title>
    <script type="module" crossorigin src="../assets/adminCryptoDeposits-CUcmdZyb.js"></script>
    <link rel="modulepreload" crossorigin href="../assets/modulepreload-polyfill-myak50gs.js">
    <link rel="modulepreload" crossorigin href="../assets/admin-shell-Bwa8fXXy.js">
    <link rel="modulepreload" crossorigin href="../assets/cryptoDepositRequests-BzHgtKAL.js">
    <link rel="stylesheet" crossorigin href="../assets/admin-shell-B-32n5du.css">
  </head>
  <body>
    <main class="admin-shell container-xxl py-4">
      <header class="navbar navbar-expand-lg admin-topbar-shell mb-4">
        <div class="container-fluid px-0">
          <a class="navbar-brand admin-brand" href="./index.php">AURX Admin</a>
          <button class="navbar-toggler admin-nav-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#admin-nav-links" aria-controls="admin-nav-links" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="collapse navbar-collapse" id="admin-nav-links">
            <div class="navbar-nav ms-auto admin-nav gap-lg-2">
              <a href="./index.php" class="nav-link">Invite Codes</a>
              <a href="./invite-history.php" class="nav-link">Invite History</a>
              <a href="./share-settings.php" class="nav-link">Share Settings</a>
              <a href="./products.php" class="nav-link">Trade Products</a>
              <a href="./payments.php" class="nav-link">PHP Payments</a>
              <a href="./crypto-deposits.php" class="nav-link active">Crypto Deposits</a>
            </div>
          </nav>
        </div>
      </header>

      <section class="admin-hero compact-hero">
        <div>
          <p class="eyebrow">Admin Dashboard</p>
          <h1>Crypto Deposit Control</h1>
          <p class="hero-copy">Configure wallet addresses and QR codes per currency and chain, review submitted transfer proofs, approve successful deposits, and credit the user's Exchange asset balance automatically.</p>
        </div>
        <div class="hero-card" id="crypto-summary"></div>
      </section>

      <section class="admin-grid row g-4">
        <section class="panel card border-0 col-12 col-xl-6">
          <div class="panel-head">
            <div>
              <span class="panel-label">Wallet Manager</span>
              <h2>Configure deposit wallets</h2>
            </div>
          </div>

          <form id="crypto-wallet-form" class="invite-form">
            <input type="hidden" id="wallet-id" />
            <div class="two-up">
              <label>
                <span>Currency</span>
                <input class="form-control" id="wallet-asset" type="text" placeholder="USDT" required />
              </label>
              <label>
                <span>Chain</span>
                <input class="form-control" id="wallet-chain" type="text" placeholder="TRC20" required />
              </label>
            </div>

            <label>
              <span>Wallet address</span>
              <input class="form-control" id="wallet-address" type="text" placeholder="Paste receiving wallet address" required />
            </label>

            <label>
              <span>Offsite link</span>
              <input class="form-control" id="wallet-offsite-link" type="text" placeholder="Optional explorer or hosted QR link" />
            </label>

            <label>
              <span>Wallet note</span>
              <textarea class="form-control" id="wallet-note" rows="4" placeholder="Network note, minimum confirmations, memo rules, or instructions."></textarea>
            </label>

            <label class="wallet-upload-field" for="wallet-qr-upload">
              <span>QR image</span>
              <strong id="wallet-qr-file-name">Choose QR image</strong>
              <input id="wallet-qr-upload" type="file" accept="image/*" />
            </label>

            <div id="wallet-qr-preview" class="wallet-qr-preview empty-state"><strong>No QR uploaded</strong><p>Wallet QR preview will appear here.</p></div>

            <div class="form-actions">
              <button type="submit" class="primary-button btn btn-warning">Save Wallet</button>
              <button type="button" id="wallet-reset" class="secondary-button btn btn-outline-light">Reset Form</button>
            </div>
          </form>
        </section>

        <section class="panel history-panel card border-0 col-12 col-xl-6">
          <div class="panel-head">
            <div>
              <span class="panel-label">Configured Wallets</span>
              <h2>Currency and chain records</h2>
            </div>
          </div>
          <div id="wallet-list" class="history-list admin-list-host"></div>
        </section>
      </section>

      <section class="admin-grid single-column-grid row g-4">
        <section class="panel history-panel card border-0 col-12">
          <div class="panel-head">
            <div>
              <span class="panel-label">Pending Queue</span>
              <h2>Awaiting blockchain verification</h2>
            </div>
          </div>
          <div id="pending-crypto-list" class="history-list admin-table-wrap"></div>
        </section>

        <section class="panel history-panel card border-0 col-12">
          <div class="panel-head">
            <div>
              <span class="panel-label">Processed Requests</span>
              <h2>Approved and rejected deposits</h2>
            </div>
          </div>
          <div id="processed-crypto-list" class="history-list admin-table-wrap"></div>
        </section>
      </section>

      <div class="offcanvas offcanvas-end offcanvas-admin" tabindex="-1" id="cryptoDetailOffcanvas" aria-labelledby="cryptoDetailOffcanvasLabel">
        <div class="offcanvas-header">
          <div>
            <span class="panel-label d-block mb-1">Crypto Operations</span>
            <h5 class="offcanvas-title mb-0" id="cryptoDetailOffcanvasLabel">Record details</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" id="crypto-detail-body"></div>
      </div>

      <p id="crypto-status-message" class="status-message"></p>
    </main>

  </body>
</html>