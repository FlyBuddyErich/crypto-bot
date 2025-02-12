import type { TimeRange } from "../types/dashboard"

interface TimeRangeSelectorProps {
  timeRange: TimeRange
  onChange: (range: TimeRange) => void
}

export function TimeRangeSelector({ timeRange, onChange }: TimeRangeSelectorProps) {
  const ranges: { value: TimeRange; label: string }[] = [
    { value: "24h", label: "24h" },
    { value: "7d", label: "7 days" },
    { value: "30d", label: "30 days" },
    { value: "all_time", label: "All time" },
  ]

  return (
    <div className="flex gap-2 p-4 pl-6 pr-6 justify-between pt-0">
      <p className="text-gray-500 text-base font-medium mt-1 hidden xs:block">Time Range: </p>
      {ranges.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`xs:px-3 xs:py-2 rounded-full px-[8px] py-[6px] text-sm border border-gray-500 font-bold ${
            timeRange === value ? "border-white text-white" : "bg-gray-800 text-gray-400"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

