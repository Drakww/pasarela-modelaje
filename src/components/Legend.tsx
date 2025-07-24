import React from "react";

const categoryColors: Record<string, string> = {
  "Tickets Sales": "#ed3625ff",
  "Vip/Celebridades": "#e2d700ff",
  Sponsor: "#0c00efff",
  Influencers: "#009fd9ff",
  "Press Magazines": "#9d00ffff"
};

export const Legend: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      {Object.entries(categoryColors).map(([cat, color]) => (
        <div key={cat} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-semibold font-outfit text-black">{cat}</span>
        </div>
      ))}
    </div>
  );
};
