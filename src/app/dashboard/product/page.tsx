import { getCookiesServer } from '@/lib/cookie-server'
import { FormProduct } from './form-product'
import { api } from '@/services/axios'

export default async function Product() {
  const token = await getCookiesServer()

  const response = await api.get('/categories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const categories = response.data.categories
  return (
    <main className="mx-auto my-5 flex max-w-3xl flex-col px-4">
      <h1 className="font-bold text-2xl text-white">NOVO PRODUTO</h1>
      <FormProduct categories={categories} />
    </main>
  )
}
