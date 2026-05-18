<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURX Admin Invite History</title>
    <link rel="stylesheet" href="./styles.css" />
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
              <a href="./invite-history.php" class="nav-link active">Invite History</a>
              <a href="./share-settings.php" class="nav-link">Share Settings</a>
              <a href="./products.php" class="nav-link">Trade Products</a>
              <a href="./payments.php" class="nav-link">PHP Payments</a>
              <a href="./crypto-deposits.php" class="nav-link">Crypto Deposits</a>
            </div>
          </nav>
        </div>
      </header>

      <section class="admin-hero compact-hero">
        <div>
          <p class="eyebrow">Admin Dashboard</p>
          <h1>Invite History</h1>
          <p class="hero-copy">Review generated invite codes, copy them for reuse, or remove outdated invite records without touching the creation flow.</p>
        </div>
        <div class="hero-card" id="invite-history-summary"></div>
      </section>

      <section class="panel history-panel standalone-panel card border-0">
        <div class="panel-head">
          <div>
            <span class="panel-label">Recent Invites</span>
            <h2>Saved codes</h2>
          </div>
          <button type="button" class="ghost-button btn btn-outline-light" id="clear-history">Clear All</button>
        </div>
        <div id="history-list" class="history-list admin-table-wrap"></div>
        <p id="history-status-message" class="status-message"></p>
      </section>

      <script type="module" src="./nav-shell.js"></script>
      <script type="module" src="./invite-history.js"></script>
    </main>
  </body>
</html>