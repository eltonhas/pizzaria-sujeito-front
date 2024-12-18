'use client'

import { handleCreateNewProduct } from '@/app/actions/handle-create-new-product'
import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { useState, type ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface CategoriesProps {
  id: string
  name: string
}

interface FormProductProps {
  categories: CategoriesProps[]
}

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
  price: z.string().min(2, { message: 'O preço do produto é obrigatório' }),
  description: z
    .string()
    .min(2, { message: 'A descrição do produto é obrigatória' }),
  category: z.string().min(1, { message: 'Selecione uma categoria' }),
  //   image: z
  //     .instanceof(File)
  //     .refine(file => file.size > 0, { message: 'Imagem é obrigatória' }),
  image: z
    .any()
    .refine(files => files?.length === 1, 'Selecione uma imagem.')
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
    .refine(
      files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
})

export type FormProductData = z.infer<typeof formSchema>

export function FormProduct({ categories }: FormProductProps) {
  const [imagePreview, setImagePreview] = useState<string>()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormProductData>({
    resolver: zodResolver(formSchema),
  })
  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      const image = event.target.files[0]

      if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
        return
      }
      setImagePreview(URL.createObjectURL(image))
    }
  }

  async function handleCreateProduct(data: FormProductData) {
    try {
      await handleCreateNewProduct(data)
      setImagePreview('')
      reset()
      toast.success('Produto criado com sucesso')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar produto')
    }
  }
  return (
    <form
      className="my-4 flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateProduct)}
    >
      <label className="relative flex h-72 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-gray-100 border-dashed bg-foreground">
        <span className="z-50 opacity-80 transition-all hover:scale-110 hover:opacity-100">
          <UploadCloud size={30} color="#FFF" />
        </span>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="hidden"
          {...register('image', {
            onChange: handleFile,
          })}
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Imagem do produto"
            fill
            quality={100}
            priority
            className="h-full w-full rounded-lg object-cover"
          />
        )}
      </label>

      {/* {errors.image?.message && (
        <p className="mt-1 text-red-500 text-sm">{errors.image.message}</p>
      )} */}

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="h-10 rounded-lg border border-gray-100 bg-foreground px-4 py-0 text-white placeholder:text-white placeholder:opacity-60"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      />
      {errors.category && (
        <p className="mt-1 text-red-500 text-sm">{errors.category.message}</p>
      )}

      <input
        {...register('name')}
        id="name"
        type="text"
        placeholder="Digite o nome do produto"
        className="h-10 rounded-lg border border-gray-100 bg-foreground px-4 py-0 text-white placeholder:text-white placeholder:opacity-60"
      />
      {errors.name && (
        <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
      )}
      <input
        {...register('price')}
        id="price"
        type="text"
        placeholder="Digite o preço do produto"
        className="h-10 rounded-lg border border-gray-100 bg-foreground px-4 py-0 text-white placeholder:text-white placeholder:opacity-60"
      />
      {errors.price && (
        <p className="mt-1 text-red-500 text-sm">{errors.price.message}</p>
      )}
      <textarea
        id="content"
        {...register('description')}
        placeholder="Digite uma descrição para o produto"
        className="min-h-32 resize-none rounded-lg border border-gray-100 bg-foreground p-4 text-white placeholder:text-white placeholder:opacity-60"
      />
      {errors.description && (
        <p className="mt-1 text-red-500 text-sm">
          {errors.description.message}
        </p>
      )}

      <Button name="Cadastrar produto" isSubmiting={isSubmitting} />
    </form>
  )
}
