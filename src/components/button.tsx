'use client'

interface ButtonProps {
  name: string
  isSubmiting: boolean
}

export function Button({ name, isSubmiting }: ButtonProps) {
  return (
    <button
      type="submit"
      className="h-10 rounded-lg bg-green-900 font-bold text-white"
      disabled={isSubmiting}
    >
      {isSubmiting ? 'Cadastrando...' : name}
    </button>
  )
}
