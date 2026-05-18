<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURX Admin Trade Products</title>
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
              <a href="./share-settings.php" class="nav-link">Share Settings</a>
              <a href="./products.php" class="nav-link active">Trade Products</a>
              <a href="./payments.php" class="nav-link">PHP Payments</a>
              <a href="./crypto-deposits.php" class="nav-link">Crypto Deposits</a>
            </div>
          </nav>
        </div>
      </header>

      <section class="admin-hero compact-hero">
        <div>
          <p class="eyebrow">Admin Dashboard</p>
          <h1>Trade Product Control</h1>
          <p class="hero-copy">Manage which symbols appear inside the user trade product drawer and keep the selection focused for mobile users.</p>
        </div>
        <div class="hero-card" id="product-summary"></div>
      </section>

      <section class="panel product-settings-panel standalone-panel card border-0">
        <div class="panel-head">
          <div>
            <span class="panel-label">Trade Products</span>
            <h2>Drawer products</h2>
          </div>
          <button type="button" class="ghost-button btn btn-outline-light" id="reset-products">Restore Defaults</button>
        </div>

        <p class="hero-copy product-settings-copy">Choose which products appear inside the user trade product drawer. The default set matches the mobile list in your screenshot.</p>

        <div class="product-stats-row" id="product-stats-row"></div>

        <div class="product-layout-grid">
          <section class="product-section-card product-selection-card">
            <div class="product-section-head">
              <div>
                <span class="panel-label">Selected Drawer</span>
                <h3>Live list</h3>
              </div>
              <span class="product-section-caption">Visible to users now</span>
            </div>

            <div id="selected-products-summary" class="list-group admin-list-group product-selected-list"></div>
          </section>

          <section class="product-section-card product-library-card">
            <div class="product-section-head product-library-head">
              <div>
                <span class="panel-label">Symbol Catalog</span>
                <h3>Browse and update</h3>
              </div>
              <button type="button" class="primary-button btn btn-warning" id="save-products">Save Product List</button>
            </div>

            <div class="product-search-row">
              <label class="product-settings-search">
                <span>Search products</span>
                <input class="form-control" id="product-search" type="search" placeholder="Search symbols" />
              </label>
              <div class="product-search-note" id="product-search-note"></div>
            </div>

            <div id="product-catalog" class="list-group product-catalog"></div>
          </section>
        </div>
      </section>

      <script type="module" src="./nav-shell.js"></script>
      <script type="module" src="./products.js"></script>
    </main>
  </body>
</html>