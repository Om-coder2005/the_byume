"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardShellProps {
  children: React.ReactNode;
  activePath: '/dashboard' | '/dashboard/inspiration' | '/dashboard/profile';
}

export default function DashboardShell({ children, activePath }: DashboardShellProps) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, authLoading]);

  if (authLoading || (!isAuthenticated)) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="mb-4 bg-[#F9E5DA] p-2 brutalist-border brutalist-shadow h-32 w-80">
            <img src="/images/logo-wide.png" alt="The Byume Logo" className="object-contain w-full h-full drop-shadow-md" />
          </div>
          <div className="text-[#111] font-serif font-bold text-2xl flex items-center gap-2">
            <iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon> Finding your notes...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] relative overflow-hidden font-sans text-[var(--color-foreground)]">
      {/* Background Decor */}
      <div className="absolute top-20 right-20 text-6xl transform rotate-12 opacity-50 z-0 pointer-events-none"><iconify-icon icon="lucide:gift"></iconify-icon></div>
      <div className="absolute bottom-20 left-10 text-6xl transform -rotate-12 opacity-50 z-0 pointer-events-none"><iconify-icon icon="lucide:scissors"></iconify-icon></div>

      {/* Navigation removed, now handled by GlobalNav in layout */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 relative z-10">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 z-10">
          <div className="bg-[var(--color-surface)] brutalist-border brutalist-shadow-lg p-6 relative">
             {/* Spiral Binding simulation */}
             <div className="spiral-binding absolute top-0 bottom-0 -left-3 w-6 flex flex-col justify-evenly"></div>
             
             <div className="pl-4">
              <div className="pushpin absolute -top-4 right-4"></div>
              <h2 className="font-serif font-bold text-2xl text-[#111] mb-6 brutalist-border-b-4 border-[#111] pb-2 border-b-[3px]">My Desk</h2>
              <nav className="space-y-4 font-serif text-lg font-bold">
                <a href="/dashboard" className={`flex items-center px-4 py-3 brutalist-border brutalist-shadow-sm transition-all hover:-translate-y-1 ${activePath === '/dashboard' ? 'bg-[var(--color-primary)]' : 'bg-white hover:bg-[var(--color-primary-container)]'}`}>
                  <iconify-icon icon="lucide:package" class="mr-3 text-2xl"></iconify-icon> My Orders
                </a>
                <a href="/dashboard/inspiration" className={`flex items-center px-4 py-3 brutalist-border brutalist-shadow-sm transition-all hover:-translate-y-1 ${activePath === '/dashboard/inspiration' ? 'bg-[var(--color-secondary)]' : 'bg-white hover:bg-[var(--color-secondary-container)]'}`}>
                  <iconify-icon icon="lucide:image" class="mr-3 text-2xl"></iconify-icon> Inspiration Board
                </a>
                <a href="/dashboard/profile" className={`flex items-center px-4 py-3 brutalist-border brutalist-shadow-sm transition-all hover:-translate-y-1 ${activePath === '/dashboard/profile' ? 'bg-[var(--color-tertiary)]' : 'bg-white hover:bg-[var(--color-tertiary-container)]'}`}>
                  <iconify-icon icon="lucide:user" class="mr-3 text-2xl"></iconify-icon> Profile & Settings
                </a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 w-full max-w-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
