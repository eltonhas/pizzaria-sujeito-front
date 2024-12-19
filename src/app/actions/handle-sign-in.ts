'use server'

import type { FormDataSignIn } from '@/app/(sign-in)/components/form-login'
import { api } from '@/services/axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function handleSignIn(data: FormDataSignIn) {
  const { email, password } = data

  try {
    const response = await api.post('/session', {
      email,
      password,
    })

    if (!response.data.token) {
      return
    }

    const cookiesStore = await cookies()
    const expiresTime = 60 * 60 * 24 * 30 * 1000

    cookiesStore.set('session', response.data.token, {
      maxAge: expiresTime,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    })
  } catch (error) {
    console.error(error)
  }
  redirect('/dashboard')
}
