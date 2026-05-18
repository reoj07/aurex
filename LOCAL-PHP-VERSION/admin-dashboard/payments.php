<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURX Admin Payment Requests</title>
    <script type="module" crossorigin src="../assets/adminPayments-C0m3TtvY.js"></script>
    <link rel="modulepreload" crossorigin href="../assets/modulepreload-polyfill-myak50gs.js">
    <link rel="modulepreload" crossorigin href="../assets/admin-shell-Bwa8fXXy.js">
    <link rel="modulepreload" crossorigin href="../assets/paymentRequests-_3SqHY3E.js">
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
              <a href="./payments.php" class="nav-link active">PHP Payments</a>
              <a href="./crypto-deposits.php" class="nav-link">Crypto Deposits</a>
            </div>
          </nav>
        </div>
      </header>

      <section class="admin-hero compact-hero">
        <div>
          <p class="eyebrow">Admin Dashboard</p>
          <h1>Payment Request Approval</h1>
          <p class="hero-copy">Review Buy with PHP requests submitted in Admin mode, approve them, and credit the user's Exchange balance.</p>
        </div>
        <div class="hero-card" id="payment-summary"></div>
      </section>

      <section class="admin-grid single-column-grid row g-4">
        <section class="panel history-panel card border-0 col-12">
          <div class="panel-head">
            <div>
              <span class="panel-label">Pending Queue</span>
              <h2>Awaiting approval</h2>
            </div>
          </div>
          <div id="pending-payment-list" class="history-list admin-table-wrap"></div>
        </section>

        <section class="panel history-panel card border-0 col-12">
          <div class="panel-head">
            <div>
              <span class="panel-label">Approved And Rejected</span>
              <h2>Processed requests</h2>
            </div>
          </div>
          <div id="processed-payment-list" class="history-list admin-table-wrap"></div>
        </section>
      </section>

      <div class="offcanvas offcanvas-end offcanvas-admin" tabindex="-1" id="paymentDetailOffcanvas" aria-labelledby="paymentDetailOffcanvasLabel">
        <div class="offcanvas-header">
          <div>
            <span class="panel-label d-block mb-1">Payment Request</span>
            <h5 class="offcanvas-title mb-0" id="paymentDetailOffcanvasLabel">Request details</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" id="payment-detail-body"></div>
      </div>

      <p id="payment-status-message" class="status-message"></p>
    </main>

  </body>
</html>