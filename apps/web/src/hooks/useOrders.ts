"use client";

import { useState, useEffect } from "react";

export function useOrders(token: string | null) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return { orders, loading, error };
}
