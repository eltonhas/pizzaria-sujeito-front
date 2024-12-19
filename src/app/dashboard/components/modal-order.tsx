'use client'

import { calculateTotalOrder } from '@/lib/calculate-total-order'
import { OrderContext } from '@/providers/order'
import { X } from 'lucide-react'
import { use } from 'react'

export function ModalOrder() {
  const { onClose, order, finishOrder } = use(OrderContext)
  function handleCloseModal() {
    onClose()
  }

  async function handleFinishOrder(orderId: string) {
    await finishOrder(orderId)
  }
  return (
    <dialog className="position-fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black/50 px-4 backdrop-blur-sm">
      <section className="relative m-auto w-full max-w-2xl rounded-lg bg-background p-4 text-white">
        <button type="button" onClick={handleCloseModal}>
          <X size={40} color="#FF3F4B" />
        </button>

        <article>
          <h2 className="mt-2 mb-4 font-bold text-xl">DETALHES DO PEDIDO</h2>

          <span className="rounded bg-foreground p-2">
            Mesa: <b>{order[0].order.table}</b>
          </span>
          {order[0].order.name && (
            <span className="ml-2">Cliente: {order[0].order.name}</span>
          )}

          {order.map(item => (
            <section className="my-4 flex flex-col gap-1" key={item.id}>
              <span>
                Qtd: {item.amount} - <b>{item.product.name}</b> - R${' '}
                {item.product.price * item.amount}
              </span>
              <span className="text-gray-100 text-sm">
                {item.product.description}
              </span>
            </section>
          ))}

          <h3 className="my-4 font-bold text-2xl">
            Total: R$ {calculateTotalOrder(order)}
          </h3>

          <button
            type="button"
            className="rounded-lg bg-foreground p-2 font-bold text-red-900 transition-all hover:brightness-125"
            onClick={() => handleFinishOrder(order[0].order.id)}
          >
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  )
}
