import React, { useEffect, useState } from "react";
import { SeatingMap } from "./SeatingMap";
import { SpecialCategories } from "./SpecialCategories";


export const SeatingMapContainer = () => {
  const [allData, setAllData] = useState<{ [showKey: string]: any }>({});
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [ticketMap, setTicketMap] = useState<any>({});
  const [loading, setLoading] = useState(true); // 👈 nuevo estado
  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbwSSxxTRnpZp4lx20_6JCEkg9jVdG0FOcdcOS_uqsJQEyN6wKPn4o90OG2D_RZx-NZJ/exec")
      .then((res) => res.json())
      .then((data) => {
        const { seats, extras } = data;
        setAllData({ seats, extras });

        const firstKey = Object.keys(seats)[0];
        setSelectedShow(firstKey);
        setTicketMap(seats[firstKey]);
        setLoading(false); // ✅ datos cargados
      });
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedShow(value);
    setTicketMap(allData.seats?.[value]);
  };

  const sortShowKeys = (keys: string[]) => {
    return keys.sort((a, b) => {
      const [dayA, hourA] = a.split(" - ").map((str) => str.trim());
      const [dayB, hourB] = b.split(" - ").map((str) => str.trim());

      const getDayNumber = (dayStr: string) => parseInt(dayStr); // "11TH" => 11

      const convertTo24h = (timeStr: string) => {
        const match = timeStr.match(/(\d+)(AM|PM)/i);
        if (!match) return 0;
        let [_, hour, meridiem] = match;
        let hourNum = parseInt(hour);
        if (meridiem.toUpperCase() === "PM" && hourNum !== 12) hourNum += 12;
        if (meridiem.toUpperCase() === "AM" && hourNum === 12) hourNum = 0;
        return hourNum;
      };

      const dayNumA = getDayNumber(dayA);
      const dayNumB = getDayNumber(dayB);

      if (dayNumA !== dayNumB) return dayNumA - dayNumB;
      return convertTo24h(hourA) - convertTo24h(hourB);
    });
  };

  const sortedShowKeys = sortShowKeys(Object.keys(allData.seats || {}));
  // Espera mientras carga los datos
  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-6 w-80 animate-fade-in">
        {/* Logo / Imagen */}
        <img
          src="/nyfw-logo-black.png" // Cambia esto por tu imagen
          alt="Logo"
          className="w-24 h-24 object-contain animate-pulse"
        />

        {/* Texto */}
        <p className="text-black text-xl font-semibold text-center animate-fade-in-slow">
          Cargando mapa de asientos...
        </p>

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}



  return (
    <div>
      <div className="py-4 flex flex-col items-center md:gap-4 bg-black">
        <label className="md:p-0 text-white font-semibold bebas text-2xl">
          Select Show (Day - Hour):
          <select
            value={selectedShow || ""}
            onChange={handleChange}
            className="ml-2 px-2 py-1 rounded bg-white md:bg-black text-black md:text-white border border-white bebas text-xl"
          >
            {sortedShowKeys.map((showKey) => (
              <option key={showKey} value={showKey}>
                {showKey}
              </option>
            ))}
          </select>
        </label>

      </div>

      <div className="w-full h-[90vh] flex bg-white md:flex-row flex-col">
        <SeatingMap ticketMap={ticketMap} />
        <div className="md:absolute md:right-8 md:bottom-4 flex flex-row justify-center mb-8 ml-2">
          {selectedShow ? (
            <SpecialCategories extras={allData.extras?.[selectedShow] || {}} />
          ) : null}

        </div>
      </div>
    </div>
  );
};
