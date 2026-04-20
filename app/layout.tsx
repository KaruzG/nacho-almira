import Nav from "@/components/layout/Nav/Nav"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Footer from "@/components/layout/Footer/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NACHO ALMIRA",
  description: "Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}