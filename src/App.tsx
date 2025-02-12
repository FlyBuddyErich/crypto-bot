"use client";

import { useState } from "react";
import { BotCard } from "./components/bot-card";
import { BottomNav } from "./components/bottom-nav";
import { TimeRangeSelector } from "./components/time-range-selector";
import PerformanceChart from "./components/PerformanceChart";
import { useTimeRange } from "./hooks/useTimeRange";
import { dashboardData } from "./lib/data";
import { RefreshCw, Menu } from "lucide-react";
import type { Bot } from "./types/dashboard";

import moneySymbol from './assets/moneySymbol.png'

export default function Dashboard() {
  const { timeRange, setTimeRange } = useTimeRange();
  const [selectedBot, setSelectedBot] = useState<Bot>(dashboardData.bots[0]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleBotSelect = (bot: Bot) => {
    setSelectedBot(bot);
  };

  return (
    <div className="min-h-screen bg-[#1D2637] text-white font-sans pb-24">
      {/* Header */}
      <header className="relative flex items-end justify-between p-4 xs:pt-8 border-b border-none overflow-hidden">
        <button className="z-10">
          <Menu className="w-6 h-6 text-gray-500" />
        </button>
        <h1 className="relative text-2xl font-bold">
          <span className="relative z-10 text-gray-500">Dashboard</span>
          <div className="absolute -top-50 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-blue-500/20 blur-[80px] rounded-full" />
        </h1>
        <button className="z-10">
          <RefreshCw className="w-6 h-6 text-gray-500" />
        </button>
      </header>

      {/* Trading Capital */}
      <div className="xs:p-4 pb-1 p-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-gray-500 text-base font-medium">TRADING CAPITAL</div>
            <div className="text-3xl xs:text-5xl font-normal">
              {dashboardData.trading_capital.toFixed(5)}{" "}
              {dashboardData.trading_capital_currency.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col gap-1 xs:pt-6 pt-2">
            <div className="flex items-center gap-2 justify-between">
              <div className="text-gray-500 xs:text-base text-sm font-medium">
                BALANCE:
                </div>
              <div className="text-l font-bold inline-flex gap-1">
                {dashboardData.balance.toLocaleString()}
                <img src={moneySymbol} alt="money_icon" className="h-5 mt-[3px]" />
              </div>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="text-gray-500 xs:text-base text-sm font-medium">
                ON HOLD:
                </div>
              <div className="text-l font-bold inline-flex gap-1">
                {dashboardData.on_hold.toLocaleString()}
                <img src={moneySymbol} alt="money_icon" className="h-5 mt-[3px]"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* График */}
      <div className="relative xs:h-64 h-40 w-full overflow-hidden bg-[#1D2637] mt-8">
        <PerformanceChart bot={selectedBot} timeRange={timeRange} />
        <div
          className={`absolute bottom-32 left-1/2 -translate-x-1/2 text-2xl font-bold ${
            selectedBot[timeRange] >= 0 ? "text-[#77A659]" : "text-[#BE3A77] z-2"
          }`}
        >
          {selectedBot[timeRange] > 0 ? "+" : ""}
          {selectedBot[timeRange].toFixed(1)}%
        </div>
      </div>

      {/* Выбор бота */}
      <div className="grid grid-cols-3 gap-[2px] p-5 pt-0 xs:pt-1 mt-4">
        {dashboardData.bots.map((bot: Bot) => (
          <BotCard
            key={bot.name}
            bot={bot}
            timeRange={timeRange}
            isSelected={bot.name === selectedBot.name}
            onSelect={() => handleBotSelect(bot)}
          />
        ))}
      </div>

      {/* Временной диапазон */}
      <TimeRangeSelector timeRange={timeRange} onChange={setTimeRange} />

      {/* Footer (нижний nav) */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}