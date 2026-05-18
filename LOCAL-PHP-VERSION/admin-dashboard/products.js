import {
  DEFAULT_TRADE_PRODUCT_OPTIONS,
  TRADE_PRODUCT_CATALOG,
  readTradeProductSettings,
  writeTradeProductSettings,
} from './modules/tradeProductSettings.js'

const productSummary = document.getElementById('product-summary')
const productSearchInput = document.getElementById('product-search')
const productCatalog = document.getElementById('product-catalog')
const selectedProductsSummary = document.getElementById('selected-products-summary')
const productStatsRow = document.getElementById('product-stats-row')
const productSearchNote = document.getElementById('product-search-note')
const saveProductsButton = document.getElementById('save-products')
const resetProductsButton = document.getElementById('reset-products')

let selectedTradeProducts = new Set(readTradeProductSettings().selectedProducts)
let productSearchTerm = ''

renderTradeProductSettings()

productSearchInput?.addEventListener('input', (event) => {
  productSearchTerm = event.target.value.trim().toUpperCase()
  renderTradeProductSettings()
})

productCatalog?.addEventListener('change', (event) => {
  const checkbox = event.target.closest('input[type="checkbox"][data-product]')

  if (!checkbox) {
    return
  }

  const symbol = checkbox.dataset.product

  if (checkbox.checked) {
    selectedTradeProducts.add(symbol)
  } else {
    selectedTradeProducts.delete(symbol)
  }

  renderTradeProductSettings()
})

saveProductsButton?.addEventListener('click', () => {
  const nextProducts = writeTradeProductSettings([...selectedTradeProducts])
  selectedTradeProducts = new Set(nextProducts)
  renderTradeProductSettings('Trade drawer product list saved.')
})

resetProductsButton?.addEventListener('click', () => {
  const nextProducts = writeTradeProductSettings(DEFAULT_TRADE_PRODUCT_OPTIONS)
  selectedTradeProducts = new Set(nextProducts)
  productSearchTerm = ''
  productSearchInput.value = ''
  renderTradeProductSettings('Trade drawer products restored to the default list.')
})

function renderTradeProductSettings(statusMessage = '') {
  const selectedProducts = [...selectedTradeProducts]
  const filteredProducts = TRADE_PRODUCT_CATALOG.filter((symbol) => symbol.includes(productSearchTerm))
  const filteredSelectedCount = filteredProducts.filter((symbol) => selectedTradeProducts.has(symbol)).length
  const statusCopy = statusMessage || 'Adjust the visible catalog for the user trading drawer and save when ready.'

  productSummary.innerHTML = `
    <span>Trade Drawer</span>
    <strong>${selectedProducts.length} products selected</strong>
    <p>${statusCopy}</p>
  `

  productStatsRow.innerHTML = `
    <div class="product-stat-card">
      <span class="product-stat-label">Selected</span>
      <strong>${selectedProducts.length}</strong>
      <p>Symbols currently visible in the user drawer.</p>
    </div>
    <div class="product-stat-card">
      <span class="product-stat-label">Catalog</span>
      <strong>${TRADE_PRODUCT_CATALOG.length}</strong>
      <p>Total symbols available for this admin configuration.</p>
    </div>
    <div class="product-stat-card">
      <span class="product-stat-label">Search view</span>
      <strong>${filteredProducts.length}</strong>
      <p>${productSearchTerm ? `${filteredSelectedCount} selected results match your search.` : 'Search the catalog to refine the visible list.'}</p>
    </div>
  `

  productSearchNote.innerHTML = productSearchTerm
    ? `<span class="product-search-feedback">Showing ${filteredProducts.length} matching symbols for <strong>${escapeHtml(productSearchTerm)}</strong>.</span>`
    : '<span class="product-search-feedback">Browse the full symbol catalog and tick the products you want visible.</span>'

  selectedProductsSummary.innerHTML = selectedProducts.length
    ? selectedProducts.map((symbol, index) => `
      <div class="list-group-item admin-list-group-item product-selected-item d-flex justify-content-between align-items-center gap-3">
        <div class="product-selected-copy">
          <span class="product-selected-order">${index + 1}</span>
          <div>
            <strong>${escapeHtml(symbol)}</strong>
            <p>Live in the trade drawer</p>
          </div>
        </div>
        <span class="badge text-bg-warning rounded-pill">Active</span>
      </div>
    `).join('')
    : '<div class="list-group-item admin-list-group-item product-empty-state"><strong>No products selected</strong><p>Select symbols from the catalog to build the user drawer.</p></div>'

  productCatalog.innerHTML = filteredProducts.length
    ? filteredProducts.map((symbol) => `
      <label class="list-group-item admin-list-group-item product-option-tile">
        <div class="form-check m-0 d-flex align-items-center gap-3 w-100 justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <input class="form-check-input mt-0" type="checkbox" data-product="${escapeAttr(symbol)}" ${selectedTradeProducts.has(symbol) ? 'checked' : ''} />
            <div class="product-option-copy">
              <span class="fw-semibold">${escapeHtml(symbol)}</span>
              <small>${selectedTradeProducts.has(symbol) ? 'Included in drawer' : 'Available to add'}</small>
            </div>
          </div>
          <span class="product-option-state ${selectedTradeProducts.has(symbol) ? 'is-selected' : ''}">${selectedTradeProducts.has(symbol) ? 'Selected' : 'Optional'}</span>
        </div>
      </label>
    `).join('')
    : '<div class="latest-preview empty-state"><strong>No matching products</strong><p>Try a different symbol search.</p></div>'
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