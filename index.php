<?php
session_start();

$error = '';
$login_type = $_POST['login_type'] ?? 'mobile';

if (isset($_POST['login'])) {

    $identifier = trim($_POST['identifier'] ?? '');
    $password   = trim($_POST['password'] ?? '');
    $login_type = $_POST['login_type'] ?? 'mobile';

    if ($identifier == '' || $password == '') {
        $error = 'Please enter your login details.';
    } else {

        if ($login_type == 'email') {
            // EMAIL LOGIN
            // Example:
            // SELECT * FROM users WHERE email='$identifier'
        } else {
            // MOBILE LOGIN
            // Example:
            // SELECT * FROM users WHERE mobile='$identifier'
        }

        // TODO:
        // Verify password
        // Redirect if success
        // header("Location: home.php");
        // exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, sans-serif;
}

body{
    background:#020b16;
    color:#fff;
    display:flex;
    justify-content:center;
}

.mobile-app{
    width:100%;
    max-width:390px;
    min-height:100vh;
    background:linear-gradient(180deg,#07111f,#020b16);
    padding:18px 24px;
}

/* TOP */
.top-bar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:34px;
}

.top-bar a{
    color:#fff;
    text-decoration:none;
    font-size:18px;
}

.language{
    font-size:14px;
    font-weight:bold;
}

h1{
    font-size:62px;
    color:#d4d8df;
    margin-bottom:65px;
    letter-spacing:-3px;
}

/* TABS */
.tabs{
    display:flex;
    gap:30px;
    margin-bottom:35px;
}

.tab-btn{
    background:none;
    border:none;
    color:#9ea8bb;
    font-size:16px;
    font-weight:bold;
    padding-bottom:14px;
    cursor:pointer;
}

.tab-btn.active{
    color:#fff;
    border-bottom:5px solid #f0c65d;
    border-radius:2px;
}

/* FORM */
.form-group{
    margin-bottom:26px;
    border-bottom:1px solid rgba(255,255,255,.12);
}

.form-group input{
    width:100%;
    background:transparent;
    border:none;
    outline:none;
    color:#fff;
    font-size:15px;
    padding:0 0 14px;
}

.form-group input::placeholder{
    color:#485365;
}

/* REMEMBER */
.remember{
    display:flex;
    align-items:center;
    gap:12px;
    color:#8b97aa;
    font-size:13px;
    font-weight:bold;
    margin:8px 0 26px;
}

.remember input{
    display:none;
}

.checkmark{
    width:18px;
    height:18px;
    border:2px solid #d7ad43;
    border-radius:6px;
    display:flex;
    align-items:center;
    justify-content:center;
}

.remember input:checked + .checkmark::after{
    content:"✓";
    color:#f0c65d;
    font-size:13px;
    font-weight:bold;
}

/* BUTTONS */
.btn-login{
    width:100%;
    height:62px;
    border:none;
    border-radius:35px;
    background:#f0c65d;
    color:#fff;
    font-size:15px;
    font-weight:bold;
    cursor:pointer;
    margin-bottom:28px;
}

.btn-download{
    width:100%;
    height:62px;
    border:1px solid #d7ad43;
    border-radius:35px;
    background:transparent;
    color:#f0c65d;
    font-size:15px;
    font-weight:bold;
    cursor:pointer;
    margin-bottom:34px;
}

/* LINKS */
.links{
    display:flex;
    justify-content:space-between;
    margin-bottom:65px;
}

.links a{
    color:#c5d2e8;
    text-decoration:none;
    font-size:13px;
    font-weight:bold;
}

.customer{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
    color:#c5d2e8;
    font-size:13px;
    font-weight:bold;
}

.error{
    background:#331f22;
    color:#ff9ca8;
    border:1px solid #ef3f68;
    padding:12px;
    border-radius:10px;
    margin-bottom:18px;
    font-size:13px;
}
</style>
</head>

<body>

<div class="mobile-app">

    <div class="top-bar">
        <a href="javascript:history.back()">
            <i class="bi bi-chevron-left"></i>
        </a>
        <div class="language">English</div>
    </div>

    <h1>Login</h1>

    <!-- TAB SWITCH -->
    <div class="tabs">
        <button type="button" id="emailTab" class="tab-btn <?= $login_type == 'email' ? 'active' : ''; ?>">
            Email
        </button>

        <button type="button" id="mobileTab" class="tab-btn <?= $login_type == 'mobile' ? 'active' : ''; ?>">
            Mobile number
        </button>
    </div>

    <?php if(!empty($error)): ?>
        <div class="error"><?= htmlspecialchars($error); ?></div>
    <?php endif; ?>
<form action="php/check-login.php" method="POST">

        <input type="hidden" name="login_type" id="loginType" value="<?= htmlspecialchars($login_type); ?>">

        <!-- DYNAMIC INPUT -->
        <div class="form-group">
            <input 
                type="<?= $login_type == 'email' ? 'email' : 'text'; ?>" 
                name="identifier" 
                id="identifierInput"
                placeholder="<?= $login_type == 'email' ? 'Please enter your email' : 'Please enter your mobile number'; ?>" 
                required
            >
        </div>

        <div class="form-group">
            <input type="password" name="password" placeholder="Please enter your password" required>
        </div>

        <label class="remember">
            <input type="checkbox" name="remember" value="1">
            <span class="checkmark"></span>
            Remember my password
        </label>

        <button type="submit" name="login" class="btn-login">
            Login
        </button>

        <button type="button" class="btn-download">
            Download APP
        </button>

    </form>

    <div class="links">
        <a href="register.php">Register</a>
        <a href="forgot_password.php">Forget password?</a>
    </div>

    <div class="customer">
        <i class="bi bi-headset"></i>
        Contact Customer Service
    </div>

</div>

<script>
const emailTab = document.getElementById("emailTab");
const mobileTab = document.getElementById("mobileTab");
const identifierInput = document.getElementById("identifierInput");
const loginType = document.getElementById("loginType");

emailTab.addEventListener("click", function(){
    emailTab.classList.add("active");
    mobileTab.classList.remove("active");

    loginType.value = "email";
    identifierInput.type = "email";
    identifierInput.placeholder = "Please enter your email";
    identifierInput.value = "";
});

mobileTab.addEventListener("click", function(){
    mobileTab.classList.add("active");
    emailTab.classList.remove("active");

    loginType.value = "mobile";
    identifierInput.type = "text";
    identifierInput.placeholder = "Please enter your mobile number";
    identifierInput.value = "";
});
</script>

</body>
</html>