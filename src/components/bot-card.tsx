import type { Bot, TimeRange } from "../types/dashboard";

import greenBot from '../assets/layers/Bots/1/greenBot1.png';
import yellowBot from '../assets/layers/Bots/2/yellowBot1.png';
import redBot from '../assets/layers/Bots/3/redBot1.png';
import blueBot from '../assets/layers/Bots/4/blueBot1.png';
import placeBot from '../assets/layers/Bots/5/placeBot1.png';
import orangeBot from '../assets/layers/Bots/6/orangeBot1.png';

interface BotCardProps {
  bot: Bot;
  timeRange: TimeRange;
  isSelected: boolean;
  onSelect: () => void;
}

export function BotCard({ bot, timeRange, isSelected, onSelect }: BotCardProps) {
  const performance = bot[timeRange];
  const isPositive = performance > 0;

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-1 rounded-lg ${
        isSelected
          ? "bg-gradient-to-br from-blue-500/20 to-[#252D40]"
          : "bg-[#252D40]" 
      } cursor-pointer transition-all duration-200 hover:border-blue-500`}
      onClick={onSelect}
    >
      <BotIcon name={bot.name} />
      <div className="text-sm font-medium text-gray-200 uppercase ">{formatBotName(bot.name)}</div>
      <div className={`text-sm font-bold mb-2 mt-0 ${isPositive ? "text-[#77A659]" : "text-[#BE3A77]"}`}>
        {isPositive ? "+" : ""}
        {performance.toFixed(1)}%
      </div>
    </div>
  );
}

function BotIcon({ name }: { name: string }) {
  const botImages = {
    green_bot: greenBot,
    yellow_bot: yellowBot,
    red_bot: redBot,
    blue_bot: blueBot,
    place_bot: placeBot,
    orange_bot: orangeBot,
  };

  const botImage = botImages[name] || placeBot; // Если имя не найдено, то будет выведено placeBot (по умолчанию)

  return (
    <div className="xs:w-32 xs:h-20 w-24 h-14 flex items-center justify-center">
      <img
        src={botImage}
        alt={name}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function formatBotName(name: string): string {
  return name.split("_")[0].toUpperCase();
}