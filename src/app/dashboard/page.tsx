import { api } from '@/services/axios'
import { Orders } from './components/orders'
import { getCookiesServer } from '@/lib/cookie-server'

export interface OrderProps {
  id: string
  table: string
  status: boolean
  draft: boolean
  name: string
  createdAt: Date
  updatedAt: Date
}

async function getOrders(): Promise<OrderProps[] | []> {
  const token = await getCookiesServer()
  try {
    const response = await api.get('/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data.orders
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function Dashboard() {
  const orders = await getOrders()

  return (
    <>
      <Orders orders={orders} />
    </>
  )
}
