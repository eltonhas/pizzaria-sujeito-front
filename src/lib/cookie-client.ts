import { getCookie } from 'cookies-next'

export async function getCookiesClient() {
  const token = getCookie('session')

  return token || null
}
