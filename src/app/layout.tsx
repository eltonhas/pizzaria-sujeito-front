import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sujeito Pizza | A melhor pizza do Brasil',
  description: 'A melhor pizza do Brasil',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              border: '1px solid #000',
              padding: '16px',
              color: '#000',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
