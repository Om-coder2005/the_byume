"use client";

import React, { useEffect, useState } from 'react';

import SpiralSidebar from '@/components/SpiralSidebar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('byume_admin_token');
    if (!token) {
      window.location.href = "/login";
    } else {
      setIsAuth(true);
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('byume_admin_token');
    window.location.href = "/login";
  };

  if (loading) return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-background)] items-center justify-center">
      <div className="bg-white p-8 brutalist-border brutalist-shadow-lg transform rotate-2">
         <div className="pushpin"></div>
         <p className="font-serif font-bold text-xl text-[#111] flex items-center gap-2">
            <iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon> Loading Admin Studio...
         </p>
      </div>
    </div>
  );

  const sidebarItems = [
    { name: "Dashboard", href: "/", icon: <iconify-icon icon="lucide:bar-chart-2"></iconify-icon>, active: window.location.pathname === '/' },
    { name: "Order Inbox", href: "/orders", icon: <iconify-icon icon="lucide:inbox"></iconify-icon>, active: window.location.pathname.startsWith('/orders') },
    { name: "Gallery Manager", href: "/gallery", icon: <iconify-icon icon="lucide:image"></iconify-icon>, active: window.location.pathname.startsWith('/gallery') },
    { name: "Review Moderation", href: "/reviews", icon: <iconify-icon icon="lucide:star"></iconify-icon>, active: window.location.pathname.startsWith('/reviews') }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-background)]">
      <SpiralSidebar 
        title="Admin Studio"
        items={sidebarItems}
        bottomWidget={
          <div className="mt-auto">
            <button 
              onClick={handleLogout} 
              className="w-full bg-red-400 text-white py-3 brutalist-border font-serif text-xl font-bold brutalist-shadow-sm hover:bg-red-500 hover:-translate-y-1 transition-all relative"
            >
               Log Out
            </button>
          </div>
        }
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
