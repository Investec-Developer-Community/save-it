import Footer from '@/components/Footer'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="bg-gray-100">
      <Head />
      <body className="flex flex-col min-h-screen">
        <Main />
        <NextScript />
      </body>
      <Footer />
    </Html>
  )
}
