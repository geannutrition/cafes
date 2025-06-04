"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Megaphone, Star, TrendingUp, Filter, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "../components/Header"
import Footer from "../components/Footer"
import newsData from "../../data/news.json"

const typeConfig = {
  PR: {
    icon: Megaphone,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    label: "PR",
  },
  NEW: {
    icon: Star,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    label: "新着",
  },
  UPDATE: {
    icon: TrendingUp,
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    label: "更新",
  },
}

export default function NewsPage() {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPrefecture, setSelectedPrefecture] = useState("all")

  // 都道府県一覧を取得
  const prefectures = useMemo(() => {
    const prefs = new Set()
    newsData.forEach((news) => {
      if (news.prefecture) prefs.add(news.prefecture)
    })
    return Array.from(prefs)
  }, [])

  // フィルタリングされたニュース
  const filteredNews = useMemo(() => {
    return newsData.filter((news) => {
      const matchesType = selectedType === "all" || news.type === selectedType
      const matchesPrefecture = selectedPrefecture === "all" || news.prefecture === selectedPrefecture
      return matchesType && matchesPrefecture
    })
  }, [selectedType, selectedPrefecture])

  // 注目記事（featured）
  const featuredNews = newsData.filter((news) => news.featured)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const clearFilters = () => {
    setSelectedType("all")
    setSelectedPrefecture("all")
  }

  const hasActiveFilters = selectedType !== "all" || selectedPrefecture !== "all"

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-8 md:py-16">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 font-serif">ニュース・お知らせ</h1>
          <p className="text-base md:text-xl mb-4 md:mb-8 text-white/90">関西カフェの最新情報をお届けします</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 md:h-10 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-6 md:py-12 flex-grow">
        {/* 注目記事セクション */}
        {featuredNews.length > 0 && (
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 font-serif">注目記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {featuredNews.map((news) => {
                const config = typeConfig[news.type]
                const IconComponent = config.icon
                return (
                  <Link key={news.id} href={`/news/${news.id}`}>
                    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className="relative">
                        <Image
                          src={`/placeholder.svg?height=150&width=400&text=${news.type}`}
                          alt={news.title}
                          width={400}
                          height={150}
                          className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge
                          className={`absolute top-2 md:top-3 left-2 md:left-3 ${config.color} text-white border-0 text-xs`}
                        >
                          <IconComponent className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                        <Badge className="absolute top-2 md:top-3 right-2 md:right-3 bg-rose-500 text-white border-0 text-xs">
                          注目
                        </Badge>
                      </div>
                      <CardContent className="p-3 md:p-6">
                        <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 font-serif group-hover:text-rose-600 transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{news.summary}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span className="hidden sm:inline">{formatDate(news.date)}</span>
                              <span className="sm:hidden">{formatDate(news.date).split("年")[1]}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{news.author}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {news.prefecture}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* フィルターセクション */}
        <section className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0 font-serif">
              全ニュース
              <span className="text-sm md:text-lg font-normal text-gray-500 ml-2 md:ml-3">
                ({filteredNews.length}件)
              </span>
            </h2>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="text-gray-600 hover:text-rose-600 text-sm">
                <X className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                フィルターをクリア
              </Button>
            )}
          </div>

          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            {/* タイプフィルター */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                  className={`text-xs md:text-sm h-8 px-2 md:px-3 ${selectedType === "all" ? "bg-gray-800 text-white" : ""}`}
                >
                  すべて
                </Button>
                {Object.entries(typeConfig).map(([type, config]) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={`text-xs md:text-sm h-8 px-2 md:px-3 ${selectedType === type ? `${config.color} text-white` : `${config.textColor}`}`}
                  >
                    <config.icon className="w-3 h-3 mr-1" />
                    {config.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 都道府県フィルター */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">地域</label>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <Button
                  variant={selectedPrefecture === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPrefecture("all")}
                  className={`text-xs md:text-sm h-8 px-2 md:px-3 ${selectedPrefecture === "all" ? "bg-gray-800 text-white" : ""}`}
                >
                  すべて
                </Button>
                {prefectures.map((prefecture) => (
                  <Button
                    key={prefecture}
                    variant={selectedPrefecture === prefecture ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPrefecture(prefecture)}
                    className={`text-xs md:text-sm h-8 px-2 md:px-3 ${
                      selectedPrefecture === prefecture ? "bg-rose-500 text-white" : "text-rose-600 border-rose-200"
                    }`}
                  >
                    {prefecture}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ニュース一覧 */}
        <section>
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <Filter className="w-12 md:w-16 h-12 md:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-gray-500 font-medium">条件に合うニュースが見つかりませんでした</p>
              <p className="text-gray-400 mt-2">フィルター条件を変更してみてください</p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {filteredNews.map((news, index) => {
                const config = typeConfig[news.type]
                const IconComponent = config.icon
                return (
                  <Link key={news.id} href={`/news/${news.id}`}>
                    <Card
                      className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-0">
                        <div className="relative col-span-1">
                          <Image
                            src={`/placeholder.svg?height=100&width=150&text=${news.type}`}
                            alt={news.title}
                            width={150}
                            height={100}
                            className="w-full h-20 md:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge
                            className={`absolute top-1 md:top-2 left-1 md:left-2 ${config.color} text-white border-0 text-xs`}
                          >
                            <IconComponent className="w-2 md:w-3 h-2 md:h-3 mr-0.5 md:mr-1" />
                            <span className="hidden sm:inline">{config.label}</span>
                          </Badge>
                        </div>
                        <CardContent className="col-span-2 md:col-span-3 p-3 md:p-6">
                          <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-1 md:mb-2 font-serif group-hover:text-rose-600 transition-colors line-clamp-2">
                            {news.title}
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">{news.summary}</p>
                          <div className="flex flex-wrap items-center gap-1 md:gap-3 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span className="hidden sm:inline">{formatDate(news.date)}</span>
                              <span className="sm:hidden">{formatDate(news.date).split("年")[1]}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{news.author}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {news.prefecture}
                            </Badge>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  )
}
