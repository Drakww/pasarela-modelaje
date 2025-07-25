import React, { useEffect, useState } from "react";
import { SeatingMap } from "./SeatingMap";
import { SpecialCategories } from "./SpecialCategories";

// Define el orden explícito de tus horas de función
const FIXED_HOUR_ORDER: { [key: string]: number } = {
  "11AM": 1,
  "1PM": 2,
  "3PM": 3,
  "5PM": 4,
  "7PM": 5,
  "9PM": 6,
};

export const SeatingMapContainer = () => {
  const [allData, setAllData] = useState<{ [showKey: string]: any }>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [ticketMap, setTicketMap] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbz9JGC2lRHR_vy8mOn74ticCqdb3DrRMfy9YIzdaTBmVehzivR8dW3ONfXo0F57GMU/exec")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Datos recibidos de la API:", data); // ¡Depuración clave!
        const { seats, extras } = data;
        setAllData({ seats, extras });
        const allShowKeys = Object.keys(seats);
        const uniqueDays = Array.from(new Set(allShowKeys.map(key => key.split(" - ")[0].trim())));
        const sortedDays = sortDays(uniqueDays);

        if (sortedDays.length > 0) {
          const firstDay = sortedDays[0];
          setSelectedDay(firstDay);

          // ¡NUEVO!: Selecciona la primera hora para el primer día si existe
          const hoursForFirstDay = getHoursForDay(firstDay, allShowKeys);
          if (hoursForFirstDay.length > 0) {
            const firstHour = sortHours(hoursForFirstDay)[0];
            setSelectedHour(firstHour);
            setTicketMap(seats[`${firstDay} - ${firstHour}`] || {});
            // console.log(`Mapa inicial cargado para: ${firstDay} - ${firstHour}`, seats[`${firstDay} - ${firstHour}`]); // Depuración
          } else {
            setTicketMap({});
            // console.warn(`No hay horas disponibles para el día inicial: ${firstDay}`);
          }
        } else {
          setError("No hay datos de espectáculos disponibles en el servidor.");
          setTicketMap({}); // Asegurar que el mapa esté vacío si no hay datos
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar los datos:", err);
        setError("Error al cargar los datos de los espectáculos. Por favor, intenta de nuevo más tarde.");
        setLoading(false);
      });
  }, []);

  // --- Funciones de Ayuda para Ordenamiento y Filtrado ---
  const getDayNumber = (dayStr: string) => parseInt(dayStr.replace(/\D/g, ''));
  const sortDays = (days: string[]) => days.sort((a, b) => getDayNumber(a) - getDayNumber(b));
  const sortHours = (hours: string[]) => {
    return hours.sort((a, b) => {
      const orderA = FIXED_HOUR_ORDER[a] !== undefined ? FIXED_HOUR_ORDER[a] : 999;
      const orderB = FIXED_HOUR_ORDER[b] !== undefined ? FIXED_HOUR_ORDER[b] : 999;
      return orderA - orderB;
    });
  };

  const getHoursForDay = (day: string, allKeys: string[]) => {
    return Array.from(new Set(allKeys
      .filter(key => key.startsWith(day + " - "))
      .map(key => key.split(" - ")[1].trim())));
  };

  // --- Manejadores de Cambio para los Selectores ---
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value;
    setSelectedDay(newDay);
    setSelectedHour(null);
    setTicketMap({});

    const allShowKeys = Object.keys(allData.seats || {});
    const hoursForNewDay = getHoursForDay(newDay, allShowKeys);


    if (hoursForNewDay.length > 0) {
      const firstHour = sortHours(hoursForNewDay)[0];
      setSelectedHour(firstHour);
      setTicketMap(allData.seats?.[`${newDay} - ${firstHour}`] || {});
      // console.log(`Mapa actualizado al cambiar día a: ${newDay} - ${firstHour}`, allData.seats?.[`${newDay} - ${firstHour}`]); // Depuración
    } else {
      console.warn(`No hay horas disponibles para el día seleccionado: ${newDay}`);
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = e.target.value;
    setSelectedHour(newHour);
    if (selectedDay && newHour) {
      setTicketMap(allData.seats?.[`${selectedDay} - ${newHour}`] || {});
      // console.log(`Mapa actualizado al cambiar hora a: ${selectedDay} - ${newHour}`, allData.seats?.[`${selectedDay} - ${newHour}`]); // Depuración
    }
  };

  const allShowKeys = Object.keys(allData.seats || {});
  const availableDays = sortDays(Array.from(new Set(allShowKeys.map(key => key.split(" - ")[0].trim()))));
  const availableHoursForSelectedDay = selectedDay
    ? sortHours(getHoursForDay(selectedDay, allShowKeys))
    : [];


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl flex flex-col items-center space-y-6 w-96 border border-white/20">
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-24 h-24 object-contain animate-bounce drop-shadow-lg"
          />
          <p className="text-white text-xl font-semibold text-center tracking-wide animate-pulse">
            Loading seat map...
          </p>
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-t-transparent border-white rounded-full animate-spin" />
            <div className="absolute inset-1 border-2 border-blue-500 border-l-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }



  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-red-100 rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-6 w-96 text-red-700 border border-red-400">
          <p className="text-xl font-semibold text-center">¡Error!</p>
          <p className="text-center">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300">Recargar</button>
        </div>
      </div>
    );
  }


  return (
    <div>
      <div className="py-4 flex flex-col md:flex-row items-center justify-center md:gap-4 bg-black">
        {/* Selector de Días */}
        <label className="md:p-0 text-white font-semibold bebas text-2xl mb-2 md:mb-0">
          Select Day:
          <select
            value={selectedDay || ""}
            onChange={handleDayChange}
            className="ml-2 px-2 py-1 rounded bg-white md:bg-black text-black md:text-white border border-white bebas text-xl"
          >
            <option value="" disabled>Seleccionar día</option>
            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        {/* Selector de Horas (Solo se muestra si se ha seleccionado un día) */}
        {selectedDay && (
          <label className="md:p-0 text-white font-semibold bebas text-2xl">
            Select Hour:
            <select
              value={selectedHour || ""}
              onChange={handleHourChange}
              className="ml-2 px-2 py-1 rounded bg-white md:bg-black text-black md:text-white border border-white bebas text-xl"
              disabled={availableHoursForSelectedDay.length === 0}
            >
              <option value="" disabled>Seleccionar hora</option>
              {availableHoursForSelectedDay.length > 0 ? (
                availableHoursForSelectedDay.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))
              ) : (
                <option value="" disabled>No hay horas disponibles</option>
              )}
            </select>
          </label>
        )}
      </div>

      <div className="w-full h-[90vh] flex bg-white md:flex-row flex-col">
        {/* Renderiza SeatingMap solo si hay un día y una hora seleccionados, y datos en ticketMap */}
        {selectedDay && selectedHour && Object.keys(ticketMap).length > 0 ? (
          <SeatingMap ticketMap={ticketMap} />
        ) : (
          <div className="flex flex-1 items-center justify-center text-black text-xl text-center p-4">
            {selectedDay && !selectedHour ? (
              <p>Por favor, selecciona una hora para ver el mapa de asientos.</p>
            ) : (
              <p>Selecciona un día y una hora para ver el mapa de asientos.</p>
            )}
          </div>
        )}

        <div className="md:absolute md:right-8 md:bottom-4 flex flex-row justify-center mb-8 ml-2">
          {selectedDay && selectedHour ? (
            <SpecialCategories extras={allData.extras?.[`${selectedDay} - ${selectedHour}`] || {}} />
          ) : null}
        </div>
      </div>
    </div>
  );
};