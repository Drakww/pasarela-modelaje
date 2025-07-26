import React from "react";

const categoryColors: Record<string, string> = {
  "Tickets Sales": "#ed3625ff",
  "Vip/Celebridades": "#e2d700ff",
  Sponsor: "#0c00efff",
  Influencers: "#009fd9ff",
  "Press Magazines": "#9d00ffff"
};

interface LegendProps {
  ticketMap: {
    [ticketType: string]: {
      [category: string]: number;
    };
  };
}

export const Legend: React.FC<LegendProps> = ({ ticketMap }) => {

  // Función para calcular los conteos de cada categoría,
  // ¡pero solo para los tipos de ticket que son "Row X Y"!
  const calculateRowCategoryCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {};

    // Inicializa los conteos para las categorías conocidas en 0
    Object.keys(categoryColors).forEach(cat => {
      counts[cat] = 0;
    });

    // Itera sobre cada tipo de boleto en el ticketMap
    for (const ticketType in ticketMap) {
      if (Object.prototype.hasOwnProperty.call(ticketMap, ticketType)) {
        // --- ¡CAMBIO CLAVE AQUÍ! ---
        // Solo procesa si el ticketType comienza con "Row"
        if (ticketType.startsWith("Row ")) {
          const categoriesInType = ticketMap[ticketType];

          // Itera sobre cada categoría dentro de este tipo de boleto de fila
          for (const category in categoriesInType) {
            if (Object.prototype.hasOwnProperty.call(categoriesInType, category)) {
              const count = categoriesInType[category];
              
              // Suma el conteo a la categoría global de filas
              counts[category] = (counts[category] || 0) + count;
            }
          }
        }
      }
    }
    return counts;
  };

  // Calcula los conteos de categorías de filas al renderizar
  const rowCategoryCounts = calculateRowCategoryCounts();

  return (
    <div className="flex flex-col gap-6 mt-4 border border-black p-4 rounded-xl">
      <h3 className="bebas text-2xl">Ticket Category Guide</h3>
      {Object.entries(categoryColors).map(([cat, color]) => (
        <div key={cat} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-semibold font-outfit text-black">
            {cat}
            {/* Muestra el conteo de la categoría para las filas. Si no hay tickets, muestra 0. */}
            <span className="ml-2 text-gray-500">({rowCategoryCounts[cat] || 0})</span>
          </span>
        </div>
      ))}
    </div>
  );
};