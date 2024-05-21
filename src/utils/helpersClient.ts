'use client'

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const accessToken =
    window.localStorage.getItem('accessToken') ||
    window.sessionStorage.getItem('accessToken')

  return accessToken
}
