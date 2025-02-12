import type { Bot } from "../types/dashboard"
import { dashboardData } from "../lib/data"

export const selectedBot: Bot = dashboardData.bots[0] // Выбор первого бота по дефолту
export const timeRange: "24h" | "7d" | "30d" | "all_time" = "24h" // Также выбор 24ч по дефолту