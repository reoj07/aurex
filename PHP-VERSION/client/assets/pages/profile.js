document.addEventListener("DOMContentLoaded", function () {
  var copyButton = document.querySelector("[data-copy-profile-id]");
  var copyFeedback = document.querySelector("[data-copy-feedback]");
  var profileIdValue = document.querySelector("[data-profile-id-value]");
  var securityGroup = document.querySelector("[data-security-group]");
  var securityToggle = document.querySelector("[data-security-toggle]");
  var themeToggle = document.querySelector("[data-theme-toggle]");

  if (copyButton && copyFeedback && profileIdValue) {
    copyButton.addEventListener("click", function () {
      var profileId = profileIdValue.textContent.trim();

      if (!navigator.clipboard || !profileId) {
        copyFeedback.textContent = "Copy is not available on this device.";
        copyFeedback.classList.add("error");
        return;
      }

      navigator.clipboard.writeText(profileId).then(function () {
        copyFeedback.textContent = "Profile ID copied.";
        copyFeedback.classList.remove("error");
      }).catch(function () {
        copyFeedback.textContent = "Copy failed. Please copy it manually.";
        copyFeedback.classList.add("error");
      });
    });
  }

  if (securityGroup && securityToggle) {
    securityToggle.addEventListener("click", function () {
      var isExpanded = securityGroup.classList.toggle("expanded");
      securityToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      themeToggle.classList.toggle("active");
    });
  }
});
