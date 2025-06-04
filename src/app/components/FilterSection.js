"use client"

import { Filter, X, Heart, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function FilterSection({
  allFeatures,
  allLocations,
  selectedFeatures,
  selectedLocations,
  onFeaturesChange,
  onLocationsChange,
  showFavorites,
  onToggleFavorites,
  favoriteCount,
  sortBy,
  onSortChange,
}) {
  const handleFeatureToggle = (feature) => {
    if (selectedFeatures.includes(feature)) {
      onFeaturesChange(selectedFeatures.filter((f) => f !== feature))
    } else {
      onFeaturesChange([...selectedFeatures, feature])
    }
  }

  const handleLocationToggle = (location) => {
    if (selectedLocations.includes(location)) {
      onLocationsChange(selectedLocations.filter((l) => l !== location))
    } else {
      onLocationsChange([...selectedLocations, location])
    }
  }

  const clearAllFilters = () => {
    onFeaturesChange([])
    onLocationsChange([])
    if (showFavorites) onToggleFavorites()
    if (sortBy !== "none") onSortChange("none")
  }

  const hasActiveFilters =
    selectedFeatures.length > 0 || selectedLocations.length > 0 || showFavorites || sortBy !== "none"

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3 md:pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-serif">
              <Filter className="w-4 md:w-5 h-4 md:h-5 text-rose-500" />
              <span>絞り込み</span>
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-rose-500 text-xs md:text-sm"
              >
                <X className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                <span className="font-medium">クリア</span>
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
          {/* お気に入り表示切替 */}
          <div>
            <Button
              variant={showFavorites ? "default" : "outline"}
              onClick={onToggleFavorites}
              className={`w-full font-medium text-sm md:text-base py-2 md:py-2 ${showFavorites ? "bg-rose-500 hover:bg-rose-600" : "border-rose-200 text-rose-700 hover:bg-rose-50"}`}
            >
              <Heart className={`w-3 md:w-4 h-3 md:h-4 mr-2 ${showFavorites ? "fill-white" : ""}`} />
              お気に入り{favoriteCount > 0 ? ` (${favoriteCount})` : ""}
            </Button>
          </div>

          {/* ソート機能 */}
          <div>
            <h4 className="font-serif font-semibold text-gray-800 mb-2 md:mb-3 text-sm md:text-base">並び替え</h4>
            <div className="space-y-2">
              <Button
                variant={sortBy === "rating" ? "default" : "outline"}
                onClick={() => onSortChange(sortBy === "rating" ? "none" : "rating")}
                className={`w-full font-medium text-sm md:text-base py-2 md:py-2 ${sortBy === "rating" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-200 text-amber-700 hover:bg-amber-50"}`}
              >
                <Star className={`w-3 md:w-4 h-3 md:h-4 mr-2 ${sortBy === "rating" ? "fill-white" : ""}`} />
                評価順
              </Button>

              <Button
                variant={sortBy === "newest" ? "default" : "outline"}
                onClick={() => onSortChange(sortBy === "newest" ? "none" : "newest")}
                className={`w-full font-medium text-sm md:text-base py-2 md:py-2 ${sortBy === "newest" ? "bg-rose-500 hover:bg-rose-600" : "border-rose-200 text-rose-700 hover:bg-rose-50"}`}
              >
                <TrendingUp className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                新着順
              </Button>
            </div>
          </div>

          {/* 特徴フィルター */}
          <div>
            <h4 className="font-serif font-semibold text-gray-800 mb-2 md:mb-3 text-sm md:text-base">特徴</h4>
            <div className="space-y-1 md:space-y-2">
              {allFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => handleFeatureToggle(feature)}
                    className="data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                  />
                  <label
                    htmlFor={`feature-${feature}`}
                    className="text-xs md:text-sm font-medium text-gray-700 cursor-pointer hover:text-rose-600 transition-colors"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 地域フィルター */}
          <div>
            <h4 className="font-serif font-semibold text-gray-800 mb-2 md:mb-3 text-sm md:text-base">地域</h4>
            <div className="space-y-1 md:space-y-2">
              {allLocations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => handleLocationToggle(location)}
                    className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <label
                    htmlFor={`location-${location}`}
                    className="text-xs md:text-sm font-medium text-gray-700 cursor-pointer hover:text-amber-600 transition-colors"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* アクティブフィルター表示 */}
      {hasActiveFilters && (
        <Card className="bg-gradient-to-r from-rose-50 to-amber-50 border-0">
          <CardContent className="p-3 md:p-4">
            <h4 className="font-serif font-semibold text-gray-800 mb-2 text-xs md:text-sm">選択中の条件</h4>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {selectedFeatures.map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer font-medium text-xs"
                  onClick={() => handleFeatureToggle(feature)}
                >
                  {feature}
                  <X className="w-2 md:w-3 h-2 md:h-3 ml-1" />
                </Badge>
              ))}
              {selectedLocations.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="bg-amber-100 text-amber-700 hover:bg-amber-200 cursor-pointer font-medium text-xs"
                  onClick={() => handleLocationToggle(location)}
                >
                  {location}
                  <X className="w-2 md:w-3 h-2 md:h-3 ml-1" />
                </Badge>
              ))}
              {showFavorites && (
                <Badge
                  variant="secondary"
                  className="bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer font-medium text-xs"
                  onClick={onToggleFavorites}
                >
                  お気に入りのみ
                  <X className="w-2 md:w-3 h-2 md:h-3 ml-1" />
                </Badge>
              )}
              {sortBy === "rating" && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700 hover:bg-amber-200 cursor-pointer font-medium text-xs"
                  onClick={() => onSortChange("none")}
                >
                  評価順
                  <X className="w-2 md:w-3 h-2 md:h-3 ml-1" />
                </Badge>
              )}
              {sortBy === "newest" && (
                <Badge
                  variant="secondary"
                  className="bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer font-medium text-xs"
                  onClick={() => onSortChange("none")}
                >
                  新着順
                  <X className="w-2 md:w-3 h-2 md:h-3 ml-1" />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
