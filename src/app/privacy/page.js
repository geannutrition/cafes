"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800 font-serif">
            プライバシーポリシー
          </h1>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6 md:space-y-8">
                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">基本方針</h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    関西カフェ検索（以下「当サイト」といいます。）は、本ウェブサイトをご利用される皆様の個人情報の保護について、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定め、個人情報保護法その他の関連法令を遵守し、適切な取り扱いを実施いたします。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">個人情報の定義</h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    本ポリシーにおいて「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    個人情報の収集方法
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    当サイトは、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当サイトの提携先（情報提供元、広告主、広告配信先などを含みます。以下、「提携先」といいます。）などから収集することがあります。
                  </p>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    ただし、現在当サイトでは会員登録機能は提供しておらず、お問い合わせフォームを通じて任意でご提供いただく情報のみを収集しています。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    個人情報を収集・利用する目的
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    当サイトが個人情報を収集・利用する目的は、以下のとおりです。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
                    <li>当サイトのサービスの提供・運営のため</li>
                    <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                    <li>
                      ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当サイトが提供する他のサービスの案内のメールを送付するため
                    </li>
                    <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                    <li>
                      利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
                    </li>
                    <li>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
                    <li>上記の利用目的に付随する目的</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">利用目的の変更</h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    当サイトは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。利用目的の変更を行った場合には、変更後の目的について、当サイト所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    個人情報の第三者提供
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    当サイトは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
                    <li>
                      人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                    </li>
                    <li>
                      公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                    </li>
                    <li>
                      国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                    </li>
                    <li>予め次の事項を告知あるいは公表し、かつ当サイトが個人情報保護委員会に届出をしたとき</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">個人情報の開示</h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    当サイトは、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    個人情報の訂正および削除
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    ユーザーは、当サイトの保有する自己の個人情報が誤った情報である場合には、当サイトが定める手続きにより、当サイトに対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。当サイトは、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    Cookie（クッキー）について
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    当サイトでは、ユーザーの利便性向上のためにCookie（クッキー）を使用することがあります。Cookieとは、ウェブサイトが皆様のコンピュータのハードディスク上に置かれたブラウザのファイルです。
                  </p>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    Cookieにより当サイトはユーザーのコンピュータを識別できますが、ユーザー個人を直ちに特定できるものではありません。
                  </p>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    なお、ユーザーはブラウザの設定によりCookieの受け取りを拒否することができますが、その場合当サイトの一部の機能をご利用いただけない場合があります。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    ローカルストレージについて
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    当サイトでは、お気に入り機能や最近見たカフェの履歴などの機能を提供するために、ブラウザのローカルストレージを使用しています。これらの情報はユーザーのブラウザ内にのみ保存され、当サイトのサーバーには送信されません。ユーザーはブラウザの設定からこれらの情報を削除することができます。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    プライバシーポリシーの変更
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。当サイトが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
                  </p>
                </section>

                <section>
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-rose-600 font-serif">
                    お問い合わせ窓口
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    本ポリシーに関するお問い合わせは、下記の連絡先までお願いいたします。
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="text-sm md:text-base text-gray-700">
                      <strong>メールアドレス：</strong>kansai.cafe.search@gmail.com
                    </p>
                  </div>
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
