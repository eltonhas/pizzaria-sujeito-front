'use server'

import type { FormDataSignUp } from '@/app/sign-up/components/form-sign-up'
import { api } from '@/services/axios'
import { redirect } from 'next/navigation'

export async function handleSignUp(data: FormDataSignUp) {
  const { email, name, password } = data

  try {
    await api.post('/users', {
      name,
      email,
      password,
    })
  } catch (error) {
    console.error(error)
  }
  redirect('/')
}
