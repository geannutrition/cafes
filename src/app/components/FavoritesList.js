"use client"

import { X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function FavoritesList({ favorites, cafes, onRemove }) {
  const favoriteCafes = cafes.filter((cafe) => favorites.includes(cafe.id))

  if (favoriteCafes.length === 0) return null

  return (
    <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-rose-600">お気に入りリスト</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {favoriteCafes.map((cafe) => (
            <div key={cafe.id} className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm">
              <Link href={`/cafe/${cafe.id}`} className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={cafe.image || "/placeholder.svg"}
                    alt={cafe.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=48&width=48"
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{cafe.name}</p>
                  <p className="text-xs text-gray-500 truncate">{cafe.location}</p>
                </div>
              </Link>
              <button onClick={() => onRemove(cafe.id)} className="p-1 hover:bg-rose-100 rounded-full text-rose-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
