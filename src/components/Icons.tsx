import { FC } from "react";

export type IconName = "🍎" | "🌟" | "🎈" | "🎮" | "🎨" | "🎭" | "💎" | "🎪";

interface IconProps {
 name: IconName;
 style?: React.CSSProperties;
}

export const Icon: FC<IconProps> = ({ name, style }) => {
 return (
  <div
   className="flex items-center justify-center text-4xl w-full h-full rounded-sm shadow-lg transform transition-all hover:scale-105 hover:-scale cursor-pointer m-0 p-0"
   style={{
    ...style,
   }}
  >
   {name}
  </div>
 );
};

export const ICONS: IconName[] = [
 "🍎",
 "🌟",
 "🎈",
 "🎮",
 "🎨",
 "🎭",
 "💎",
 "🎪",
];
