"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function GlobalNav() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white brutalist-border sticky top-0 z-50 mb-8 mx-4 mt-4 brutalist-shadow-lg">
      <div className="transform -rotate-2 hover:rotate-0 transition-transform h-16 w-64 relative bg-[#F9E5DA] p-1 brutalist-border brutalist-shadow-sm flex items-center justify-center">
        <a href="/" className="block w-full h-full flex items-center justify-center">
          <img src="/images/logo-wide.png" alt="The Byume Logo" className="object-contain w-full h-full drop-shadow-md" />
        </a>
      </div>
      <div className="flex items-center gap-6 font-serif font-bold text-lg">
        <a href="/gallery" className="hover:bg-[var(--color-secondary)] px-2 py-1 brutalist-border bg-white brutalist-shadow-sm transition-all hover:-translate-y-1">Gallery</a>
        <a href="/custom-order" className="hover:bg-[var(--color-tertiary)] px-2 py-1 brutalist-border bg-white brutalist-shadow-sm transition-all hover:-translate-y-1">Custom Order</a>
        <a href="/dashboard" className="hover:bg-[var(--color-primary)] px-2 py-1 brutalist-border bg-white brutalist-shadow-sm transition-all hover:-translate-y-1">Dashboard</a>
        
        <div className="h-8 w-1 bg-[#111] ml-2 transform rotate-12"></div>
        {mounted && !authLoading ? (
          user ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full brutalist-border bg-[var(--color-lavender)] text-[#111] flex items-center justify-center font-bold text-xl font-serif brutalist-shadow-sm">
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-lg hidden sm:block font-bold bg-[#111] text-white px-2 py-1">{user.email}</span>
              <button 
                onClick={() => { localStorage.removeItem('byume_token'); window.location.href = '/login'; }} 
                className="text-lg bg-red-400 text-white px-3 py-1 brutalist-border brutalist-shadow-sm hover:-translate-y-1 hover:bg-red-500 transition-all font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <a href="/login" className="text-lg bg-[var(--color-primary)] px-4 py-1 brutalist-border brutalist-shadow-sm hover:-translate-y-1 transition-all font-bold">Login</a>
          )
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse brutalist-border"></div>
        )}
      </div>
    </nav>
  );
}
