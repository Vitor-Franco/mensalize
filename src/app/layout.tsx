import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppinsSans = Poppins({
  variable: '--font-poppings',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mensalize | Visualize suas assinaturas',
  description:
    'Mensalize é uma plataforma para visualizar suas assinaturas de forma simples e intuitiva.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppinsSans.className} antialiased`}>{children}</body>
    </html>
  )
}
