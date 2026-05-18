<?php
function profile_icon(string $name): string
{
    $icons = [
        'arrow-left' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
SVG,
        'copy' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V6a2 2 0 0 1 2-2h9"></path></svg>
SVG,
        'moon' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 0 1 11.2 3a7.2 7.2 0 1 0 9.8 9.8z"></path></svg>
SVG,
        'verification' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-2.6 7.3-7 9-4.4-1.7-7-4.8-7-9V6l7-3z"></path><path d="M9 12l2 2 4-4"></path></svg>
SVG,
        'history' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path><path d="M12 7v5l3 2"></path></svg>
SVG,
        'share' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="M8.7 10.7l6.6-3.4"></path><path d="M8.7 13.3l6.6 3.4"></path></svg>
SVG,
        'support' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 18h.01"></path><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"></path><circle cx="12" cy="12" r="9"></circle></svg>
SVG,
        'about' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 10v6"></path><path d="M12 7h.01"></path></svg>
SVG,
        'settings' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.7-3.4 1.7.6-3.8-2.7-2.7 3.8-.6z"></path><circle cx="12" cy="12" r="3"></circle></svg>
SVG,
        'security' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-2.6 7.3-7 9-4.4-1.7-7-4.8-7-9V6l7-3z"></path></svg>
SVG,
        'password' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 1 1 8 0v3"></path></svg>
SVG,
        'devices' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="2"></rect><path d="M11 17h2"></path></svg>
SVG,
        'chevron-right' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg>
SVG,
        'chevron-down' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
SVG,
        'logout' => <<<'SVG'
<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>
SVG,
    ];

    return $icons[$name] ?? '';
}

$verificationCards = [
    [
        'title' => 'Identity Verification',
        'status' => 'Level 2 verified and ready for higher transfer limits.',
        'tone' => 'gold',
    ],
    [
        'title' => 'Security Health',
        'status' => 'Password, device lock, and login review are all active.',
        'tone' => 'teal',
    ],
];

$menuItems = [
    [
        'label' => 'Transaction History',
        'href' => 'history.html',
        'icon' => 'history',
        'trailing' => 'chevron-right',
    ],
    [
        'label' => 'Share With Friends',
        'href' => 'share.html',
        'icon' => 'share',
        'trailing' => 'chevron-right',
    ],
    [
        'label' => 'Support Center',
        'href' => 'support.html',
        'icon' => 'support',
        'trailing' => 'chevron-right',
    ],
    [
        'label' => 'About Us',
        'href' => 'about.html',
        'icon' => 'about',
        'trailing' => 'chevron-right',
    ],
    [
        'label' => 'Settings',
        'href' => 'settings.html',
        'icon' => 'settings',
        'trailing' => 'chevron-right',
    ],
];

$securityItems = [
    [
        'label' => 'Security Center',
        'href' => 'security.html',
        'value' => 'Overview',
    ],
    [
        'label' => 'Password',
        'href' => 'security-password.html',
        'value' => 'Updated',
    ],
    [
        'label' => 'Verification',
        'href' => 'security-verification.html',
        'value' => 'Enabled',
    ],
    [
        'label' => 'Devices',
        'href' => 'security-devices.html',
        'value' => '2 linked',
    ],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/common.css">
<link rel="stylesheet" href="assets/pages/profile.css">
</head>
<body>
  <div class="app-shell">
    <div class="screen no-bottom-nav profile-page-screen">
      <header class="profile-page-header">
        <a href="home.php" class="profile-page-back" aria-label="Back to home">
          <?= profile_icon('arrow-left'); ?>
        </a>
        <div class="profile-page-title">
          <h1>Account Center</h1>
        </div>
      </header>
      <section class="profile-menu-panel profile-page-panel open" aria-label="Profile details">
        <div class="profile-menu-top-row">
          <div class="profile-menu-identity">
            <span class="profile-menu-avatar profile-page-avatar" aria-hidden="true">K</span>
            <div class="profile-menu-copy">
              <div class="profile-menu-name-row">
                <strong>Boss K</strong>
                <span class="vip-pill">VIP 01</span>
              </div>
              <p>bossk@aurx.exchange</p>
              <span class="profile-menu-username">@bossk_trader</span>
            </div>
          </div>

        </div>

        <div class="profile-id-row">
          <span>ID: <strong data-profile-id-value>221133 4455</strong></span>
          <button type="button" class="profile-copy-button" aria-label="Copy profile ID" data-copy-profile-id>
            <?= profile_icon('copy'); ?>
          </button>
        </div>
        <div class="profile-copy-feedback" data-copy-feedback aria-live="polite"></div>

        <div class="verification-card-stack">
          <?php foreach ($verificationCards as $index => $card): ?>
            <article class="verification-card <?= htmlspecialchars($card['tone'], ENT_QUOTES, 'UTF-8'); ?>" style="--stagger-index: <?= $index + 1; ?>;">
              <div>
                <strong><?= htmlspecialchars($card['title'], ENT_QUOTES, 'UTF-8'); ?></strong>
                <p><?= htmlspecialchars($card['status'], ENT_QUOTES, 'UTF-8'); ?></p>
              </div>
              <span class="verification-icon-wrap" aria-hidden="true">
                <?= profile_icon('verification'); ?>
              </span>
            </article>
          <?php endforeach; ?>
        </div>

        <nav class="profile-menu-list" aria-label="Profile links">
          <?php foreach ($menuItems as $index => $item): ?>
            <a href="<?= htmlspecialchars($item['href'], ENT_QUOTES, 'UTF-8'); ?>" class="profile-menu-item" style="--stagger-index: <?= $index + 3; ?>;">
              <span class="profile-menu-item-main">
                <?= profile_icon($item['icon']); ?>
                <span><?= htmlspecialchars($item['label'], ENT_QUOTES, 'UTF-8'); ?></span>
              </span>
              <?= profile_icon($item['trailing']); ?>
            </a>
          <?php endforeach; ?>

          <div class="profile-menu-group expanded" style="--stagger-index: 8;" data-security-group>
            <button type="button" class="profile-menu-item profile-menu-toggle active" aria-expanded="true" data-security-toggle>
              <span class="profile-menu-item-main">
                <?= profile_icon('security'); ?>
                <span>Security</span>
              </span>
              <?= profile_icon('chevron-down'); ?>
            </button>
            <div class="profile-submenu" aria-hidden="false">
              <?php foreach ($securityItems as $item): ?>
                <a href="<?= htmlspecialchars($item['href'], ENT_QUOTES, 'UTF-8'); ?>" class="profile-submenu-item">
                  <span><?= htmlspecialchars($item['label'], ENT_QUOTES, 'UTF-8'); ?></span>
                  <strong><?= htmlspecialchars($item['value'], ENT_QUOTES, 'UTF-8'); ?></strong>
                </a>
              <?php endforeach; ?>
            </div>
          </div>

          <a href="../config/logout.php" class="profile-menu-item profile-menu-item-logout" style="--stagger-index: 9;">
            <span class="profile-menu-item-main">
              <?= profile_icon('logout'); ?>
              <span>Logout</span>
            </span>
            <?= profile_icon('chevron-right'); ?>
          </a>
        </nav>
      </section>
    </div>
  </div>

  <script src="assets/pages/profile.js"></script>
</body>
</html>
