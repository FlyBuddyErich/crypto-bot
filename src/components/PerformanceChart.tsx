"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import type { Bot } from "../types/dashboard";
import backroundLines from '../assets/backgroundLines.png'

interface PerformanceChartProps {
  bot: Bot;
  timeRange: "24h" | "7d" | "30d" | "all_time";
}

export default function PerformanceChart({
  bot,
  timeRange,
}: PerformanceChartProps) {
  const data = useMemo(() => {
    const points = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : 30;
    return Array.from({ length: points }, (_, i) => {
      const date = new Date();
      if (timeRange === "24h") {
        date.setHours(date.getHours() - (points - 1 - i));
      } else {
        date.setDate(date.getDate() - (points - 1 - i));
      }
      const baseValue = (bot[timeRange] * (i + 1)) / points;
      const randomFactor = Math.sin(i * 0.5) * (bot[timeRange] * 0.2);
      const value = baseValue + randomFactor;
      return { date, value };
    });
  }, [bot, timeRange]);

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
  };

  return (
<div style={{ position: "relative", width: "100%", height: "100%" }}>
  <img
    src={backroundLines}
    alt="background"
    style={{
      position: "absolute",
      top: -190,
      left: 0,
      width: "350%",
      height: "350%",
      zIndex: 0,
      opacity: 1,
    }}
  />
  <ResponsiveContainer width="100%" height="100%" style={{ position: "relative", zIndex: 1, }}>
    <AreaChart data={data} margin={{ top: 5, right: 0, left: -80, bottom: 0 }}>
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#236FC0" stopOpacity={0} />
          <stop offset="100%" stopColor="#1D2637" stopOpacity={0.8} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#475569", fontSize: 12 }}
        tickFormatter={formatDate}
        interval={timeRange === "24h" ? 3 : "preserveEnd"}
        minTickGap={30}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={false}
        domain={["auto", "auto"]}
      />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#236FC0"
        strokeWidth={2}
        fillOpacity={1}
        fill="url(#colorValue)"
        dot={false}
        activeDot={false}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>
  );
}
