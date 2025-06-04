"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Coffee, TrendingUp, Star, Users, ArrowRight, Megaphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "./components/Header"
import Footer from "./components/Footer"
import newsData from "../data/news.json"

// 都道府県データ
const prefectures = [
  {
    id: "osaka",
    name: "大阪府",
    description: "活気あふれる大都市のカフェ文化",
    image: "/images/prefectures/osaka.jpg",
    cafeCount: 45,
    features: ["Wi-Fi充実", "24時間営業", "コワーキング"],
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "kyoto",
    name: "京都府",
    description: "伝統と現代が融合する古都のカフェ",
    image: "/images/prefectures/kyoto.jpg",
    cafeCount: 38,
    features: ["和風空間", "庭園テラス", "抹茶メニュー"],
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50",
  },
  {
    id: "hyogo",
    name: "兵庫県",
    description: "港町神戸のおしゃれなカフェシーン",
    image: "/images/prefectures/hyogo.jpg",
    cafeCount: 32,
    features: ["海景色", "洋風建築", "スイーツ"],
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
  },
  {
    id: "nara",
    name: "奈良県",
    description: "古都の静寂に包まれた癒しのカフェ",
    image: "/images/prefectures/nara.jpg",
    cafeCount: 18,
    features: ["自然豊か", "静寂", "歴史的建造物"],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
  {
    id: "shiga",
    name: "滋賀県",
    description: "琵琶湖畔の美しい景色とカフェ",
    image: "/images/prefectures/shiga.jpg",
    cafeCount: 15,
    features: ["湖畔", "自然", "リゾート感"],
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: "wakayama",
    name: "和歌山県",
    description: "温泉と自然に囲まれたカフェ体験",
    image: "/images/prefectures/wakayama.jpg",
    cafeCount: 12,
    features: ["温泉地", "山間", "地元食材"],
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
  },
]

export default function HomePage() {
  const [totalCafes, setTotalCafes] = useState(0)
  const [featuredPrefecture, setFeaturedPrefecture] = useState(null)

  // 新着・PR情報（最新3件）
  const newsItems = newsData.slice(0, 3)

  useEffect(() => {
    // 総カフェ数を計算
    const total = prefectures.reduce((sum, pref) => sum + pref.cafeCount, 0)
    setTotalCafes(total)

    // ランダムに注目の都道府県を選択
    const randomIndex = Math.floor(Math.random() * prefectures.length)
    setFeaturedPrefecture(prefectures[randomIndex])
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      month: "numeric",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-amber-600 to-orange-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent animate-fade-in font-serif">
            関西カフェ検索
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-rose-100 animate-fade-in-delay font-medium">
            関西6府県から、あなたにぴったりのカフェを見つけよう
          </p>
          <div className="flex items-center justify-center space-x-6 md:space-x-8 text-rose-100 animate-slide-up">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{totalCafes}+</div>
              <div className="text-sm md:text-base">カフェ掲載</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">6</div>
              <div className="text-sm md:text-base">府県対応</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 md:h-20 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        {/* 地域選択セクション */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">エリアを選択</h2>
            <p className="text-gray-600 text-lg">お探しの地域をクリックして、カフェを探してみましょう</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {prefectures.map((prefecture, index) => (
              <Link key={prefecture.id} href={`/${prefecture.id}`}>
                <Card
                  className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={prefecture.image || "/placeholder.svg"}
                      alt={prefecture.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "/images/noimage/2-1.jpg"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1 font-serif">{prefecture.name}</h3>
                      <p className="text-white/90 text-sm">{prefecture.description}</p>
                    </div>
                    <Badge
                      className={`absolute top-4 right-4 bg-gradient-to-r ${prefecture.color} text-white border-0 font-medium`}
                    >
                      {prefecture.cafeCount}店舗
                    </Badge>
                  </div>

                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prefecture.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{prefecture.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 group-hover:translate-x-1 transition-transform"
                      >
                        探す
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* 新着・PR情報セクション */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">新着・PR情報</h2>
              <p className="text-gray-600">最新のカフェ情報をチェック</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                すべて見る
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <Card
                  className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative">
                    <Image
                      src={item.image || "/images/noimage/2-1.jpg"}
                      alt={item.title}
                      width={300}
                      height={150}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/images/noimage/2-1.jpg"
                      }}
                    />
                    <Badge
                      className={`absolute top-2 left-2 ${
                        item.type === "PR" ? "bg-blue-500" : item.type === "NEW" ? "bg-green-500" : "bg-amber-500"
                      } text-white border-0 text-xs`}
                    >
                      {item.type === "PR" && <Megaphone className="w-3 h-3 mr-1" />}
                      {item.type === "NEW" && <Star className="w-3 h-3 mr-1" />}
                      {item.type === "UPDATE" && <TrendingUp className="w-3 h-3 mr-1" />}
                      {item.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 text-sm font-serif line-clamp-2 group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.prefecture}</span>
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* 注目の地域セクション */}
        {featuredPrefecture && (
          <section className="mb-12">
            <Card className={`${featuredPrefecture.bgColor} border-0 shadow-lg`}>
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <Badge className={`bg-gradient-to-r ${featuredPrefecture.color} text-white border-0 mb-4`}>
                      今週の注目エリア
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 font-serif">
                      {featuredPrefecture.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{featuredPrefecture.description}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-gray-600">{featuredPrefecture.cafeCount}店舗</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">人気エリア</span>
                      </div>
                    </div>
                    <Link href={`/${featuredPrefecture.id}`}>
                      <Button
                        className={`bg-gradient-to-r ${featuredPrefecture.color} text-white border-0 font-medium`}
                      >
                        {featuredPrefecture.name}のカフェを探す
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  <div className="relative">
                    <Image
                      src={featuredPrefecture.image || "/placeholder.svg"}
                      alt={featuredPrefecture.name}
                      width={400}
                      height={250}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src = "/images/noimage/8-5.jpg"
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 統計情報セクション */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-4 md:p-6">
                <Coffee className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-gray-800">{totalCafes}+</div>
                <div className="text-sm text-gray-600">総カフェ数</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-4 md:p-6">
                <MapPin className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-gray-800">6</div>
                <div className="text-sm text-gray-600">対応府県</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-4 md:p-6">
                <Star className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-gray-800">4.3</div>
                <div className="text-sm text-gray-600">平均評価</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
