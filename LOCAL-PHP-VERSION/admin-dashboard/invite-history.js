import {
  readInviteOrders,
  writeInviteOrders,
} from './modules/inviteOrders.js'

const summaryPanel = document.getElementById('invite-history-summary')
const historyList = document.getElementById('history-list')
const clearHistoryButton = document.getElementById('clear-history')
const statusMessage = document.getElementById('history-status-message')

render()

clearHistoryButton?.addEventListener('click', () => {
  writeInviteOrders([])
  render()
  setStatus('All saved invite codes were cleared.', 'success')
})

historyList?.addEventListener('click', async (event) => {
  const actionButton = event.target.closest('[data-action]')
  if (!actionButton) {
    return
  }

  const code = actionButton.dataset.code
  const orders = readInviteOrders()
  const selectedOrder = orders.find((order) => order.code === code)

  if (!selectedOrder) {
    setStatus('That invite code no longer exists.', 'error')
    render()
    return
  }

  if (actionButton.dataset.action === 'copy') {
    await copyText(selectedOrder.code, `Invite code ${selectedOrder.code} copied.`)
    return
  }

  if (actionButton.dataset.action === 'delete') {
    writeInviteOrders(orders.filter((order) => order.code !== code))
    render()
    setStatus(`Invite code ${code} deleted.`, 'success')
  }
})

function render() {
  const orders = readInviteOrders()
  const latestOrder = orders[0]

  summaryPanel.innerHTML = `
    <span>Invite History</span>
    <strong>${orders.length} saved code${orders.length === 1 ? '' : 's'}</strong>
    <p>${latestOrder ? `Latest code ${escapeHtml(latestOrder.code)} is ready to reuse.` : 'Generate invite codes from the Invite Codes page and they will appear here.'}</p>
  `

  renderHistory(orders)
}

function renderHistory(orders) {
  if (!orders.length) {
    historyList.innerHTML = '<div class="latest-preview empty-state"><strong>No saved invites</strong><p>Generated codes will appear here for reuse or deletion.</p></div>'
    return
  }

  historyList.innerHTML = `
    <div class="table-responsive">
      <table class="table table-dark table-hover align-middle admin-table mb-0">
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Pair</th>
            <th>Duration</th>
            <th>Usage</th>
            <th>Rate</th>
            <th>Direction</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map((order) => `
            <tr>
              <td class="fw-semibold text-warning">${escapeHtml(order.code)}</td>
              <td>${escapeHtml(order.title)}</td>
              <td>${escapeHtml(order.tradingPair)}</td>
              <td>${escapeHtml(order.purchaseDuration)}</td>
              <td>${escapeHtml(getInviteAmountDisplay(order))}</td>
              <td>${escapeHtml(getInviteRateDisplay(order))}</td>
              <td>${escapeHtml(order.direction)}</td>
              <td class="text-end">
                <div class="d-inline-flex gap-2 flex-wrap justify-content-end">
                  <button type="button" class="btn btn-sm btn-outline-light" data-action="copy" data-code="${escapeAttr(order.code)}">Copy</button>
                  <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-code="${escapeAttr(order.code)}">Delete</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

function getInviteAmountDisplay(order) {
  const percentage = Number(order.orderPercentage)

  if (Number.isFinite(percentage) && percentage > 0) {
    return `${percentage.toFixed(2)}% of Trade wallet`
  }

  return `${escapeHtml(order.orderAmount)} fixed`
}

function getInviteRateDisplay(order) {
  return `${Number(order.rateOfReturn || 0).toFixed(2)}%`
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

function escapeAttr(value) {
  return escapeHtml(value)
}