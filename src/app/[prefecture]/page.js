"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams } from "next/navigation"
import { Search, Coffee, Star, TrendingUp, Filter, X, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CafeCard from "../components/CafeCard"
import FilterSection from "../components/FilterSection"
import FavoritesList from "../components/FavoritesList"

// 都道府県情報
const prefectureInfo = {
  osaka: {
    name: "大阪府",
    description: "活気あふれる大都市のカフェ文化を楽しもう",
    color: "from-blue-500 to-purple-500",
  },
  kyoto: {
    name: "京都府",
    description: "伝統と現代が融合する古都のカフェを探索",
    color: "from-green-500 to-teal-500",
  },
  hyogo: {
    name: "兵庫県",
    description: "港町神戸のおしゃれなカフェシーンを発見",
    color: "from-rose-500 to-pink-500",
  },
  nara: {
    name: "奈良県",
    description: "古都の静寂に包まれた癒しのカフェ体験",
    color: "from-amber-500 to-orange-500",
  },
  shiga: {
    name: "滋賀県",
    description: "琵琶湖畔の美しい景色とともにカフェタイム",
    color: "from-cyan-500 to-blue-500",
  },
  wakayama: {
    name: "和歌山県",
    description: "温泉と自然に囲まれたカフェでリラックス",
    color: "from-emerald-500 to-green-500",
  },
}

// 動的にカフェデータを読み込む関数
const loadCafeData = async (prefecture) => {
  try {
    const data = await import(`../../data/cafes-${prefecture}.json`)
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

export default function PrefecturePage() {
  const params = useParams()
  const prefecture = params.prefecture

  const [cafesData, setCafesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [sortBy, setSortBy] = useState("none")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const currentPrefecture = prefectureInfo[prefecture]

  // カフェデータの読み込み
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const data = await loadCafeData(prefecture)
      setCafesData(data)
      setLoading(false)
    }

    if (prefecture && prefectureInfo[prefecture]) {
      loadData()
    }
  }, [prefecture])

  // お気に入りをローカルストレージから読み込み
  useEffect(() => {
    const storedFavorites = localStorage.getItem("cafeFavorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // 特徴と地域の一覧を生成
  const allFeatures = useMemo(() => {
    const features = new Set()
    cafesData.forEach((cafe) => {
      cafe.features?.forEach((feature) => features.add(feature))
    })
    return Array.from(features)
  }, [cafesData])

  const allLocations = useMemo(() => {
    const locations = new Set()
    cafesData.forEach((cafe) => {
      if (cafe.city) locations.add(cafe.city)
    })
    return Array.from(locations)
  }, [cafesData])

  // お気に入りの更新
  const toggleFavorite = (cafeId) => {
    const newFavorites = favorites.includes(cafeId) ? favorites.filter((id) => id !== cafeId) : [...favorites, cafeId]

    setFavorites(newFavorites)
    localStorage.setItem("cafeFavorites", JSON.stringify(newFavorites))
  }

  const filteredCafes = useMemo(() => {
    let result = cafesData.filter((cafe) => {
      // PR期間中のカフェは検索条件に関係なく表示
      if (isPRActive(cafe)) return true

      const matchesSearch =
        cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cafe.address.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFeatures =
        selectedFeatures.length === 0 || selectedFeatures.every((feature) => cafe.features?.includes(feature))
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(cafe.city)
      const matchesFavorites = showFavorites ? favorites.includes(cafe.id) : true

      return matchesSearch && matchesFeatures && matchesLocation && matchesFavorites
    })

    // ソート処理
    result = [...result].sort((a, b) => {
      // PR期間中のカフェを最優先
      const aIsPR = isPRActive(a)
      const bIsPR = isPRActive(b)

      if (aIsPR && !bIsPR) return -1
      if (!aIsPR && bIsPR) return 1

      // PR期間中のカフェ同士、または通常のカフェ同士の場合
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0)
      } else if (sortBy === "newest") {
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
      }

      return 0
    })

    return result
  }, [searchTerm, selectedFeatures, selectedLocations, favorites, showFavorites, sortBy, cafesData])

  if (!currentPrefecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center flex-grow">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-serif">ページが見つかりません</h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium">ホームに戻る</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      {/* ヒーローセクション */}
      <section className={`relative overflow-hidden bg-gradient-to-r ${currentPrefecture.color} text-white`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-8 md:py-12">
          <Link href="/">
            <Button variant="ghost" className="mb-3 md:mb-4 text-white hover:bg-white/20 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              エリア選択に戻る
            </Button>
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 font-serif">{currentPrefecture.name}のカフェ</h1>
          <p className="text-lg md:text-xl mb-4 md:mb-6 text-white/90">{currentPrefecture.description}</p>
          <div className="max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="カフェ名や地域で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 md:py-4 text-base md:text-lg rounded-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm font-medium text-gray-700 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 md:h-8 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-4 md:py-8 flex-grow">
        {/* モバイル用フィルターボタン */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            variant="outline"
            className="w-full justify-between border-rose-200 text-rose-700 hover:bg-rose-50"
          >
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              絞り込み
              {(selectedFeatures.length > 0 || selectedLocations.length > 0 || showFavorites) && (
                <span className="ml-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                  {selectedFeatures.length + selectedLocations.length + (showFavorites ? 1 : 0)}
                </span>
              )}
            </div>
            {showMobileFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* フィルターサイドバー */}
          <div className={`lg:col-span-1 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <FilterSection
              allFeatures={allFeatures}
              allLocations={allLocations}
              selectedFeatures={selectedFeatures}
              selectedLocations={selectedLocations}
              onFeaturesChange={setSelectedFeatures}
              onLocationsChange={setSelectedLocations}
              showFavorites={showFavorites}
              onToggleFavorites={() => setShowFavorites(!showFavorites)}
              favoriteCount={favorites.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* お気に入りリスト */}
            {showFavorites && favorites.length > 0 && (
              <FavoritesList favorites={favorites} cafes={cafesData} onRemove={toggleFavorite} />
            )}
          </div>

          {/* カフェ一覧 */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif">
                カフェ一覧
                <span className="text-sm md:text-lg font-normal text-gray-500 ml-2 md:ml-3 font-sans">
                  ({filteredCafes.length}件)
                </span>
              </h2>
              <div className="flex items-center space-x-2">
                {sortBy === "rating" && (
                  <div className="flex items-center text-amber-600">
                    <Star className="w-4 md:w-5 h-4 md:h-5 mr-1 fill-amber-500" />
                    <span className="text-xs md:text-sm font-medium">評価順</span>
                  </div>
                )}
                {sortBy === "newest" && (
                  <div className="flex items-center text-rose-600">
                    <TrendingUp className="w-4 md:w-5 h-4 md:h-5 mr-1" />
                    <span className="text-xs md:text-sm font-medium">新着順</span>
                  </div>
                )}
              </div>
            </div>

            {filteredCafes.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <Coffee className="w-12 md:w-16 h-12 md:h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-gray-500 font-medium">条件に合うカフェが見つかりませんでした</p>
                <p className="text-gray-400 mt-2">検索条件を変更してみてください</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
                {filteredCafes.map((cafe, index) => (
                  <CafeCard
                    key={cafe.id}
                    cafe={cafe}
                    index={index}
                    isFavorite={favorites.includes(cafe.id)}
                    onToggleFavorite={() => toggleFavorite(cafe.id)}
                    isPRActive={isPRActive(cafe)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
