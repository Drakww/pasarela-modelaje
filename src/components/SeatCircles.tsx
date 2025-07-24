import React from "react";

interface SeatCirclesProps {
  filledMap: {
    [category: string]: number;
  };
  total: number;
  categoryColors: {
    [category: string]: string;
  };
}

export const SeatCircles: React.FC<SeatCirclesProps> = ({
  filledMap,
  total,
  categoryColors,
}) => {
  const filledSeats: string[] = [];

  Object.entries(filledMap).forEach(([category, count]) => {
    for (let i = 0; i < count; i++) {
      filledSeats.push(category);
    }
  });

  const circles = Array.from({ length: total }, (_, i) => {
    const category = filledSeats[i];
    const color = category ? categoryColors[category] : "#ccc";
    return (
      <div
        key={i}
        className="w-3 h-3 rounded-full m-0.5"
        style={{ backgroundColor: color }}
      />
    );
  });

  return (
    <div className="flex flex-col flex-wrap justify-center px-1 py-1">
      {circles}
    </div>
  );
};
