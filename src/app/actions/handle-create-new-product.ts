'use server'

import { getCookiesServer } from '@/lib/cookie-server'
import type { FormProductData } from '../dashboard/product/form-product'
import { api } from '@/services/axios'
import { redirect } from 'next/navigation'

export async function handleCreateNewProduct(formData: FormProductData) {
  const { image, category, description, name, price } = formData

  const token = await getCookiesServer()

  const data = new FormData()
  data.append('name', name)
  data.append('description', description)
  data.append('price', price)
  data.append('categoryId', category)
  data.append('banner', image[0])

  console.log(data)

  try {
    await api.post('/product', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
