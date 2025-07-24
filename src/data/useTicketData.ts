// hooks/useTicketData.ts
import { useEffect, useState } from "react";

export const useTicketData = (url: string) => {
  const [ticketData, setTicketData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setTicketData(json);
      } catch (err) {
        console.error("Error fetching ticket data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [url]);

  return { ticketData, loading };
};
