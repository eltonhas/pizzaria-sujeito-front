'use client'

import { handleRegisterCategory } from '@/app/actions/handle-register-category'
import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Cadastre um nome para a categoria' }),
})

export type FormDataCategory = z.infer<typeof formSchema>

export default function Category() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormDataCategory>({
    resolver: zodResolver(formSchema),
  })

  async function handleCreateCategory(data: FormDataCategory) {
    handleRegisterCategory(data)
  }

  return (
    <main className="mx-auto my-5 flex max-w-3xl flex-col px-4">
      <h1 className="font-bold text-2xl text-white">NOVA CATEGORIA</h1>

      <form
        onSubmit={handleSubmit(handleCreateCategory)}
        className="my-4 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Nome da categoria"
          className=" h-10 rounded-lg border border-gray-100 bg-foreground px-4 text-white"
          {...register('name')}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
        <Button name="Cadastrar" isSubmiting={isSubmitting} />
      </form>
    </main>
  )
}
