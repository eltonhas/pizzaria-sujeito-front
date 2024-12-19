import Image from 'next/image'
import Link from 'next/link'
import { FormSignUp } from './components/form-sign-up'

export default function SignUp() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <Image src={'/logo.svg'} width={300} height={300} alt="Sujeito Pizza" />

        <section className="mt-6 flex w-[90%] flex-col items-center justify-center gap-4 md:w-[600px]">
          <h1 className="font-bold text-2xl">Criando sua conta</h1>

          <FormSignUp />

          <Link href={'/'} className="text-gray-400 text-sm">
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div>
    </>
  )
}
