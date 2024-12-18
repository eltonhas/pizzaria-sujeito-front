'use client'

import { use } from 'react'
import { RefreshCw } from 'lucide-react'

import type { OrderProps } from '../page'
import { ModalOrder } from './modal-order'
import { OrderContext } from '@/providers/order'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
  orders: OrderProps[]
}

export function Orders({ orders }: Props) {
  const { isOpen, onOpen } = use(OrderContext)

  const router = useRouter()

  async function handleOpenModal(orderId: string) {
    await onOpen(orderId)
  }

  function handleRefresh() {
    router.refresh()
    toast.success('Pedidos atualizados com sucesso')
  }
  return (
    <>
      <main className="mx-auto my-5 flex max-w-3xl flex-col justify-between">
        <section className="mt-6 mb-4 flex items-center gap-4">
          <h1 className="font-bold text-white text-xl">ÚLTIMOS PEDIDOS</h1>
          <button type="button" onClick={handleRefresh}>
            <RefreshCw size={24} color="#3FFFA3" />
          </button>
        </section>

        <section className="flex flex-col gap-4">
          {orders.length === 0 && (
            <span className="font-bold text-gray-100 text-xl">
              Nenhuma mesa aberta no momento
            </span>
          )}
          {orders.map(order => (
            <button
              key={order.id}
              type="button"
              className="flex items-center rounded-lg bg-foreground text-lg transition-all hover:brightness-125"
              onClick={() => handleOpenModal(order.id)}
            >
              <div className="mr-4 h-[60px] w-2 rounded-s-lg bg-green-900" />
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>
      {isOpen && <ModalOrder />}
    </>
  )
}
