"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Clock,
  ExternalLink,
  Heart,
  Share2,
  Play,
  Star,
  Calendar,
  Coffee,
  Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "../../components/Header"
import FeatureIcons from "../../components/FeatureIcons"
import OpeningHoursDisplay from "../../components/OpeningHoursDisplay"
import cafesData from "../../../data/cafes.json"

// PR期間中かどうかを判定する関数
const isPRActive = (cafe) => {
  if (!cafe.isPR || !cafe.prStartDate || !cafe.prEndDate) return false

  const now = new Date()
  const startDate = new Date(cafe.prStartDate)
  const endDate = new Date(cafe.prEndDate)

  return now >= startDate && now <= endDate
}

export default function CafeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const cafeId = Number.parseInt(params.id)
  const cafe = cafesData.find((c) => c.id === cafeId)
  const isCurrentlyPR = cafe ? isPRActive(cafe) : false

  // お気に入り状態をローカルストレージから読み込み
  useEffect(() => {
    const storedFavorites = localStorage.getItem("cafeFavorites")
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsLiked(favorites.includes(cafeId))
    }
  }, [cafeId])

  // お気に入りの切り替え
  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("cafeFavorites")
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isLiked) {
      favorites = favorites.filter((id) => id !== cafeId)
    } else {
      favorites.push(cafeId)
    }

    localStorage.setItem("cafeFavorites", JSON.stringify(favorites))
    setIsLiked(!isLiked)
  }

  // 星評価を表示する関数
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-amber-500 text-amber-500" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-amber-500" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-amber-200" />)
    }

    return stars
  }

  if (!cafe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-serif">カフェが見つかりません</h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium">ホームに戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      <Header />

      {/* PRバナー */}
      {isCurrentlyPR && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Megaphone className="w-5 h-5" />
              <span className="font-medium">このカフェは現在PR期間中です</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* 戻るボタン */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-rose-50 text-gray-600 hover:text-rose-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* メイン画像・動画エリア */}
          <div className="lg:col-span-2">
            <Card
              className={`overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl ${
                isCurrentlyPR ? "ring-2 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              <div className="relative">
                {showVideo && cafe.video ? (
                  <video
                    controls
                    className="w-full h-96 object-cover"
                    poster={imageError ? "/placeholder.svg?height=400&width=800" : cafe.image}
                  >
                    <source src={cafe.video} type="video/mp4" />
                    お使いのブラウザは動画をサポートしていません。
                  </video>
                ) : (
                  <div className="relative">
                    <Image
                      src={imageError ? "/placeholder.svg?height=400&width=800" : cafe.image}
                      alt={cafe.name}
                      width={800}
                      height={400}
                      className="w-full h-96 object-cover"
                      onError={() => setImageError(true)}
                    />
                    {cafe.video && (
                      <Button
                        onClick={() => setShowVideo(true)}
                        className="absolute inset-0 bg-black/30 hover:bg-black/40 text-white border-0 rounded-none flex items-center justify-center"
                      >
                        <Play className="w-16 h-16" />
                      </Button>
                    )}
                  </div>
                )}

                {/* アクションボタン */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${isLiked ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-white/90 hover:bg-white text-gray-600 hover:text-rose-500"} rounded-full shadow-lg`}
                    onClick={toggleFavorite}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/90 hover:bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-lg"
                    onClick={() => navigator.share?.({ title: cafe.name, url: window.location.href })}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* PRバッジ */}
                {isCurrentlyPR && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 font-medium animate-pulse">
                    <Megaphone className="w-3 h-3 mr-1" />
                    PR
                  </Badge>
                )}

                {/* 地域バッジ */}
                <Badge
                  className={`absolute ${isCurrentlyPR ? "top-12" : "top-4"} left-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white border-0 font-medium`}
                >
                  {cafe.location}
                </Badge>

                {/* 新着バッジ */}
                {cafe.isNew && (
                  <Badge className="absolute bottom-4 left-4 bg-rose-600 text-white border-0 animate-pulse font-medium">
                    NEW
                  </Badge>
                )}
              </div>
            </Card>

            {/* 説明 */}
            <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 font-serif">カフェについて</h2>
                <p className="text-gray-700 leading-relaxed font-medium">{cafe.description}</p>

                {/* 人気メニュー */}
                {cafe.popularMenu && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center font-serif">
                      <Coffee className="w-5 h-5 mr-2 text-amber-600" />
                      人気メニュー
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {cafe.popularMenu.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold text-rose-600 font-serif">{item.name}</h4>
                          <p className="text-amber-600 font-medium">{item.price}</p>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* サイドバー情報 */}
          <div className="space-y-6">
            {/* 基本情報 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">{cafe.name}</h1>

                {/* 評価 */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(cafe.rating)}</div>
                  <span className="text-amber-700 font-medium">{cafe.rating}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">{cafe.address}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() =>
                          window.open(`https://maps.google.com/?q=${encodeURIComponent(cafe.address)}`, "_blank")
                        }
                      >
                        地図で見る
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span className="text-gray-700 font-medium">{cafe.hours}</span>
                  </div>

                  {cafe.openDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-rose-500" />
                      <span className="text-gray-700 font-medium">オープン日: {cafe.openDate}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3 font-serif">特徴</h3>
                  <FeatureIcons features={cafe.features} />
                </div>

                <Button
                  onClick={() => window.open(cafe.tabelog_url, "_blank")}
                  className={`w-full mt-6 ${
                    isCurrentlyPR
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      : "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                  } text-white border-0 font-medium`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  食べログで見る
                </Button>
              </CardContent>
            </Card>

            {/* 営業時間 */}
            {cafe.businessHours && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center font-serif">
                    <Clock className="w-5 h-5 mr-2 text-amber-500" />
                    営業時間
                  </h3>
                  <OpeningHoursDisplay hours={cafe.businessHours} />
                </CardContent>
              </Card>
            )}

            {/* 関連カフェ */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 font-serif">同じ地域のカフェ</h3>
                <div className="space-y-3">
                  {cafesData
                    .filter((c) => c.location === cafe.location && c.id !== cafe.id)
                    .slice(0, 2)
                    .map((relatedCafe) => (
                      <Link key={relatedCafe.id} href={`/cafe/${relatedCafe.id}`}>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
                          <Image
                            src="/placeholder.svg?height=50&width=50"
                            alt={relatedCafe.name}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate font-serif">{relatedCafe.name}</p>
                            <p className="text-sm text-gray-500 truncate">{relatedCafe.address}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
