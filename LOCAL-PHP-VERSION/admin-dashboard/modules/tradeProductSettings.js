export const TRADE_PRODUCT_SETTINGS_STORAGE_KEY = 'bossk-trade-product-settings-v1'

export const DEFAULT_TRADE_PRODUCT_OPTIONS = ['BTCUSDT', 'ETHUSDT', 'XAUUSD', 'XAGUSD', 'XPDUSD', 'XPTUSD']

export const TRADE_PRODUCT_CATALOG = [
  ...DEFAULT_TRADE_PRODUCT_OPTIONS,
  'SOLUSDT',
  'XRPUSDT',
  'DOGEUSDT',
  'AVAXUSDT',
  'LTCUSDT',
  'BCHUSDT',
  'UNIUSD',
  'FILUSD',
  'DASHUSD',
]

function normalizeTradeProductSymbol(value) {
  return String(value ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').trim()
}

export function normalizeTradeProductSelection(values) {
  const allowedProducts = new Set(TRADE_PRODUCT_CATALOG)
  const normalizedProducts = Array.from(
    new Set((Array.isArray(values) ? values : []).map(normalizeTradeProductSymbol).filter(Boolean)),
  ).filter((symbol) => allowedProducts.has(symbol))

  return normalizedProducts.length ? normalizedProducts : [...DEFAULT_TRADE_PRODUCT_OPTIONS]
}

export function readTradeProductSettings() {
  if (typeof window === 'undefined') {
    return { selectedProducts: [...DEFAULT_TRADE_PRODUCT_OPTIONS] }
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(TRADE_PRODUCT_SETTINGS_STORAGE_KEY) || 'null')
    const selectedProducts = Array.isArray(parsed)
      ? normalizeTradeProductSelection(parsed)
      : normalizeTradeProductSelection(parsed?.selectedProducts)

    return { selectedProducts }
  } catch {
    return { selectedProducts: [...DEFAULT_TRADE_PRODUCT_OPTIONS] }
  }
}

export function writeTradeProductSettings(selectedProducts) {
  if (typeof window === 'undefined') {
    return [...DEFAULT_TRADE_PRODUCT_OPTIONS]
  }

  const normalizedProducts = normalizeTradeProductSelection(selectedProducts)
  window.localStorage.setItem(
    TRADE_PRODUCT_SETTINGS_STORAGE_KEY,
    JSON.stringify({ selectedProducts: normalizedProducts }),
  )
  return normalizedProducts
}