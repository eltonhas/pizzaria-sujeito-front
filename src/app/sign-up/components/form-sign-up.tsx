'use client'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { handleSignUp } from '@/app/actions/handle-sign-up'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type FormDataSignUp = z.infer<typeof formSchema>
export function FormSignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormDataSignUp>({
    resolver: zodResolver(formSchema),
  })

  async function handleLogin(data: FormDataSignUp) {
    await handleSignUp(data)
  }
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex w-[90%] flex-col gap-4 pb-4 text-lg text-white"
    >
      <input
        type="text"
        placeholder="Digite seu nome ..."
        className="h-10 rounded-lg border border-gray-100 bg-foreground px-4 py-0 text-white placeholder:text-white placeholder:opacity-60"
        {...register('name')}
      />
      <input
        type="text"
        placeholder="Digite seu email ..."
        className="h-10 rounded-lg border border-gray-100 bg-foreground px-4 py-0 text-white placeholder:text-white placeholder:opacity-60"
        {...register('email')}
      />
      <input
        type="password"
        placeholder="**************"
        className="h-10 rounded-lg border border-gray-100 bg-foreground p-4 text-white placeholder:text-white placeholder:opacity-60"
        {...register('password')}
      />
      <button
        type="submit"
        className="flex h-10 items-center justify-center rounded-lg border-none bg-red-900 text-white transition-all hover:scale-105"
      >
        Cadastrar
      </button>
    </form>
  )
}
