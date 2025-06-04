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
  Map,
  Phone,
  Instagram,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FeatureIcons from "../../components/FeatureIcons"
import OpeningHoursDisplay from "../../components/OpeningHoursDisplay"

// 都道府県リスト
const prefectures = ["osaka", "kyoto", "hyogo", "nara", "shiga", "wakayama"]

// 都道府県名のマッピング
const prefectureNames = {
  osaka: "大阪府",
  kyoto: "京都府",
  hyogo: "兵庫県",
  nara: "奈良県",
  shiga: "滋賀県",
  wakayama: "和歌山県",
}

// 全都道府県からカフェを検索する関数
const findCafeById = async (cafeId) => {
  for (const prefecture of prefectures) {
    try {
      const data = await import(`../../../data/cafes-${prefecture}.json`)
      const cafe = data.default.find((c) => c.id === cafeId)
      if (cafe) {
        return { cafe, prefecture }
      }
    } catch (error) {
      console.error(`Failed to load cafe data for ${prefecture}:`, error)
    }
  }
  return { cafe: null, prefecture: null }
}

// 都道府県のカフェデータを読み込む関数
const loadPrefectureCafes = async (prefecture) => {
  try {
    const data = await import(`../../../data/cafes-${prefecture}.json`)
    return data.default
  } catch (error) {
    console.error(`Failed to load cafe data for ${prefecture}:`, error)
    return []
  }
}

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
  const [cafe, setCafe] = useState(null)
  const [prefecture, setPrefecture] = useState(null)
  const [relatedCafes, setRelatedCafes] = useState([])
  const [recentlyViewedCafes, setRecentlyViewedCafes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const cafeId = Number.parseInt(params.id)

  // カフェデータの読み込み
  useEffect(() => {
    const loadCafeData = async () => {
      setLoading(true)
      const { cafe: foundCafe, prefecture: foundPrefecture } = await findCafeById(cafeId)

      if (foundCafe && foundPrefecture) {
        setCafe(foundCafe)
        setPrefecture(foundPrefecture)

        // 同じ都道府県の関連カフェを読み込み
        const prefectureCafes = await loadPrefectureCafes(foundPrefecture)
        const related = prefectureCafes.filter((c) => c.id !== cafeId).slice(0, 3)
        setRelatedCafes(related)
      }

      setLoading(false)
    }

    if (cafeId) {
      loadCafeData()
    }
  }, [cafeId])

  // 最近見たカフェの詳細データを読み込み
  useEffect(() => {
    const loadRecentlyViewedCafes = async () => {
      const storedRecent = localStorage.getItem("recentlyViewedCafes")
      let recentCafeIds = storedRecent ? JSON.parse(storedRecent) : []

      // 現在のカフェを追加（重複を避ける）
      if (!recentCafeIds.includes(cafeId)) {
        recentCafeIds = [cafeId, ...recentCafeIds].slice(0, 5) // 最大5件まで保存
        localStorage.setItem("recentlyViewedCafes", JSON.stringify(recentCafeIds))
      }

      // 現在のカフェを除外
      const filteredIds = recentCafeIds.filter((id) => id !== cafeId).slice(0, 3)

      // 各IDからカフェデータを取得
      const recentCafesData = []
      for (const id of filteredIds) {
        const { cafe: recentCafe } = await findCafeById(id)
        if (recentCafe) {
          recentCafesData.push(recentCafe)
        }
      }

      setRecentlyViewedCafes(recentCafesData)
    }

    if (cafeId) {
      loadRecentlyViewedCafes()
    }
  }, [cafeId])

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

  // シェア機能
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cafe.name,
        text: `${cafe.name}をチェックしてみてください！`,
        url: window.location.href,
      })
    } else {
      // フォールバック: URLをクリップボードにコピー
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("URLをクリップボードにコピーしました"))
        .catch((err) => console.error("URLのコピーに失敗しました", err))
    }
  }

  // 星評価を表示する関数
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 md:w-5 h-4 md:h-5 fill-amber-500 text-amber-500" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 md:w-5 h-4 md:h-5 text-amber-500" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 md:w-5 h-4 md:h-5 fill-amber-500 text-amber-500" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 md:w-5 h-4 md:h-5 text-amber-200" />)
    }

    return stars
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center flex-grow">
          <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
          <p className="text-xl text-gray-500 font-medium">カフェ情報を読み込み中...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!cafe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center flex-grow">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-serif">カフェが見つかりません</h1>
          <p className="text-gray-600 mb-6">指定されたカフェは存在しないか、削除された可能性があります。</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium">ホームに戻る</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      {/* PRバナー */}
      {isCurrentlyPR && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Megaphone className="w-4 h-4" />
              <span className="font-medium text-sm">このカフェは現在PR期間中です</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 md:py-8 flex-grow">
        {/* 戻るボタン - 都道府県ページに戻る */}
        <Link href={`/${prefecture}`}>
          <Button
            variant="ghost"
            className="mb-2 md:mb-6 hover:bg-rose-50 text-gray-600 hover:text-rose-600 font-medium text-sm py-1 h-auto"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            {prefectureNames[prefecture]}のカフェ一覧に戻る
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          {/* メイン画像・動画エリア - 高さ縮小 */}
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
                    className="w-full h-64 md:h-96 object-cover"
                    poster={imageError ? "/images/noimage/2-1.jpg" : cafe.image}
                  >
                    <source src={cafe.video} type="video/mp4" />
                    お使いのブラウザは動画をサポートしていません。
                  </video>
                ) : (
                  <div className="relative">
                    <Image
                      src={imageError ? "/images/noimage/2-1.jpg" : cafe.image}
                      alt={cafe.name}
                      width={800}
                      height={400}
                      className="w-full h-64 md:h-96 object-cover"
                      onError={() => setImageError(true)}
                    />
                    {cafe.video && (
                      <Button
                        onClick={() => setShowVideo(true)}
                        className="absolute inset-0 bg-black/30 hover:bg-black/40 text-white border-0 rounded-none flex items-center justify-center"
                      >
                        <Play className="w-12 h-12 md:w-16 md:h-16" />
                      </Button>
                    )}
                  </div>
                )}

                {/* アクションボタン */}
                <div className="absolute top-2 md:top-4 right-2 md:right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${isLiked ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-white/90 hover:bg-white text-gray-600 hover:text-rose-500"} rounded-full shadow-lg w-8 h-8 md:w-10 md:h-10`}
                    onClick={toggleFavorite}
                  >
                    <Heart className={`w-4 md:w-5 h-4 md:h-5 ${isLiked ? "fill-white" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/90 hover:bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-lg w-8 h-8 md:w-10 md:h-10"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 md:w-5 h-4 md:h-5" />
                  </Button>
                </div>

                {/* PRバッジ */}
                {isCurrentlyPR && (
                  <Badge className="absolute top-2 md:top-4 left-2 md:left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 font-medium animate-pulse text-xs">
                    <Megaphone className="w-3 h-3 mr-1" />
                    PR
                  </Badge>
                )}

                {/* 地域バッジ */}
                <Badge
                  className={`absolute ${isCurrentlyPR ? "top-8 md:top-12" : "top-2 md:top-4"} left-2 md:left-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white border-0 font-medium text-xs`}
                >
                  {cafe.location}
                </Badge>

                {/* 新着バッジ */}
                {cafe.isNew && (
                  <Badge className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-rose-600 text-white border-0 animate-pulse font-medium text-xs">
                    NEW
                  </Badge>
                )}
              </div>
            </Card>

            {/* カフェ名と基本情報 - モバイルでは上部に表示 */}
            <div className="lg:hidden mt-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-1 font-serif">{cafe.name}</h1>

              {/* 評価 */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">{renderStars(cafe.rating)}</div>
                <span className="text-amber-700 font-medium">{cafe.rating}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 text-sm">{cafe.address}</p>
                    <div className="flex space-x-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-rose-200 text-rose-700"
                        onClick={() =>
                          window.open(`https://maps.google.com/?q=${encodeURIComponent(cafe.address)}`, "_blank")
                        }
                      >
                        <Map className="w-3 h-3 mr-1" />
                        地図
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-amber-200 text-amber-700"
                        onClick={() => window.open(cafe.tabelog_url, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        食べログ
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-700 text-sm">{cafe.hours}</span>
                </div>
              </div>

              <div className="mb-4">
                <FeatureIcons features={cafe.features} />
              </div>
            </div>

            {/* 説明 */}
            <Card className="mt-4 md:mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 font-serif">カフェについて</h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{cafe.description}</p>

                {/* 人気メニュー */}
                {cafe.popularMenu && (
                  <div className="mt-6 md:mt-8">
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center font-serif">
                      <Coffee className="w-4 md:w-5 h-4 md:h-5 mr-2 text-amber-600" />
                      人気メニュー
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {cafe.popularMenu.map((item, index) => (
                        <div key={index} className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold text-rose-600 font-serif text-sm md:text-base">{item.name}</h4>
                          <p className="text-amber-600 font-medium text-xs md:text-sm">{item.price}</p>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SNSシェアボタン */}
            <div className="mt-4 flex justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                onClick={() =>
                  window.open(
                    `https://x.com/intent/tweet?text=${encodeURIComponent(`${cafe.name}をチェックしてみてください！`)}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank",
                  )
                }
              >
                <Twitter className="w-4 h-4 mr-2" />X
              </Button>
              {cafe.instagram && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-pink-300 text-pink-600 hover:bg-pink-50"
                  onClick={() => window.open(cafe.instagram, "_blank")}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                シェア
              </Button>
            </div>
          </div>

          {/* サイドバー情報 */}
          <div className="space-y-4 md:space-y-6">
            {/* 基本情報 - デスクトップのみ表示 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hidden lg:block">
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
                      <div className="flex space-x-2 mt-1">
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

                  {cafe.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-500" />
                      <a href={`tel:${cafe.phone}`} className="text-gray-700 font-medium hover:text-green-600">
                        {cafe.phone}
                      </a>
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
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-800 mb-3 md:mb-4 flex items-center font-serif text-base md:text-lg">
                    <Clock className="w-4 md:w-5 h-4 md:h-5 mr-2 text-amber-500" />
                    営業時間
                  </h3>
                  <OpeningHoursDisplay hours={cafe.businessHours} />
                </CardContent>
              </Card>
            )}

            {/* 最近見たカフェ */}
            {recentlyViewedCafes.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-800 mb-3 md:mb-4 font-serif text-base md:text-lg">
                    最近見たカフェ
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {recentlyViewedCafes.map((recentCafe) => (
                      <Link key={recentCafe.id} href={`/cafe/${recentCafe.id}`}>
                        <div className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
                          <Image
                            src={recentCafe.image || "/images/noimage/1-1.jpg"}
                            alt={recentCafe.name}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = "/images/noimage/1-1.jpg"
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate font-serif text-sm">{recentCafe.name}</p>
                            <p className="text-xs text-gray-500 truncate">{recentCafe.city || recentCafe.location}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 関連カフェ */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-bold text-gray-800 mb-3 md:mb-4 font-serif text-base md:text-lg">
                  同じ地域のカフェ
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {relatedCafes.map((relatedCafe) => (
                    <Link key={relatedCafe.id} href={`/cafe/${relatedCafe.id}`}>
                      <div className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
                        <Image
                          src={relatedCafe.image || "/images/noimage/1-1.jpg"}
                          alt={relatedCafe.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = "/images/noimage/1-1.jpg"
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate font-serif text-sm">{relatedCafe.name}</p>
                          <p className="text-xs text-gray-500 truncate">{relatedCafe.city || prefecture}</p>
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

      <Footer />
    </div>
  )
}
