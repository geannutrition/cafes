"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-rose-100 mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-sm">
          {/* リンク */}
          <div className="flex items-center space-x-4">
            <Link href="/terms" className="text-gray-600 hover:text-rose-600 transition-colors">
              利用規約
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-rose-600 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors">
              お問い合わせ
            </Link>
          </div>

          {/* コピーライト */}
          <p className="text-xs text-gray-500">&copy; {currentYear} 関西カフェ検索</p>
        </div>
      </div>
    </footer>
  )
}
