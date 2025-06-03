import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

// モダンなフォントの設定
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata = {
  title: "関西カフェガイド",
  description: "関西の素敵なカフェを見つけよう",
  generator: "v0.dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}

