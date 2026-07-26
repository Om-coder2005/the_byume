"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch("http://localhost:8000/api/orders/", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const pending = orders.filter(o => o.status.name === "Submitted").length;
  const inProgress = orders.filter(o => o.status.name === "In Progress" || o.status.name === "Accepted").length;

  return (
    <AdminShell>
      <div className="mb-8 bg-[var(--color-primary-container)] brutalist-border p-6 inline-block brutalist-shadow transform -rotate-1">
        <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] bg-white inline-block px-4 py-2 brutalist-border">Today's Studio Overview</h1>
        <p className="mt-4 text-xl font-serif font-bold text-[#111]">What to focus on today.</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      ) : (
          <div className="space-y-12">
          {/* Quick Stats Masonry-ish Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="bg-white brutalist-border brutalist-shadow-lg p-8 relative group hover:-translate-y-1 hover:rotate-0 transition-all duration-300 transform -rotate-1">
              <div className="pushpin absolute -top-4 left-1/2"></div>
              <div className="absolute -top-4 -right-4 text-7xl opacity-10 transform group-hover:rotate-12 transition-transform"><iconify-icon icon="lucide:scissors"></iconify-icon></div>
              <h3 className="text-sm font-serif font-bold uppercase tracking-widest text-white bg-[var(--color-primary)] inline-block px-3 py-1 mb-4 brutalist-border">New Requests</h3>
              <p className="text-7xl font-serif font-bold text-[#111] mt-3">{pending}</p>
              <div className="mt-8">
                <a href="/orders" className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white brutalist-border text-lg font-serif font-bold uppercase tracking-wider hover:bg-[var(--color-primary)] transition-all transform rotate-1 brutalist-shadow-sm hover:-translate-y-1">
                  <span className="ml-2 font-serif">Review now &rarr;</span>
                </a>
              </div>
            </div>
            
            <div className="bg-[var(--color-tertiary-container)] brutalist-border brutalist-shadow-lg p-8 relative group hover:-translate-y-1 hover:rotate-0 transition-all duration-300 transform rotate-2">
              <div className="pushpin absolute -top-4 left-1/2"></div>
              <div className="absolute -top-4 -right-4 text-7xl opacity-10 transform group-hover:rotate-12 transition-transform"><iconify-icon icon="lucide:smile"></iconify-icon></div>
              <h3 className="text-sm font-serif font-bold uppercase tracking-widest text-[#111] bg-[var(--color-secondary)] inline-block px-3 py-1 mb-4 brutalist-border">In Production</h3>
              <p className="text-7xl font-serif font-bold text-[#111] mt-3">{inProgress}</p>
            </div>
          </div>

          {/* Production Queue */}
          <div className="bg-white brutalist-border brutalist-shadow-xl overflow-hidden relative">
            <div className="pushpin absolute -top-4 left-10"></div>
            <div className="px-8 py-6 bg-[var(--color-secondary)] border-b-[3px] border-[#111]">
              <h3 className="text-3xl font-serif font-bold uppercase tracking-widest text-[#111] flex items-center gap-4 bg-white inline-block px-4 py-2 brutalist-border">
                <iconify-icon icon="lucide:clipboard-list"></iconify-icon> Active Production Queue
              </h3>
            </div>
            <div className="p-8 text-center text-gray-500 bg-[var(--color-surface)]">
              {inProgress > 0 ? (
                <div className="space-y-6 text-left">
                  {orders.filter(o => o.status.name === "In Progress" || o.status.name === "Accepted").map(order => (
                    <div key={order.id} className="flex justify-between p-6 bg-white brutalist-border items-center brutalist-shadow-sm hover:brutalist-shadow transition-all group hover:-translate-y-1">
                       <div>
                         <p className="font-serif font-bold text-2xl uppercase tracking-wider text-[#111]">Order #{order.order_number}</p>
                         <p className="text-sm font-serif font-bold uppercase tracking-wider text-[var(--color-primary)] mt-2 bg-[var(--color-primary-container)] inline-block px-2 py-1 brutalist-border">{order.status.name}</p>
                       </div>
                       <a href={`/orders/${order.id}`} className="px-8 py-4 bg-[#111] text-white brutalist-border text-lg font-serif font-bold uppercase tracking-wider hover:bg-[var(--color-secondary)] transition-all transform rotate-1 brutalist-shadow-sm flex items-center gap-2">
                         <span><iconify-icon icon="lucide:scissors"></iconify-icon></span> Manage
                       </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 bg-white brutalist-border brutalist-shadow-sm p-8 max-w-lg mx-auto">
                   <span className="text-6xl block mb-6 transform -rotate-12 text-[#111]"><iconify-icon icon="lucide:sun"></iconify-icon></span>
                   <p className="text-[#111] font-serif font-bold text-2xl uppercase tracking-wider">No orders currently in production.</p>
                   <p className="text-lg font-serif font-bold text-[#111] mt-4 bg-[var(--color-surface-dim)] inline-block px-3 py-1 brutalist-border">Time to make some new creations!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
