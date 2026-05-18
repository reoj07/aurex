<?php

$aurxMarkets = [
    ['pair' => 'XPDUSD', 'price' => '1516.000', 'change' => '-0.12%', 'type' => 'down'],
    ['pair' => 'XAGUSD', 'price' => '86.241', 'change' => '-0.89%', 'type' => 'down'],
    ['pair' => 'XPTUSD', 'price' => '2093.000', 'change' => '-2.54%', 'type' => 'down'],
    ['pair' => 'SHIBUSDT', 'price' => '0.000007', 'change' => '+1.54%', 'type' => 'up'],
    ['pair' => 'XAUUSD', 'price' => '4721.300', 'change' => '-0.96%', 'type' => 'down'],
    ['pair' => 'CHFUSD', 'price' => '1.282', 'change' => '-0.08%', 'type' => 'down'],
];

$aurxPageCatalog = [
    'index' => [
        'type' => 'home',
        'title' => 'AURX Exchange',
        'hero' => [
            'kicker' => 'AI-Powered Trading',
            'headline' => 'Elevating Investment<br>Efficiency',
            'subtitle' => 'Technology Empowering Finance',
            'card' => 'Pioneering the Digital Asset<br>Era',
        ],
        'notice' => 'THIS IS A TEST',
        'menu' => [
            ['label' => 'Withdrawal', 'href' => 'withdraw.php', 'icon' => 'bi-currency-exchange'],
            ['label' => 'Deposit', 'href' => 'deposit.php', 'icon' => 'bi-upload'],
            ['label' => 'Invite', 'href' => 'share.php', 'icon' => 'bi-person-plus'],
            ['label' => 'Support', 'href' => 'support.php', 'icon' => 'bi-question-circle'],
        ],
        'promo' => ['title' => 'Easy Follow Trade', 'subtitle' => 'Safe and convenient', 'href' => 'futures.php'],
        'markets' => $aurxMarkets,
    ],
];

$aurxGenericSectionDefaults = [
    'eyebrow' => 'AURX Exchange',
    'headline' => 'This page is now rendered directly in PHP and HTML using the same Bootstrap icon approach as aurex-main/home.php.',
    'badges' => [
        ['icon' => 'bi-megaphone-fill', 'label' => 'Plain PHP view'],
        ['icon' => 'bi-question-circle', 'label' => 'Bootstrap icons'],
    ],
    'actions' => [
        ['label' => 'Withdrawal', 'caption' => 'Use the same home action icon', 'href' => 'withdraw.php', 'icon' => 'bi-currency-exchange'],
        ['label' => 'Deposit', 'caption' => 'Use the same home action icon', 'href' => 'deposit.php', 'icon' => 'bi-upload'],
    ],
    'links' => [
        ['title' => 'Support', 'subtitle' => 'Shared icon styling', 'href' => 'support.php', 'icon' => 'bi-question-circle'],
        ['title' => 'Share', 'subtitle' => 'Invite icon styling', 'href' => 'share.php', 'icon' => 'bi-person-plus'],
    ],
];

foreach ([
    'markets', 'futures', 'perpetual', 'assets', 'exchange', 'trade-assets', 'perpetual-assets', 'convert',
    'deposit', 'deposit-crypto', 'deposit-binance-pay', 'deposit-php', 'deposit-php-history', 'deposit-p2p',
    'withdraw', 'transfer', 'history', 'share', 'support', 'about', 'settings', 'security', 'security-password',
    'security-verification', 'security-devices'
] as $sectionKey) {
    $aurxPageCatalog[$sectionKey] = array_merge($aurxGenericSectionDefaults, [
        'type' => 'section',
        'title' => ucwords(str_replace(['-', '_'], ' ', $sectionKey)),
    ]);
}

$aurxPageCatalog['login'] = [
    'type' => 'auth',
    'title' => 'Login',
    'headline' => 'Log in',
    'description' => 'Use mobile or email sign-in to continue to the AURX dashboard.',
    'fields' => [
        ['label' => 'Mobile or Email', 'name' => 'identifier', 'type' => 'text', 'placeholder' => 'Enter mobile number or email'],
        ['label' => 'Password', 'name' => 'password', 'type' => 'password', 'placeholder' => 'Enter password'],
    ],
    'primaryAction' => 'Login',
    'secondaryAction' => ['label' => 'Create Account', 'href' => 'register.php'],
    'links' => [
        ['label' => 'Forgot password', 'href' => 'security-password.php'],
        ['label' => 'Need support?', 'href' => 'support.php'],
    ],
];

$aurxPageCatalog['register'] = [
    'type' => 'auth',
    'title' => 'Register',
    'headline' => 'Create account',
    'description' => 'Create a new AURX account with mobile-ready registration fields.',
    'fields' => [
        ['label' => 'Full Name', 'name' => 'fullname', 'type' => 'text', 'placeholder' => 'Enter your full name'],
        ['label' => 'Mobile Number', 'name' => 'mobile', 'type' => 'text', 'placeholder' => 'Enter mobile number'],
        ['label' => 'Email', 'name' => 'email', 'type' => 'email', 'placeholder' => 'Enter email address'],
        ['label' => 'Password', 'name' => 'password', 'type' => 'password', 'placeholder' => 'Create password'],
    ],
    'primaryAction' => 'Register',
    'secondaryAction' => ['label' => 'Already have an account?', 'href' => 'login.php'],
    'links' => [
        ['label' => 'Support center', 'href' => 'support.php'],
        ['label' => 'Security info', 'href' => 'security.php'],
    ],
];

return $aurxPageCatalog;