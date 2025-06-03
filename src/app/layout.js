import { Noto_Sans_JP, Noto_Serif_JP, Playfair_Display } from "next/font/google"
import "./globals.css"

// フォントの設定
const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans",
})

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-serif",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata = {
  title: "関西カフェ検索",
  description: "関西の素敵なカフェを特徴や雰囲気から探せる専門サイト",
  generator: "v0.dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
