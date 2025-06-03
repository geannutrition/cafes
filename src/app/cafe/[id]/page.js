"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, ExternalLink, Heart, Share2, Play, Star, Calendar, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "../../components/Header"
import FeatureIcons from "../../components/FeatureIcons"
import OpeningHoursDisplay from "../../components/OpeningHoursDisplay"

// サンプルデータ（実際のプロジェクトではcafes.jsonから読み込み）
const cafesData = [
  {
    id: 1,
    name: "カフェ・ド・パリ",
    address: "大阪府大阪市北区梅田1-1-1",
    hours: "8:00-22:00",
    features: ["Wi-Fi", "電源", "静か"],
    location: "大阪府",
    description:
      "フランス風の落ち着いた雰囲気のカフェ。美味しいコーヒーと手作りスイーツが自慢です。パリの街角にあるような温かみのある空間で、ゆったりとした時間をお過ごしいただけます。朝早くから夜遅くまで営業しているので、モーニングからディナーまで様々なシーンでご利用いただけます。",
    image: "/images/cafes/1/main.jpg",
    video: "/videos/cafes/1/tour.mp4",
    tabelog_url: "https://tabelog.com/example1",
    rating: 4.5,
    isNew: true,
    openDate: "2023-10-15",
    businessHours: {
      mon: { open: "8:00", close: "22:00" },
      tue: { open: "8:00", close: "22:00" },
      wed: { open: "8:00", close: "22:00" },
      thu: { open: "8:00", close: "22:00" },
      fri: { open: "8:00", close: "23:00" },
      sat: { open: "9:00", close: "23:00" },
      sun: { open: "9:00", close: "21:00" },
    },
    popularMenu: [
      { name: "クロワッサン", price: "380円", description: "バターの香り豊かな本格派" },
      { name: "カフェラテ", price: "520円", description: "濃厚なエスプレッソと滑らかなミルク" },
      { name: "キッシュロレーヌ", price: "680円", description: "ベーコンとチーズの風味が絶妙" },
    ],
  },
  {
    id: 2,
    name: "京都茶房",
    address: "京都府京都市中京区河原町通り2-2-2",
    hours: "9:00-21:00",
    features: ["和風", "静か", "テラス"],
    location: "京都府",
    description: "伝統的な京都の雰囲気を味わえる茶房。抹茶と和菓子が絶品です。",
    image: "/images/cafes/2/main.jpg",
    video: null,
    tabelog_url: "https://tabelog.com/example2",
    rating: 4.2,
    isNew: false,
    openDate: "2020-05-10",
    businessHours: {
      mon: { open: "9:00", close: "21:00" },
      tue: { open: "9:00", close: "21:00" },
      wed: { open: "9:00", close: "21:00" },
      thu: { open: "9:00", close: "21:00" },
      fri: { open: "9:00", close: "21:00" },
      sat: { open: "10:00", close: "22:00" },
      sun: { open: "10:00", close: "20:00" },
    },
    popularMenu: [
      { name: "抹茶セット", price: "850円", description: "濃厚な抹茶と季節の和菓子" },
      { name: "ほうじ茶ラテ", price: "580円", description: "香ばしさと甘みのハーモニー" },
      { name: "わらび餅", price: "650円", description: "手作りの黒蜜ときな粉で" },
    ],
  },
  {
    id: 3,
    name: "モダンブリュー",
    address: "兵庫県神戸市中央区三宮町3-3-3",
    hours: "7:00-20:00",
    features: ["Wi-Fi", "電源", "コワーキング"],
    location: "兵庫県",
    description: "スタイリッシュな空間でこだわりのコーヒーを。ノマドワーカーにも人気です。",
    image: "/images/cafes/3/main.jpg",
    video: "/videos/cafes/3/tour.mp4",
    tabelog_url: "https://tabelog.com/example3",
    rating: 4.7,
    isNew: true,
    openDate: "2023-09-05",
    businessHours: {
      mon: { open: "7:00", close: "20:00" },
      tue: { open: "7:00", close: "20:00" },
      wed: { open: "7:00", close: "20:00" },
      thu: { open: "7:00", close: "20:00" },
      fri: { open: "7:00", close: "22:00" },
      sat: { open: "8:00", close: "22:00" },
      sun: { open: "8:00", close: "19:00" },
    },
    popularMenu: [
      { name: "シングルオリジン", price: "550円", description: "日替わりの豆を楽しめる一杯" },
      { name: "アボカドトースト", price: "780円", description: "朝食にぴったりの栄養満点メニュー" },
      { name: "チーズケーキ", price: "620円", description: "なめらかな口当たりと濃厚な味わい" },
    ],
  },
]

export default function CafeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const cafeId = Number.parseInt(params.id)
  const cafe = cafesData.find((c) => c.id === cafeId)

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">カフェが見つかりません</h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white">ホームに戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* 戻るボタン */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-rose-50 text-gray-600 hover:text-rose-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* メイン画像・動画エリア */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl">
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

                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white border-0">
                  {cafe.location}
                </Badge>

                {/* 新着バッジ */}
                {cafe.isNew && (
                  <Badge className="absolute bottom-4 left-4 bg-rose-600 text-white border-0 animate-pulse">NEW</Badge>
                )}
              </div>
            </Card>

            {/* 説明 */}
            <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">カフェについて</h2>
                <p className="text-gray-700 leading-relaxed">{cafe.description}</p>

                {/* 人気メニュー */}
                {cafe.popularMenu && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Coffee className="w-5 h-5 mr-2 text-amber-600" />
                      人気メニュー
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {cafe.popularMenu.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold text-rose-600">{item.name}</h4>
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{cafe.name}</h1>

                {/* 評価 */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(cafe.rating)}</div>
                  <span className="text-amber-700 font-medium">{cafe.rating}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">{cafe.address}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
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
                    <span className="text-gray-700">{cafe.hours}</span>
                  </div>

                  {cafe.openDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-rose-500" />
                      <span className="text-gray-700">オープン日: {cafe.openDate}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">特徴</h3>
                  <FeatureIcons features={cafe.features} />
                </div>

                <Button
                  onClick={() => window.open(cafe.tabelog_url, "_blank")}
                  className="w-full mt-6 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white border-0"
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
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
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
                <h3 className="font-bold text-gray-800 mb-4">同じ地域のカフェ</h3>
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
                            <p className="font-medium text-gray-800 truncate">{relatedCafe.name}</p>
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
