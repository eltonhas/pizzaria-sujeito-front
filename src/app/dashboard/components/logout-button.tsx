'use client'

import { deleteCookie } from 'cookies-next'
import { LogInIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LogOutButton() {
  const router = useRouter()
  async function logout() {
    deleteCookie('session', { path: '/' })

    toast.success('Deslogado com sucesso')
    router.replace('/')
  }
  return (
    <>
      <button
        type="button"
        className="ml-4 transition-all hover:scale-120"
        onClick={logout}
      >
        <LogInIcon size={24} color="#FFF" />
      </button>
    </>
  )
}
