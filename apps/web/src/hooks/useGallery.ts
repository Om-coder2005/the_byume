"use client";

import { useState, useEffect } from "react";

export function useGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, catRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/gallery/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/gallery/categories`)
        ]);

        if (galleryRes.ok && catRes.ok) {
          const galleryData = await galleryRes.json();
          const catData = await catRes.json();
          setItems(galleryData);
          setCategories(catData);
        } else {
          setError("Failed to fetch gallery data");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { items, categories, loading, error };
}
