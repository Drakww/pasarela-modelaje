import React from "react";

const categoryColors: Record<string, string> = {
  Tickets: "#3498db",
  PR: "#e67e22",
  Operations: "#2ecc71",
};

interface GeneralAdmissionBoxProps {
  ticketMap: {
    [ticketType: string]: {
      [category: string]: number;
    };
  };
}

export const GeneralAdmissionBox: React.FC<GeneralAdmissionBoxProps> = ({
  ticketMap,
}) => {
  const generalData = ticketMap["General Admission"] || {};
  const total = Object.values(generalData).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-lg p-4 w-62 text-sm  border border-black">
      <div className="text-center font-semibold text-black mb-2 bebas md:text-2xl text-2xl">
        General Admission
      </div>
      <div className="text-center text-xl font-bold text-black mb-2 bebas">
        Total: {total}
      </div>
      <div className="flex flex-col gap-1">
        {Object.entries(generalData).map(([cat, count]) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[cat] }}
            />
            <span className="text-black font-medium">
              {cat}: {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
