import Image from 'next/image'
import Link from 'next/link'
import { FormLogin } from './components/form-login'

export default function SignIn() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <Image src={'/logo.svg'} width={300} height={300} alt="Sujeito Pizza" />

        <section className="mt-6 flex w-[90%] flex-col items-center justify-center gap-4 md:w-[600px]">
          <FormLogin />

          <Link href={'/sign-up'} className="text-gray-400 text-sm">
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  )
}
