"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("byume_token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          localStorage.removeItem("byume_token");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("byume_token", token);
    setIsAuthenticated(true);
    window.location.href = "/dashboard";
  };

  const logout = () => {
    localStorage.removeItem("byume_token");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };

  return { isAuthenticated, user, loading, login, logout };
}
