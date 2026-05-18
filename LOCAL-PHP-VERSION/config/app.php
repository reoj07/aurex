<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('AURX_APP_ROOT', dirname(__DIR__));
define('AURX_CLIENT_ROOT', AURX_APP_ROOT . '/client');
