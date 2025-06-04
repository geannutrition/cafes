"use client"

import { useState } from "react"
import { Mail, Send } from "lucide-react"
import Header from "../components/Header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 実際のプロジェクトではここでAPIを呼び出してメール送信などを行う
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-gray-800">お問い合わせ</h1>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6 md:mb-8">
            <CardContent className="p-4 md:p-8">
              <div className="flex items-center mb-4 md:mb-6">
                <Mail className="w-5 md:w-6 h-5 md:h-6 text-rose-500 mr-2 md:mr-3" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">メールでのお問い合わせ</h2>
              </div>

              <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-700">
                サイトに関するご意見・ご要望や、情報の修正依頼などがございましたら、
                下記のフォームまたはメールアドレスからお気軽にお問い合わせください。
              </p>

              <div className="flex items-center justify-center sm:justify-start mb-6 md:mb-8">
                <a
                  href="mailto:kansai.cafe.search@gmail.com"
                  className="text-rose-600 hover:text-rose-700 font-medium transition-colors text-base md:text-lg"
                >
                  kansai.cafe.search@gmail.com
                </a>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 text-center">
                  <h3 className="text-base md:text-xl font-bold text-green-700 mb-2">
                    お問い合わせありがとうございます
                  </h3>
                  <p className="text-sm md:text-base text-green-600">
                    メッセージを受け付けました。内容を確認の上、必要に応じてご連絡いたします。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                      お名前
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full h-10 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                      メールアドレス
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-10 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                      メッセージ
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white border-0 h-10 md:h-12 text-sm md:text-base"
                  >
                    {isSubmitting ? (
                      "送信中..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        送信する
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
