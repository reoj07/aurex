const navToggle = document.querySelector('.admin-nav-toggle')
const navLinks = document.getElementById('admin-nav-links')

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const nextExpanded = navToggle.getAttribute('aria-expanded') !== 'true'
    navToggle.setAttribute('aria-expanded', String(nextExpanded))
    navLinks.classList.toggle('show', nextExpanded)
  })
}