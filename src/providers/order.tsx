'use client'

import { api } from '@/services/axios'
import { createContext, type ReactNode, useState } from 'react'

import { getCookiesClient } from '@/lib/cookie-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export interface OrderItemsProps {
  id: string
  amount: number
  orderId: string
  productId: string
  createdAt: Date
  updatedAt: Date
  product: ProductProps
  order: OrderProps
}

interface ProductProps {
  id: string
  name: string
  description: string
  price: number
  banner: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

interface OrderProps {
  id: string
  table: string
  status: boolean
  draft: boolean
  name: string | null
  createdAt: Date
  updatedAt: Date
}

type OrderContextData = {
  isOpen: boolean
  order: OrderItemsProps[]
  onOpen: (orderId: string) => Promise<void>
  onClose: () => void
  finishOrder: (orderId: string) => Promise<void>
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState<OrderItemsProps[]>([])

  const router = useRouter()

  async function onOpen(orderId: string) {
    const token = await getCookiesClient()
    const response = await api.get('/order/details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { orderId },
    })

    setOrder(response.data.items)
    setIsOpen(true)
  }
  function onClose() {
    setIsOpen(false)
  }

  async function finishOrder(orderId: string) {
    const token = await getCookiesClient()

    try {
      await api.put(
        '/order/finish',
        {
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (error) {
      console.log(error)
      toast.error('Falha ao finalizar o pedido')
      return
    }

    setIsOpen(false)
    router.refresh()
    toast.success('Pedido finalizado com sucesso')
  }

  return (
    <OrderContext.Provider
      value={{ isOpen, onOpen, onClose, order, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  )
}
