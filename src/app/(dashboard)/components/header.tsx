import Image from 'next/image'
import Link from 'next/link'
import { LogOutButton } from './logout-button'

export function Header() {
  return (
    <header className="h-20">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <Link href={'/'}>
          <Image
            alt="Sujeito Pizza"
            src={'/logo.svg'}
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={'/category'}
            className="text-white transition-colors hover:text-red-900"
          >
            Categoria
          </Link>
          <Link
            href={'/product'}
            className="text-white transition-colors hover:text-red-900"
          >
            Produto
          </Link>

          <LogOutButton />
        </nav>
      </div>
    </header>
  )
}
