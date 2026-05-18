<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURX Admin Invite Codes</title>
    <script type="module" crossorigin src="../assets/admin-nV6c_eT0.js"></script>
    <link rel="modulepreload" crossorigin href="../assets/modulepreload-polyfill-myak50gs.js">
    <link rel="modulepreload" crossorigin href="../assets/admin-shell-Bwa8fXXy.js">
    <link rel="modulepreload" crossorigin href="../assets/inviteOrders-Cv8S0Irf.js">
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
              <a href="./index.php" class="nav-link active">Invite Codes</a>
              <a href="./invite-history.php" class="nav-link">Invite History</a>
              <a href="./share-settings.php" class="nav-link">Share Settings</a>
              <a href="./products.php" class="nav-link">Trade Products</a>
              <a href="./payments.php" class="nav-link">PHP Payments</a>
              <a href="./crypto-deposits.php" class="nav-link">Crypto Deposits</a>
            </div>
          </nav>
        </div>
      </header>

      <section class="admin-hero row g-4 align-items-stretch">
        <div>
          <p class="eyebrow">Admin Dashboard</p>
          <h1>Invite Signal Generator</h1>
          <p class="hero-copy">Generate follow-up trade codes for the user dashboard, copy them, and keep the latest invites isolated in this admin-only HTML workspace.</p>
        </div>
        <div class="hero-card">
          <span>Storage</span>
          <strong>Shared browser local storage</strong>
          <p>Generated codes are immediately available to the user dashboard on the same browser.</p>
        </div>
      </section>

      <section class="admin-grid row g-4">
        <section class="panel form-panel card border-0 col-12 col-xl-7">
          <div class="panel-head">
            <div>
              <span class="panel-label">Create Invite</span>
              <h2>Signal details</h2>
            </div>
            <button type="button" class="ghost-button btn btn-outline-light" id="reset-form">Reset</button>
          </div>

          <form id="invite-form" class="invite-form">
            <label>
              <span>Signal title</span>
              <input class="form-control" name="title" type="text" value="Boss K Trading Signal" required />
            </label>

            <div class="two-up">
              <label>
                <span>Trading pair</span>
                <input class="form-control" name="tradingPair" type="text" value="BTC / USDT" required />
              </label>
              <label>
                <span>Direction</span>
                <select class="form-select" name="direction">
                  <option>Long</option>
                  <option>Short</option>
                </select>
              </label>
            </div>

            <div class="two-up">
              <label>
                <span>Purchase duration</span>
                <input class="form-control" name="purchaseDuration" type="text" value="60s" required />
              </label>
              <label>
                <span>Release time</span>
                <input class="form-control" name="releaseTime" type="text" value="2026/05/03 12:00:46" required />
              </label>
            </div>

            <div class="two-up">
              <label>
                  <span>Order percentage</span>
                  <input class="form-control" name="orderPercentage" type="number" min="0" max="100" step="0.01" value="25" required />
              </label>
              <label>
                <span>Rate of return (%)</span>
                <input class="form-control" name="rateOfReturn" type="number" min="0" step="0.01" value="63.70" required />
              </label>
            </div>

            <div class="two-up">
              <label>
                <span>Open price</span>
                <input class="form-control" name="openPrice" type="number" min="0" step="0.01" value="78328.34" />
              </label>
            </div>

            <label>
              <span>Note</span>
              <textarea class="form-control" name="note" rows="3" placeholder="Optional internal note for this invite order"></textarea>
            </label>

            <div class="form-actions">
              <button type="submit" class="primary-button btn btn-warning">Generate And Save Code</button>
              <button type="button" class="secondary-button btn btn-outline-light" id="copy-latest" disabled>Copy Latest Code</button>
            </div>
          </form>
        </section>

        <section class="panel preview-panel card border-0 col-12 col-xl-5">
          <div class="panel-head">
            <div>
              <span class="panel-label">Latest Output</span>
              <h2>Generated invite code</h2>
            </div>
          </div>

          <div id="latest-preview" class="latest-preview empty-state">
            <strong>No code generated yet</strong>
            <p>Create a signal and copy the generated code into the user dashboard Invited Me section.</p>
          </div>

          <p id="status-message" class="status-message"></p>
        </section>
      </section>

      <section class="panel admin-links-panel card border-0">
        <div class="panel-head">
          <div>
            <span class="panel-label">Admin Areas</span>
            <h2>Jump to functions</h2>
          </div>
          <button type="button" class="btn btn-outline-light ghost-button" data-bs-toggle="offcanvas" data-bs-target="#adminAreasOffcanvas" aria-controls="adminAreasOffcanvas">Open Navigator</button>
        </div>

        <div class="list-group admin-list-group">
          <a class="list-group-item list-group-item-action admin-list-group-item" href="./invite-history.php">
            <div class="d-flex w-100 justify-content-between align-items-start gap-3">
              <div>
                <strong>Invite History</strong>
                <p class="mb-0">Copy, inspect, or delete previously generated invite codes without touching the generator.</p>
              </div>
              <span class="badge text-bg-warning rounded-pill">Codes</span>
            </div>
          </a>
          <a class="list-group-item list-group-item-action admin-list-group-item" href="./share-settings.php">
            <div class="d-flex w-100 justify-content-between align-items-start gap-3">
              <div>
                <strong>Share Settings</strong>
                <p class="mb-0">Control the domain used when each user dashboard generates its own personal invitation link.</p>
              </div>
              <span class="badge text-bg-warning rounded-pill">Domain</span>
            </div>
          </a>
          <a class="list-group-item list-group-item-action admin-list-group-item" href="./products.php">
            <div class="d-flex w-100 justify-content-between align-items-start gap-3">
              <div>
                <strong>Trade Products</strong>
                <p class="mb-0">Keep the trading catalog focused and save product visibility in one place.</p>
              </div>
              <span class="badge text-bg-warning rounded-pill">Catalog</span>
            </div>
          </a>
          <a class="list-group-item list-group-item-action admin-list-group-item" href="./payments.php">
            <div class="d-flex w-100 justify-content-between align-items-start gap-3">
              <div>
                <strong>PHP Payments</strong>
                <p class="mb-0">Review pending buy and sell requests and credit the correct user wallet flow.</p>
              </div>
              <span class="badge text-bg-warning rounded-pill">Queue</span>
            </div>
          </a>
          <a class="list-group-item list-group-item-action admin-list-group-item" href="./crypto-deposits.php">
            <div class="d-flex w-100 justify-content-between align-items-start gap-3">
              <div>
                <strong>Crypto Deposits</strong>
                <p class="mb-0">Update addresses, chains, QR images, and deposit approvals from one screen.</p>
              </div>
              <span class="badge text-bg-warning rounded-pill">Assets</span>
            </div>
          </a>
        </div>
      </section>

      <div class="offcanvas offcanvas-end offcanvas-admin" tabindex="-1" id="adminAreasOffcanvas" aria-labelledby="adminAreasOffcanvasLabel">
        <div class="offcanvas-header">
          <div>
            <span class="panel-label d-block mb-1">Admin Areas</span>
            <h5 class="offcanvas-title mb-0" id="adminAreasOffcanvasLabel">Quick navigator</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div class="list-group admin-list-group">
            <a class="list-group-item list-group-item-action admin-list-group-item" href="./invite-history.php">Invite History</a>
            <a class="list-group-item list-group-item-action admin-list-group-item" href="./share-settings.php">Share Settings</a>
            <a class="list-group-item list-group-item-action admin-list-group-item" href="./products.php">Trade Products</a>
            <a class="list-group-item list-group-item-action admin-list-group-item" href="./payments.php">PHP Payments</a>
            <a class="list-group-item list-group-item-action admin-list-group-item" href="./crypto-deposits.php">Crypto Deposits</a>
          </div>
        </div>
      </div>


    </main>

  </body>
</html>