export const INVITE_ORDER_STORAGE_KEY = 'bossk-admin-invite-orders-v1'

function normalizeString(value, fallback = '') {
  return String(value ?? fallback).trim() || fallback
}

function normalizeNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function formatInviteAmount(value) {
  return normalizeNumber(value).toFixed(2)
}

function formatInvitePercentage(value) {
  return normalizeNumber(value).toFixed(2)
}

function formatInviteRate(value) {
  return normalizeNumber(value).toFixed(2)
}

export function resolveInviteOrderAmount(order, tradeWalletBalance = 0) {
  const percentage = normalizeNumber(order?.orderPercentage)
  const fixedAmount = normalizeNumber(order?.orderAmount)

  if (percentage > 0) {
    return (normalizeNumber(tradeWalletBalance) * percentage) / 100
  }

  return fixedAmount
}

export function getInviteAmountSummary(order, tradeWalletBalance = 0) {
  const percentage = normalizeNumber(order?.orderPercentage)
  const resolvedAmount = resolveInviteOrderAmount(order, tradeWalletBalance)

  if (percentage > 0) {
    return `${formatInviteAmount(resolvedAmount)} USDT (${formatInvitePercentage(percentage)}% of Trade wallet)`
  }

  return `${formatInviteAmount(resolvedAmount)} USDT`
}

export function getInvitePercentageSummary(order) {
  const percentage = normalizeNumber(order?.orderPercentage)
  return percentage > 0 ? `${formatInvitePercentage(percentage)}% of Trade wallet` : '--'
}

export function getInviteRateSummary(order) {
  return `${formatInviteRate(order?.rateOfReturn)}%`
}

export function readInviteOrders() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(INVITE_ORDER_STORAGE_KEY) || '[]')
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item) => item && typeof item.code === 'string')
  } catch {
    return []
  }
}

export function writeInviteOrders(orders) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(INVITE_ORDER_STORAGE_KEY, JSON.stringify(orders))
}

export function generateInviteCode(existingOrders = []) {
  const existingCodes = new Set(existingOrders.map((order) => normalizeString(order.code).toUpperCase()))

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const timestampChunk = Date.now().toString(36).toUpperCase().slice(-4)
    const randomChunk = Math.random().toString(36).slice(2, 6).toUpperCase()
    const nextCode = `BG${timestampChunk}${randomChunk}`

    if (!existingCodes.has(nextCode)) {
      return nextCode
    }
  }

  return `BG${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 4).toUpperCase()}`
}

export function buildInviteOrderRecord(input, existingOrders = []) {
  const releaseTime = normalizeString(input.releaseTime)
  const amountValue = normalizeNumber(input.orderAmount)
  const percentageValue = Math.min(100, Math.max(0, normalizeNumber(input.orderPercentage)))
  const rateOfReturn = Math.max(0, normalizeNumber(input.rateOfReturn, 63.7))
  const openPrice = normalizeNumber(input.openPrice)
  const tradingPair = normalizeString(input.tradingPair, 'BTC / USDT')

  return {
    code: generateInviteCode(existingOrders),
    title: normalizeString(input.title, 'Boss K Trading Signal'),
    tradingPair,
    purchaseDuration: normalizeString(input.purchaseDuration, '60s'),
    releaseTime,
    orderAmount: formatInviteAmount(amountValue),
    orderPercentage: formatInvitePercentage(percentageValue),
    rateOfReturn: formatInviteRate(rateOfReturn),
    direction: normalizeString(input.direction, 'Long'),
    openPrice: openPrice > 0 ? openPrice.toFixed(2) : '--',
    turnover: amountValue > 0 ? formatInviteAmount(amountValue) : '--',
    status: normalizeString(input.status, 'Pending'),
    note: normalizeString(input.note),
    createdAt: new Date().toISOString(),
  }
}

export function saveInviteOrder(orderInput) {
  const existingOrders = readInviteOrders()
  const nextOrder = buildInviteOrderRecord(orderInput, existingOrders)
  const nextOrders = [nextOrder, ...existingOrders].slice(0, 24)
  writeInviteOrders(nextOrders)
  return nextOrder
}

export function findInviteOrderByCode(code) {
  const normalizedCode = normalizeString(code).toUpperCase()
  return readInviteOrders().find((order) => normalizeString(order.code).toUpperCase() === normalizedCode) || null
}

export function getLatestInviteOrder() {
  return readInviteOrders()[0] || null
}

export function buildInviteFollowUpCard(order, fallbackOrder, tradeWalletBalance = 0) {
  if (!order) {
    return fallbackOrder
  }

  return {
    ...fallbackOrder,
    title: order.title,
    tradingPair: order.tradingPair,
    purchaseDuration: order.purchaseDuration,
    releaseTime: order.releaseTime,
    orderAmount: getInviteAmountSummary(order, tradeWalletBalance),
    orderPercentage: getInvitePercentageSummary(order),
    rateOfReturn: getInviteRateSummary(order),
  }
}

export function buildInviteConfirmSheet(order, fallbackSheet, tradeWalletBalance = 0) {
  if (!order) {
    return fallbackSheet
  }

  return {
    ...fallbackSheet,
    title: order.title,
    releaseTime: order.releaseTime,
    orderAmount: getInviteAmountSummary(order, tradeWalletBalance),
    orderPercentage: getInvitePercentageSummary(order),
    rateOfReturn: getInviteRateSummary(order),
  }
}

export function buildInvitePositionOrder(order, fallbackPositionOrder, tradeWalletBalance = 0) {
  if (!order) {
    return fallbackPositionOrder
  }

  return {
    ...fallbackPositionOrder,
    status: order.status,
    product: order.tradingPair,
    direction: order.direction,
    timePeriod: order.purchaseDuration,
    amount: formatInviteAmount(resolveInviteOrderAmount(order, tradeWalletBalance)),
    orderPercentage: getInvitePercentageSummary(order),
    openPositionTime: order.releaseTime,
    openPrice: order.openPrice,
    turnover: formatInviteAmount(resolveInviteOrderAmount(order, tradeWalletBalance)),
    rateOfReturn: getInviteRateSummary(order),
  }
}