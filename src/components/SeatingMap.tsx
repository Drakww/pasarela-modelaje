import React from "react";
import { SeatRow } from "./SeatRow";
import { GeneralAdmissionBox } from "./GeneralAdmissionBox";
import { Legend } from "./Legend";
import '../App.css'


interface SeatingMapProps {
  ticketMap: {
    [ticketType: string]: {
      [category: string]: number;
    };
  };
}

export const SeatingMap: React.FC<SeatingMapProps> = ({ ticketMap }) => {
  return (
    <div className="md:w-full  md:h-full flex flex-col items-center justify-center  md:px-4 md:py-6">

      <div className="transform scale-78 sm:scale-95  md:scale-100 md:w-auto  flex  flex-row justify-center items-start gap-2 md:gap-4 -mt-5 -mb-20 sm:mt-0 md:mt-0 sm:mb-0 md:mb-0">
       
        {/* Left Rows (Vertical) */}
        <div className="flex flex-row items-start gap-2  px-2 rounded-xl">
          {[5, 4, 3, 2, 1].map((row) => (
            <div key={`left-${row}`} className="flex flex-col justify-end items-center w-8 md:w-12">
              <SeatRow fila={row} side="Left" ticketMap={ticketMap} />
              <span className="text-xs text-white mt-1">Row {row}</span>
            </div>
          ))}
        </div>

        {/* RUNWAY */}
        <div className=" md:w-30 w-15 bg-black h-140 text-white text-center px-3 py-12 rounded-xl  md:min-w-[80px] flex flex-col justify-center items-center shadow-lg px-2">
          <span className="w-100 transform rotate-90 font-bold text-3xl tracking-wide md:text-2xl bebas">RUNWAY 7 FASHION</span>
        </div>

        {/* Right Rows (Vertical) */}
        <div className="flex md:flex-row  items-start gap-2 bg-white  px-2  rounded-xl">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={`right-${row}`} className="flex flex-col justify-end items-center w-8 md:w-12">
              <SeatRow fila={row} side="Right" ticketMap={ticketMap} />
              <span className="text-xs text-white mt-1">Row {row}</span>
            </div>
          ))}
        </div>



      </div>

      {/* Legend */}
      <div className="md:absolute md:top-[50%] md:left-14">
        <Legend ticketMap={ticketMap}/>
      </div>

      {/* General Admission Box */}
      <div className="md:absolute md:left-14 md:top-[10%] ">
        <div className="mt-8 w-full max-w-4xl">
          <GeneralAdmissionBox ticketMap={ticketMap} />
        </div>
      </div>


    </div>
  );
};
