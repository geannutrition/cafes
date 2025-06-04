"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Megaphone, Star, TrendingUp, Share2, ExternalLink, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import newsData from "../../../data/news.json"

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

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [news, setNews] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)

  const newsId = Number.parseInt(params.id)

  useEffect(() => {
    const foundNews = newsData.find((n) => n.id === newsId)
    if (foundNews) {
      setNews(foundNews)
      // 関連ニュース（同じ都道府県または同じタイプ）
      const related = newsData
        .filter((n) => n.id !== newsId && (n.prefecture === foundNews.prefecture || n.type === foundNews.type))
        .slice(0, 3)
      setRelatedNews(related)
    }
    setLoading(false)
  }, [newsId])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href,
      })
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("URLをクリップボードにコピーしました"))
        .catch((err) => console.error("URLのコピーに失敗しました", err))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center flex-grow">
          <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
          <p className="text-xl text-gray-500 font-medium">記事を読み込み中...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center flex-grow">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-serif">記事が見つかりません</h1>
          <p className="text-gray-600 mb-6">指定された記事は存在しないか、削除された可能性があります。</p>
          <Link href="/news">
            <Button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium">
              ニュース一覧に戻る
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const config = typeConfig[news.type]
  const IconComponent = config.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8 flex-grow">
        {/* 戻るボタン */}
        <Link href="/news">
          <Button
            variant="ghost"
            className="mb-4 md:mb-6 hover:bg-rose-50 text-gray-600 hover:text-rose-600 font-medium text-sm"
          >
            <ArrowLeft className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
            ニュース一覧に戻る
          </Button>
        </Link>

        <div className="space-y-4 md:space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* メイン記事 */}
          <div className="lg:col-span-2">
            <article className="space-y-4 md:space-y-6">
              {/* 記事ヘッダー */}
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="relative">
                  <Image
                    src={`/placeholder.svg?height=200&width=600&text=${news.type}`}
                    alt={news.title}
                    width={600}
                    height={200}
                    className="w-full h-40 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
                    <Badge className={`${config.color} text-white border-0 mb-2 md:mb-3 text-xs`}>
                      <IconComponent className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                      {config.label}
                    </Badge>
                    <h1 className="text-base md:text-4xl font-bold text-white mb-1 md:mb-2 font-serif leading-tight">
                      {news.title}
                    </h1>
                    <p className="text-white/90 text-xs md:text-lg leading-tight">{news.summary}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 hover:bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-lg w-8 h-8 md:w-10 md:h-10"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 md:w-5 h-4 md:h-5" />
                  </Button>
                </div>
              </Card>

              {/* 記事メタ情報 */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-3 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <Calendar className="w-3 md:w-4 h-3 md:h-4" />
                      <span>{formatDate(news.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <User className="w-3 md:w-4 h-3 md:h-4" />
                      <span>{news.author}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {news.prefecture}
                    </Badge>
                    {news.cafeId && (
                      <Link href={`/cafe/${news.cafeId}`}>
                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer text-xs">
                          <Coffee className="w-3 h-3 mr-1" />
                          関連カフェを見る
                        </Badge>
                      </Link>
                    )}
                  </div>
                  {news.tags && (
                    <div className="flex items-start space-x-2 mt-3 md:mt-4">
                      <Tag className="w-3 md:w-4 h-3 md:h-4 text-gray-500 mt-0.5" />
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {news.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 記事本文 */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 md:p-8">
                  <div className="prose prose-sm md:prose-lg max-w-none">
                    {news.content.split("\n").map((paragraph, index) => {
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        // 見出し
                        return (
                          <h3
                            key={index}
                            className="text-base md:text-xl font-bold text-gray-800 mt-4 md:mt-8 mb-2 md:mb-4 font-serif"
                          >
                            {paragraph.replace(/\*\*/g, "")}
                          </h3>
                        )
                      } else if (paragraph.startsWith("- ")) {
                        // リスト項目
                        return (
                          <li key={index} className="text-gray-700 leading-relaxed mb-1 md:mb-2 text-sm md:text-base">
                            {paragraph.substring(2)}
                          </li>
                        )
                      } else if (paragraph.trim() === "") {
                        // 空行
                        return <br key={index} />
                      } else {
                        // 通常の段落
                        return (
                          <p key={index} className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                            {paragraph}
                          </p>
                        )
                      }
                    })}
                  </div>
                </CardContent>
              </Card>
            </article>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* 関連ニュース */}
            {relatedNews.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-800 mb-3 md:mb-4 font-serif text-sm md:text-lg">関連ニュース</h3>
                  <div className="space-y-3 md:space-y-4">
                    {relatedNews.map((relatedItem) => {
                      const relatedConfig = typeConfig[relatedItem.type]
                      const RelatedIcon = relatedConfig.icon
                      return (
                        <Link key={relatedItem.id} href={`/news/${relatedItem.id}`}>
                          <div className="flex space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
                            <Image
                              src={`/placeholder.svg?height=40&width=60&text=${relatedItem.type}`}
                              alt={relatedItem.title}
                              width={60}
                              height={40}
                              className="w-12 md:w-20 h-9 md:h-15 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <Badge className={`${relatedConfig.color} text-white border-0 text-xs mb-1`}>
                                <RelatedIcon className="w-2 md:w-3 h-2 md:h-3 mr-0.5 md:mr-1" />
                                {relatedConfig.label}
                              </Badge>
                              <h4 className="font-medium text-gray-800 text-xs md:text-sm line-clamp-2 font-serif leading-tight">
                                {relatedItem.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">{formatDate(relatedItem.date)}</p>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* シェアボタン */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-bold text-gray-800 mb-3 md:mb-4 font-serif text-sm md:text-lg">この記事をシェア</h3>
                <div className="space-y-2 md:space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 text-gray-600 hover:bg-gray-50 text-xs md:text-sm h-8 md:h-10"
                    onClick={() =>
                      window.open(
                        `https://x.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                      )
                    }
                  >
                    <ExternalLink className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                    Xでシェア
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-300 text-blue-600 hover:bg-blue-50 text-xs md:text-sm h-8 md:h-10"
                    onClick={handleShare}
                  >
                    <Share2 className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                    その他の方法でシェア
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* ニュース一覧へのリンク */}
            <Card className="bg-gradient-to-r from-rose-50 to-amber-50 border-0">
              <CardContent className="p-4 md:p-6 text-center">
                <h3 className="font-bold text-gray-800 mb-2 font-serif text-sm md:text-base">他のニュースも見る</h3>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">関西カフェの最新情報をチェック</p>
                <Link href="/news">
                  <Button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white border-0 font-medium text-xs md:text-sm h-8 md:h-10">
                    ニュース一覧を見る
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
