import type { OrderItemsProps } from '@/providers/order'

export function calculateTotalOrder(order: OrderItemsProps[]) {
  return order.reduce((total, item) => {
    const sum = item.product.price * item.amount
    return total + sum
  }, 0)
}
