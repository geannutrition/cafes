"use client"

import { useState, useEffect } from "react"

const DAYS = {
  mon: "月曜日",
  tue: "火曜日",
  wed: "水曜日",
  thu: "木曜日",
  fri: "金曜日",
  sat: "土曜日",
  sun: "日曜日",
}

export default function OpeningHoursDisplay({ hours }) {
  const [today, setToday] = useState("")

  useEffect(() => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const today = days[new Date().getDay()]
    setToday(today)
  }, [])

  return (
    <div className="space-y-1 md:space-y-2">
      {Object.entries(hours).map(([day, time]) => (
        <div
          key={day}
          className={`flex justify-between py-1 md:py-2 px-2 md:px-3 rounded-md ${day === today ? "bg-amber-50 border-l-4 border-amber-500" : ""}`}
        >
          <span className={`text-xs md:text-sm ${day === today ? "font-medium text-amber-800" : "text-gray-700"}`}>
            {DAYS[day]}
            {day === today && (
              <span className="ml-1 md:ml-2 text-xs bg-amber-200 text-amber-800 px-1 md:px-2 py-0.5 rounded-full">
                本日
              </span>
            )}
          </span>
          <span className={`text-xs md:text-sm ${day === today ? "font-medium text-amber-800" : "text-gray-700"}`}>
            {time.open} - {time.close}
          </span>
        </div>
      ))}
    </div>
  )
}
