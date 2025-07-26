import React from "react";

const specialCategories = [
  { name: "BRONZE", label: "BRONZE PACKAGE:", color: "#835320ff" },
  { name: "SILVER", label: "SILVER PACKAGE:", color: "#c8c8c8ff" },
  { name: "GOLD", label: "GOLD PACKAGE:", color: "#ffcc00ff" },
  { name: "PLATINUM", label: "PLATINUM PACKAGE:", color: "#7b7b7bff" },
];

interface SpecialCategoriesProps {
  extras: { [category: string]: number };
}
const groupSizeMap: { [key: string]: number } = {
  BRONZE: 2,
  SILVER: 4,
  GOLD: 4,
  PLATINUM: 2,
};

export const SpecialCategories: React.FC<SpecialCategoriesProps> = ({ extras }) => {
  return (
    <div className=" flex flex-col gap-2 p-4 bg-white border border-black rounded-lg shadow-md w-62 h-fit mr-2 mt-6">
      <h2 className="text-center font-bold text-black mb-2 bebas text-2xl">
        VIP EXPERIENCE
      </h2>
      {specialCategories.map((cat) => (
        <div key={cat.name} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: cat.color }}
            ></div>
            <span className="text-xs font-semibold text-black font-outfit">
              {cat.label}
              <span className="ml-2 text-gray-500">{extras[cat.name]
              ? ` ( ${Math.round((extras[cat.name] || 0) / groupSizeMap[cat.name])} )`
              : "(0)"}</span>
            </span>
          </div>

          <span className="text-xs font-bold text-gray-900">
            
          </span>
        </div>
      ))}
    </div>
  );
};