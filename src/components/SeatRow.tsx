import React from "react";
import { SeatCircles } from "./SeatCircles";

const seatsPerFila: Record<number, number> = {
  1: 30,
  2: 30,
  3: 25,
  4: 20,
  5: 15,
};

const filaHeights: Record<number, string> = {
  1: "h-140",
  2: "h-140",
  3: "h-120",
  4: "h-100",
  5: "h-80",
};

const categoryColors: Record<string, string> = {
  "Tickets Sales": "#ed3625ff",
  "Vip/Celebridades": "#e2d700ff",
  Sponsor: "#0c00efff",
  Influencers: "#009fd9ff",
  "Press Magazines": "#9d00ffff"
};

interface SeatRowProps {
  fila: number;
  side: "Left" | "Right";
  ticketMap: {
    [ticketType: string]: {
      [category: string]: number;
    };
  };
}

export const SeatRow: React.FC<SeatRowProps> = ({
  fila,
  side,
  ticketMap,
}) => {
  const key = `Row ${fila} ${side}`;
  const categories = ticketMap[key] || {};
  const totalSeats = seatsPerFila[fila];
  const totalOccupied = Object.values(categories).reduce((a, b) => a + b, 0);

  return (
    <div
      className={`flex flex-col items-center w-9 md:w-12  ${filaHeights[fila]} bg-gray-800 rounded-md shadow-md overflow-hidden`}
    >
      <span className="text-white text-[9px] md:text-xs font-bold mt-1 ">
        {side} {fila}
      </span>
      <SeatCircles
        filledMap={categories}
        total={totalSeats}
        categoryColors={categoryColors}
      />
      <span className=" bg-black text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full mb-1 text-center">
        {totalOccupied}/{totalSeats}
      </span>
    </div>
  );
};
