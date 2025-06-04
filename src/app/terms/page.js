"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800 font-serif">利用規約</h1>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6 md:space-y-8">
                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">第1条（適用）</h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    本利用規約（以下「本規約」といいます。）は、関西カフェ検索（以下「当サイト」といいます。）がこのウェブサイト上で提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第2条（利用登録）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    本サービスにおいて、利用登録は必要ありません。ただし、お気に入り機能などの一部機能については、ブラウザのローカルストレージを使用します。
                  </p>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    ユーザーは、本サービスを利用することで、本規約に同意したものとみなします。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第3条（禁止事項）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>犯罪行為に関連する行為</li>
                    <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                    <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
                    <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                    <li>不正アクセスをし、またはこれを試みる行為</li>
                    <li>他のユーザーに成りすます行為</li>
                    <li>当サイトのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                    <li>その他、当サイトが不適切と判断する行為</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第4条（本サービスの提供の停止等）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    当サイトは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
                    <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                    <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                    <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                    <li>その他、当サイトが本サービスの提供が困難と判断した場合</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第5条（免責事項）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    当サイトは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                  </p>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    当サイトは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当サイトとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第6条（サービス内容の変更等）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    当サイトは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第7条（利用規約の変更）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第8条（個人情報の取扱い）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    当サイトは、本サービスの利用によって取得する個人情報については、当サイト「プライバシーポリシー」に従い適切に取り扱うものとします。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    第9条（準拠法・裁判管轄）
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当サイトの本店所在地を管轄する裁判所を専属的合意管轄とします。
                  </p>
                </section>

                <div className="border-t border-gray-200 pt-6 mt-8">
                  <p className="text-xs md:text-sm text-gray-500 text-center">
                    制定日：2025年6月4日
                    <br />
                    最終更新日：2025年6月4日
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
