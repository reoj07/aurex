<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURX Admin Share Settings</title>
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
              <a href="./invite-history.php" class="nav-link">Invite History</a>
              <a href="./share-settings.php" class="nav-link active">Share Settings</a>
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
          <h1>Share Settings</h1>
          <p class="hero-copy">Set the base domain used by each user dashboard to generate personal invitation links from its account ID.</p>
        </div>
        <div class="hero-card" id="share-settings-summary"></div>
      </section>

      <section class="panel share-settings-panel standalone-panel card border-0">
        <div class="panel-head">
          <div>
            <span class="panel-label">Share Settings</span>
            <h2>Invitation domain</h2>
          </div>
        </div>

        <form id="share-settings-form" class="invite-form share-settings-form">
          <label>
            <span>Domain</span>
            <input class="form-control" id="share-domain" name="domain" type="text" placeholder="https://yourdomain.com" />
          </label>

          <label>
            <span>Example invitation link</span>
            <input class="form-control" id="share-invite-link" name="inviteLink" type="text" readonly />
          </label>

          <div class="form-actions">
            <button type="submit" class="primary-button btn btn-warning">Save Share Settings</button>
            <button type="button" class="secondary-button btn btn-outline-light" id="copy-share-link">Copy Share Link</button>
          </div>

          <p class="hero-copy product-settings-copy">Each user dashboard will generate its own invitation code and link automatically from that user account ID using this domain.</p>
        </form>

        <p id="share-status-message" class="status-message"></p>
      </section>

      <script type="module" src="./nav-shell.js"></script>
      <script type="module" src="./share-settings.js"></script>
    </main>
  </body>
</html>