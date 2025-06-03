"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, Heart, ExternalLink, Star, Megaphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import FeatureIcons from "./FeatureIcons"

export default function CafeCard({ cafe, index, isFavorite, onToggleFavorite, isPRActive }) {
  const [imageError, setImageError] = useState(false)

  // 星評価を表示する関数
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-amber-500 text-amber-500" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-amber-500" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-amber-200" />)
    }

    return stars
  }

  return (
    <Card
      className={`group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up ${
        isPRActive ? "ring-2 ring-blue-500 ring-opacity-50" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={imageError ? "/placeholder.svg?height=200&width=400" : cafe.image}
          alt={cafe.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* お気に入りボタン */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 ${isFavorite ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-white/90 hover:bg-white text-gray-600 hover:text-rose-500"} rounded-full shadow-lg`}
          onClick={(e) => {
            e.preventDefault()
            onToggleFavorite()
          }}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
        </Button>

        {/* PRバッジ */}
        {isPRActive && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 animate-pulse">
            <Megaphone className="w-3 h-3 mr-1" />
            PR
          </Badge>
        )}

        {/* 地域バッジ */}
        <Badge
          className={`absolute ${isPRActive ? "top-12" : "top-3"} left-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white border-0`}
        >
          {cafe.location}
        </Badge>

        {/* 新着バッジ */}
        {cafe.isNew && (
          <Badge className={`absolute bottom-3 left-3 bg-rose-600 text-white border-0 animate-pulse`}>NEW</Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors duration-300 font-serif">
              {cafe.name}
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <div className="flex">{renderStars(cafe.rating)}</div>
              <span className="text-amber-700 font-medium">{cafe.rating}</span>
            </div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{cafe.description}</p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="line-clamp-1">{cafe.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{cafe.hours}</span>
            </div>
          </div>

          <FeatureIcons features={cafe.features} />

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link href={`/cafe/${cafe.id}`}>
              <Button
                className={`${
                  isPRActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    : "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                } text-white border-0 rounded-full px-6 font-medium`}
              >
                詳細を見る
              </Button>
            </Link>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 hover:border-rose-300 hover:bg-rose-50"
              onClick={() => window.open(cafe.tabelog_url, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
