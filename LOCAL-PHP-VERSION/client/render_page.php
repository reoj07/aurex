<?php

require_once dirname(__DIR__) . '/config/app.php';

$aurxPageCatalog = require __DIR__ . '/page_data.php';

$pageKey = $pageKey ?? 'index';
$page = $aurxPageCatalog[$pageKey] ?? $aurxPageCatalog['index'];

function aurx_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function aurx_render_header(string $title): void
{
    ?>
    <div class="header">
        <div class="brand">
            <div class="logo">A</div>
            <div class="brand-text">
                <h2>AURX</h2>
                <span><?= aurx_escape(strtoupper($title)); ?></span>
            </div>
        </div>
        <a href="../config/logout.php"><div class="profile"></div></a>
    </div>
    <?php
}

function aurx_render_home(array $page): void
{
    ?>
    <section class="hero">
        <h3><?= aurx_escape($page['hero']['kicker']); ?></h3>
        <h1><?= $page['hero']['headline']; ?></h1>
        <p><?= aurx_escape($page['hero']['subtitle']); ?></p>
        <div class="hero-card"><?= $page['hero']['card']; ?></div>
        <div class="dots"><span></span><span></span></div>
    </section>

    <div class="notice">
        <i class="bi bi-megaphone-fill"></i>
        <span><?= aurx_escape($page['notice']); ?></span>
        <i class="bi bi-chevron-right"></i>
    </div>

    <div class="menu">
        <?php foreach ($page['menu'] as $item): ?>
            <a href="<?= aurx_escape($item['href']); ?>" class="menu-item">
                <div class="menu-icon"><i class="bi <?= aurx_escape($item['icon']); ?>"></i></div>
                <?= aurx_escape($item['label']); ?>
            </a>
        <?php endforeach; ?>
    </div>

    <div class="promo">
        <h3><?= aurx_escape($page['promo']['title']); ?></h3>
        <p><?= aurx_escape($page['promo']['subtitle']); ?></p>
        <a href="<?= aurx_escape($page['promo']['href']); ?>" class="promo-link">
            <i class="bi bi-arrow-right"></i>
        </a>
    </div>

    <div class="market">
        <div class="market-head">
            <span>Pair</span>
            <span>Price</span>
            <span>
                <b class="live">● LIVE 12:01:13</b><br>
                24-Hour Change
            </span>
        </div>

        <?php foreach ($page['markets'] as $market): ?>
            <div class="market-row">
                <div><?= aurx_escape($market['pair']); ?></div>
                <div class="price"><?= aurx_escape($market['price']); ?></div>
                <div class="change <?= aurx_escape($market['type']); ?>"><?= aurx_escape($market['change']); ?></div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
}

function aurx_render_section(array $page): void
{
    ?>
    <section class="section-hero">
        <h3><?= aurx_escape($page['eyebrow']); ?></h3>
        <h1><?= aurx_escape($page['title']); ?></h1>
        <p><?= aurx_escape($page['headline']); ?></p>
        <div class="status-row">
            <?php foreach ($page['badges'] as $badge): ?>
                <span class="status-pill"><i class="bi <?= aurx_escape($badge['icon']); ?>"></i><?= aurx_escape($badge['label']); ?></span>
            <?php endforeach; ?>
        </div>
    </section>

    <div class="page-content">
        <div class="action-grid">
            <?php foreach ($page['actions'] as $action): ?>
                <a href="<?= aurx_escape($action['href']); ?>" class="action-card">
                    <i class="bi <?= aurx_escape($action['icon']); ?>"></i>
                    <strong><?= aurx_escape($action['label']); ?></strong>
                    <span><?= aurx_escape($action['caption']); ?></span>
                </a>
            <?php endforeach; ?>
        </div>

        <div class="section-links">
            <?php foreach ($page['links'] as $link): ?>
                <a href="<?= aurx_escape($link['href']); ?>" class="section-link">
                    <div class="section-link-copy">
                        <strong><?= aurx_escape($link['title']); ?></strong>
                        <span><?= aurx_escape($link['subtitle']); ?></span>
                    </div>
                    <i class="bi <?= aurx_escape($link['icon']); ?>"></i>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
}

function aurx_render_auth(array $page, string $pageKey): void
{
    ?>
    <div class="auth-panel">
        <div class="auth-top">
            <a href="index.php"><i class="bi bi-arrow-left"></i> Back</a>
            <span>EN</span>
        </div>

        <h1><?= aurx_escape($page['headline']); ?></h1>
        <p class="auth-copy"><?= aurx_escape($page['description']); ?></p>

        <div class="auth-tabs">
            <a href="login.php" class="auth-tab <?= $pageKey === 'login' ? 'active' : ''; ?>">Login</a>
            <a href="register.php" class="auth-tab <?= $pageKey === 'register' ? 'active' : ''; ?>">Register</a>
        </div>

        <form method="post" class="auth-form">
            <?php foreach ($page['fields'] as $field): ?>
                <div class="auth-field">
                    <label for="<?= aurx_escape($field['name']); ?>"><?= aurx_escape($field['label']); ?></label>
                    <input id="<?= aurx_escape($field['name']); ?>" name="<?= aurx_escape($field['name']); ?>" type="<?= aurx_escape($field['type']); ?>" placeholder="<?= aurx_escape($field['placeholder']); ?>" />
                </div>
            <?php endforeach; ?>

            <div class="auth-actions">
                <button type="submit" class="primary-button"><?= aurx_escape($page['primaryAction']); ?></button>
                <a href="<?= aurx_escape($page['secondaryAction']['href']); ?>" class="ghost-button"><?= aurx_escape($page['secondaryAction']['label']); ?></a>
            </div>

            <div class="auth-links">
                <?php foreach ($page['links'] as $link): ?>
                    <a href="<?= aurx_escape($link['href']); ?>"><?= aurx_escape($link['label']); ?></a>
                <?php endforeach; ?>
            </div>
        </form>

        <div class="auth-card">
            <strong>AURX Exchange</strong>
            <p class="helper-copy">This PHP page now uses the same Bootstrap icon family used in aurex-main/home.php.</p>
        </div>
    </div>
    <?php
}
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title><?= aurx_escape($page['title']); ?></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<?php require __DIR__ . '/indexcss.css'; ?>
</head>
<body>
<?php if ($page['type'] === 'auth'): ?>
    <?php aurx_render_auth($page, $pageKey); ?>
<?php else: ?>
    <div class="mobile-app">
        <?php aurx_render_header($page['title']); ?>
        <?php if ($page['type'] === 'home'): ?>
            <?php aurx_render_home($page); ?>
        <?php else: ?>
            <?php aurx_render_section($page); ?>
        <?php endif; ?>
    </div>
    <?php require __DIR__ . '/bottom_menu.php'; ?>
<?php endif; ?>
</body>
</html>