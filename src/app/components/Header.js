"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "ホーム" },
    { href: "/contact", label: "お問い合わせ" },
    { href: "/blog", label: "ブログ" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 md:h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="関西カフェ検索"
                fill
                className="object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = "/noimage.jpg"
                }}
              />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              関西カフェ検索
            </span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-rose-600 transition-colors duration-300 font-medium relative group text-sm"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <Button variant="ghost" size="sm" className="md:hidden p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-rose-100 animate-slide-down">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-rose-600 transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-rose-50 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
