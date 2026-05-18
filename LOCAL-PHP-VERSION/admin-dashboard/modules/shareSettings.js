export const INVITE_SHARE_SETTINGS_STORAGE_KEY = 'bossk-invite-share-settings-v1'
export const INVITE_SHARE_SETTINGS_UPDATED_EVENT = 'bossk:invite-share-settings-updated'

const DEFAULT_INVITE_SHARE_SETTINGS = {
  domain: 'https://bossk.exchange',
}

const DEFAULT_PERSONAL_INVITE_CODE = 'C5BIU8SUL000'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function emitInviteShareSettingsUpdate() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent(INVITE_SHARE_SETTINGS_UPDATED_EVENT))
}

function normalizeText(value, fallback = '') {
  const nextValue = String(value ?? '').trim()
  return nextValue || fallback
}

function normalizeDomain(value) {
  const nextDomain = normalizeText(value, DEFAULT_INVITE_SHARE_SETTINGS.domain)
  const withProtocol = /^https?:\/\//i.test(nextDomain) ? nextDomain : `https://${nextDomain}`
  return withProtocol.replace(/\/$/, '')
}

export function normalizeInviteShareSettings(value) {
  const nextValue = value && typeof value === 'object' ? value : {}

  return {
    domain: normalizeDomain(nextValue.domain),
  }
}

export function readInviteShareSettings() {
  if (!canUseStorage()) {
    return { ...DEFAULT_INVITE_SHARE_SETTINGS }
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(INVITE_SHARE_SETTINGS_STORAGE_KEY) || 'null')
    return normalizeInviteShareSettings(parsed)
  } catch {
    return { ...DEFAULT_INVITE_SHARE_SETTINGS }
  }
}

export function writeInviteShareSettings(nextValue) {
  const normalized = normalizeInviteShareSettings(nextValue)

  if (!canUseStorage()) {
    return normalized
  }

  window.localStorage.setItem(INVITE_SHARE_SETTINGS_STORAGE_KEY, JSON.stringify(normalized))
  emitInviteShareSettingsUpdate()
  return normalized
}

export function updateInviteShareSettings(partialValue) {
  return writeInviteShareSettings({
    ...readInviteShareSettings(),
    ...partialValue,
  })
}

export function resolvePersonalInviteCode() {
  return DEFAULT_PERSONAL_INVITE_CODE
}

export function buildInviteShareLink(settings, inviteCode = resolvePersonalInviteCode()) {
  const normalized = normalizeInviteShareSettings(settings)
  return `${normalized.domain}/register?code=${encodeURIComponent(inviteCode)}`
}