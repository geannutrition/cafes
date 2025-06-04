"use client"

import { Mail } from "lucide-react"
import Header from "../components/Header"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-gray-800">お問い合わせ</h1>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6 md:mb-8">
            <CardContent className="p-4 md:p-8">
              <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-rose-600">関西カフェ検索について</h2>
              <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-700">
                当サイトは、カフェ巡り好きの方々のために特徴や雰囲気などで検索できるようにした専門サイトです。
                InstagramやGoogleマップでは叶わなかった、より細やかな検索体験を提供することを目指しています。
              </p>
              <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-700">
                Wi-Fi完備のお店、静かな作業環境、テラス席があるカフェなど、あなたの「ほしい」カフェ体験に合わせた検索が可能です。
                関西エリアの素敵なカフェとの出会いをサポートします。
              </p>

              <div className="border-t border-gray-100 my-4 md:my-6"></div>

              <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-amber-600">運営について</h2>
              <p className="text-sm md:text-lg leading-relaxed mb-3 md:mb-4 text-gray-700">
                本サイトは個人が運営しております。情報は定期的に更新するよう努めておりますが、
                一部最新の情報ではない可能性があります。ご利用の際は、各カフェの公式サイトや
                SNSなどで最新情報をご確認いただくことをおすすめします。
              </p>

              <div className="bg-amber-50 rounded-lg p-4 md:p-6 mt-6 md:mt-8">
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-gray-800">お問い合わせ</h3>
                <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">
                  サイトに関するご意見・ご要望や、情報の修正依頼などがございましたら、
                  下記のメールアドレスまでお気軽にお問い合わせください。
                </p>
                <div className="flex items-center justify-center sm:justify-start">
                  <Mail className="w-4 md:w-5 h-4 md:h-5 text-rose-500 mr-2" />
                  <a
                    href="mailto:kansai.cafe.search@gmail.com"
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors text-sm md:text-base"
                  >
                    kansai.cafe.search@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 md:p-8">
              <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-rose-600">サイトの使い方</h2>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-base md:text-xl font-bold mb-2 text-gray-800">カフェを探す</h3>
                  <p className="text-sm md:text-base text-gray-700">
                    トップページの検索バーでカフェ名や地域を入力するか、左側の絞り込みパネルで特徴や地域を選択して、
                    あなたの条件に合ったカフェを見つけることができます。
                  </p>
                </div>

                <div>
                  <h3 className="text-base md:text-xl font-bold mb-2 text-gray-800">お気に入り機能</h3>
                  <p className="text-sm md:text-base text-gray-700">
                    気になるカフェは「お気に入り」に登録できます。カフェカードの右上にあるハートアイコンをクリックして、
                    あとで見返したいカフェを保存しましょう。
                  </p>
                </div>

                <div>
                  <h3 className="text-base md:text-xl font-bold mb-2 text-gray-800">詳細情報の確認</h3>
                  <p className="text-sm md:text-base text-gray-700">
                    カフェカードをクリックすると、そのカフェの詳細情報ページに移動します。
                    営業時間や特徴、人気メニューなどの情報を確認できます。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
