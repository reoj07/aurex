import {
  buildInviteShareLink,
  readInviteShareSettings,
  resolvePersonalInviteCode,
  updateInviteShareSettings,
} from './modules/shareSettings.js'

const summaryPanel = document.getElementById('share-settings-summary')
const shareSettingsForm = document.getElementById('share-settings-form')
const shareDomainInput = document.getElementById('share-domain')
const shareInviteLinkInput = document.getElementById('share-invite-link')
const copyShareLinkButton = document.getElementById('copy-share-link')
const statusMessage = document.getElementById('share-status-message')

render()

shareSettingsForm?.addEventListener('submit', (event) => {
  event.preventDefault()

  const nextSettings = updateInviteShareSettings({
    domain: shareDomainInput.value,
  })

  render(nextSettings)
  setStatus('Share settings saved for the user dashboard.', 'success')
})

copyShareLinkButton?.addEventListener('click', async () => {
  await copyText(shareInviteLinkInput.value, 'Share link copied.')
})

function render(settings = readInviteShareSettings()) {
  const inviteCode = resolvePersonalInviteCode()
  const inviteLink = buildInviteShareLink(settings, inviteCode)

  summaryPanel.innerHTML = `
    <span>Invite Domain</span>
    <strong>${escapeHtml(settings.domain)}</strong>
    <p>Example code ${escapeHtml(inviteCode)} resolves to the generated user invitation link below.</p>
  `

  shareDomainInput.value = settings.domain
  shareInviteLinkInput.value = inviteLink
}

async function copyText(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value)
    setStatus(successMessage, 'success')
  } catch {
    setStatus('Clipboard access is unavailable in this environment.', 'error')
  }
}

function setStatus(message, tone = '') {
  statusMessage.textContent = message
  statusMessage.className = `status-message ${tone}`.trim()
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}