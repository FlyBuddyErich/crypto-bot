"use client"
import { cn } from "../lib/utils"
import type React from "react"
import footerButton from '../assets/footerButton1.png'
import footerButton2 from '../assets/footerButton2.png'
import footerButton3 from '../assets/footerButton3.png'
import footerButton4 from '../assets/footerButton4.png'
import footerButton5 from '../assets/footerButton5.png'

interface NavItem {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
  badge?: number
}

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: NavItem[] = [
    {
      icon: <img src={footerButton} alt="menu" className="w-9 h-9" />,
      label: "Dashboard",
      isActive: activeTab === "dashboard",
      onClick: () => onTabChange("dashboard"),
    },
    {
      icon: <img src={footerButton2} alt="menu2" className="w-9 h-9" />,
      label: "Megabot",
      isActive: activeTab === "megabot",
      onClick: () => onTabChange("megabot"),
    },
    {
      icon: <img src={footerButton3} alt="menu3" className="w-9 h-9" />,
      label: "Bot market",
      isActive: activeTab === "market",
      onClick: () => onTabChange("market"),
    },
    {
      icon: <img src={footerButton4} alt="menu4" className="w-9 h-9" />,
      label: "Coin prices",
      isActive: activeTab === "prices",
      onClick: () => onTabChange("prices"),
    },
    {
      icon: <img src={footerButton5} alt="menu5" className="w-9 h-9" />,
      label: "Profile",
      isActive: activeTab === "profile",
      onClick: () => onTabChange("profile"),
      badge: 3,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around p-1 bg-[#232B3E] backdrop-blur">
      {navItems.map((item) => (
        <button key={item.label} onClick={item.onClick} className="relative flex flex-col items-center">
          {/* Кружок с уведомлением */}
          {item.badge && (
            <span className="absolute -top-3 -right-2.5 bg-[#E19925] text-white text-sm font-semibold w-6 h-6 rounded-full flex items-center justify-center z-2">
              {item.badge}
            </span>
          )}
          {/* Иконка */}
          <span
            className={cn(
              "text-gray-500 transition-all duration-200",
              item.isActive && "filter brightness-0 invert" // фильтр для смены цвета иконки (в данном случае как картинка)
            )}
          >
            {item.icon}
          </span>
          {/* Текст */}
          <span className={cn("text-sm mt-1 text-gray-500 transition-colors", item.isActive && "text-white")}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  )
}