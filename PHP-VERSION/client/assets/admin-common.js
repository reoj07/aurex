(() => {
  const availableFiles = new Set([
    "crypto-deposits.html",
    "index.html",
    "payments.html",
  ]);

  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelectorAll('.admin-nav a[href$=".html"]')
      .forEach((anchor) => {
        const href = anchor.getAttribute("href") || "";
        const fileName = href.replace(/^\.\//, "");
        if (!availableFiles.has(fileName)) {
          anchor.classList.add("is-disabled");
          anchor.setAttribute("aria-disabled", "true");
          anchor.removeAttribute("href");
        }
      });
  });
})();
