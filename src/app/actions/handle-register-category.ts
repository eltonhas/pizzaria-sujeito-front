'use server'

import { api } from '@/services/axios'
import type { FormDataCategory } from '../(dashboard)/category/page'
import { getCookiesServer } from '@/lib/cookie-server'
import { redirect } from 'next/navigation'

export async function handleRegisterCategory(data: FormDataCategory) {
  const { name } = data

  const token = await getCookiesServer()

  try {
    await api.post(
      '/category',
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    console.error(error)
  }
  redirect('/')
}
