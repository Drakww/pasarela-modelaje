import React, { useEffect, useState } from "react";
import { SeatingMap } from "./SeatingMap";
import { SpecialCategories } from "./SpecialCategories";

export const SeatingMapContainer = () => {
  const [allData, setAllData] = useState<{ [showKey: string]: any }>({});
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [ticketMap, setTicketMap] = useState<any>({});
  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbwSSxxTRnpZp4lx20_6JCEkg9jVdG0FOcdcOS_uqsJQEyN6wKPn4o90OG2D_RZx-NZJ/exec")
      .then((res) => res.json())
      .then((data) => {
        const { seats, extras } = data;
        setAllData({ seats, extras });

        const firstKey = Object.keys(seats)[0];
        setSelectedShow(firstKey);
        setTicketMap(seats[firstKey]);
      });
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedShow(value);
    setTicketMap(allData.seats?.[value]);
  };


  return (

    <div className="flex flex-col items-center md:gap-4 bg-black">
      <label className="p-3 md:p-0 text-white font-semibold bebas text-2xl">
        Select Show (Day - Hour):
        <select
          value={selectedShow || ""}
          onChange={handleChange}
          className="ml-2 px-2 py-1 rounded bg-white md:bg-black text-black md:text-white border border-white bebas text-xl"
        >
          {Object.keys(allData.seats || {}).map((showKey) => (
            <option key={showKey} value={showKey}>
              {showKey}
            </option>
          ))}
        </select>
      </label>

      <div className="w-full flex bg-white md:flex-row flex-col">
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
