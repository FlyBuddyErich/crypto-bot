"use client"

import { useState, useEffect } from "react"
import type { TimeRange } from "../types/dashboard"

export function useTimeRange() {
  const [timeRange, setTimeRange] = useState<TimeRange>(() => {
    const saved = localStorage.getItem("timeRange")
    return (saved as TimeRange) || "24h"
  })

  useEffect(() => {
    localStorage.setItem("timeRange", timeRange)
  }, [timeRange])

  return { timeRange, setTimeRange }
}

