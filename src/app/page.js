"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Coffee, Star, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import Header from "./components/Header"
import CafeCard from "./components/CafeCard"
import FilterSection from "./components/FilterSection"
import FavoritesList from "./components/FavoritesList"
import cafesData from "../data/cafes.json"

const allFeatures = ["Wi-Fi", "電源", "静か", "和風", "テラス", "コワーキング"]
const allLocations = ["大阪府", "京都府", "兵庫県", "奈良県", "滋賀県", "和歌山県"]

// PR期間中かどうかを判定する関数
const isPRActive = (cafe) => {
  if (!cafe.isPR || !cafe.prStartDate || !cafe.prEndDate) return false

  const now = new Date()
  const startDate = new Date(cafe.prStartDate)
  const endDate = new Date(cafe.prEndDate)

  return now >= startDate && now <= endDate
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [sortBy, setSortBy] = useState("none") // none, rating, newest

  // お気に入りをローカルストレージから読み込み
  useEffect(() => {
    const storedFavorites = localStorage.getItem("cafeFavorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

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
        selectedFeatures.length === 0 || selectedFeatures.every((feature) => cafe.features.includes(feature))
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(cafe.location)
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
        return b.rating - a.rating
      } else if (sortBy === "newest") {
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
      }

      return 0
    })

    return result
  }, [searchTerm, selectedFeatures, selectedLocations, favorites, showFavorites, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-amber-600 to-orange-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent animate-fade-in font-serif">
            関西カフェ検索
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-rose-100 animate-fade-in-delay font-medium">
            関西の素敵なカフェを見つけよう
          </p>
          <div className="max-w-2xl mx-auto relative animate-slide-up">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="カフェ名や地域で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm font-medium"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* フィルターサイドバー */}
          <div className="lg:col-span-1">
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 font-serif">
                カフェ一覧
                <span className="text-lg font-normal text-gray-500 ml-3 font-sans">({filteredCafes.length}件)</span>
              </h2>
              <div className="flex items-center space-x-2">
                {sortBy === "rating" && (
                  <div className="flex items-center text-amber-600">
                    <Star className="w-5 h-5 mr-1 fill-amber-500" />
                    <span className="text-sm font-medium">評価順</span>
                  </div>
                )}
                {sortBy === "newest" && (
                  <div className="flex items-center text-rose-600">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">新着順</span>
                  </div>
                )}
              </div>
            </div>

            {filteredCafes.length === 0 ? (
              <div className="text-center py-16">
                <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500 font-medium">条件に合うカフェが見つかりませんでした</p>
                <p className="text-gray-400 mt-2">検索条件を変更してみてください</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </div>
  )
}
