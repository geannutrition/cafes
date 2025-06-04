"use client"

import { Wifi, Zap, Volume2, Leaf, Sun, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const featureIconMap = {
  "Wi-Fi": { icon: <Wifi className="w-2.5 md:w-3 h-2.5 md:h-3" />, color: "bg-blue-100 text-blue-700" },
  電源: { icon: <Zap className="w-2.5 md:w-3 h-2.5 md:h-3" />, color: "bg-yellow-100 text-yellow-700" },
  静か: { icon: <Volume2 className="w-2.5 md:w-3 h-2.5 md:h-3" />, color: "bg-green-100 text-green-700" },
  和風: { icon: <Leaf className="w-2.5 md:w-3 h-2.5 md:h-3" />, color: "bg-emerald-100 text-emerald-700" },
  テラス: { icon: <Sun className="w-2.5 md:w-3 h-2.5 md:h-3" />, color: "bg-orange-100 text-orange-700" },
  コワーキング: { icon: <Users className="w-2.5 md:w-3 h-2.5 md:h-3" />, color: "bg-purple-100 text-purple-700" },
}

export default function FeatureIcons({ features }) {
  return (
    <div className="flex flex-wrap gap-1 md:gap-2">
      {features.map((feature) => {
        const featureConfig = featureIconMap[feature]
        if (!featureConfig) return null

        return (
          <Badge
            key={feature}
            variant="secondary"
            className={`${featureConfig.color} border-0 text-xs font-medium flex items-center space-x-1 py-0.5 px-1.5 md:px-2`}
          >
            {featureConfig.icon}
            <span className="text-xs">{feature}</span>
          </Badge>
        )
      })}
    </div>
  )
}
