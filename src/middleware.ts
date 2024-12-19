import { NextResponse, type NextRequest } from 'next/server'
import { getCookiesServer } from '@/lib/cookie-server'
import { api } from '@/services/axios'

async function validateToken(token: string) {
  if (!token) return false

  try {
    await api.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/' || pathname === '/sign-up') {
    return NextResponse.next()
  }

  const token = await getCookiesServer()

  if (pathname === '/') {
    if (!token) return NextResponse.redirect(new URL('/', req.url))

    const isValidToken = await validateToken(token)

    if (!isValidToken) return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}
