"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';

export default function OrderInboxPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/orders/`, {
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

  return (
    <AdminShell>
      <div className="mb-10 relative">
        <div className="absolute -top-4 right-10 text-5xl transform rotate-12 opacity-80 z-0 text-[#111]"><iconify-icon icon="lucide:inbox"></iconify-icon></div>
        
        <div className="bg-[var(--color-primary-container)] p-8 brutalist-border brutalist-shadow-lg inline-block transform -rotate-1 relative z-10">
           <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
           <h1 className="text-5xl font-serif font-bold uppercase tracking-widest text-[#111] bg-white inline-block px-4 py-2 brutalist-border mt-2">Order Inbox</h1>
           <p className="mt-4 text-xl font-serif font-bold text-[#111] bg-white brutalist-border px-3 py-1 inline-block transform rotate-1">Review newly submitted custom order requests.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="h-64 bg-[var(--color-surface)] brutalist-border brutalist-shadow transform -rotate-1"></div>
          <div className="h-64 bg-[var(--color-surface)] brutalist-border brutalist-shadow transform rotate-2"></div>
          <div className="h-64 bg-[var(--color-surface)] brutalist-border brutalist-shadow transform -rotate-2"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center bg-white p-16 brutalist-border brutalist-shadow-xl max-w-2xl mx-auto transform rotate-1 relative">
          <div className="pushpin absolute -top-4 right-10"></div>
          <p className="text-7xl mb-6 text-[#111]"><iconify-icon icon="lucide:inbox"></iconify-icon></p>
          <h3 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] bg-[var(--color-tertiary-container)] inline-block px-4 py-2 brutalist-border mb-4">Inbox is empty</h3>
          <p className="mt-4 text-xl font-serif font-bold text-[#111]">No new orders found. Time for a coffee break! <iconify-icon icon="lucide:coffee"></iconify-icon></p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-10">
          {orders.map((order, index) => (
            <div key={order.id} className={`bg-white brutalist-border brutalist-shadow-lg p-8 relative flex flex-col justify-between ${index % 2 === 0 ? 'rotate-2' : '-rotate-1'} transition-transform hover:-translate-y-2 hover:brutalist-shadow-xl hover:z-20`}>
              
              <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
              
              <div>
                <div className="flex justify-between items-start mb-6 mt-4">
                  <span className="inline-block px-3 py-1 text-sm font-serif font-bold uppercase tracking-wider text-[#111] bg-orange-400 brutalist-border transform -rotate-2">
                    {order.status.name}
                  </span>
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#111] bg-[var(--color-surface-dim)] px-2 py-0.5 brutalist-border">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                
                <h3 className="text-3xl font-bold font-serif uppercase tracking-widest text-[#111] mb-4 border-b-[3px] border-[#111] pb-2">{order.order_number}</h3>
                
                <p className="text-xl font-serif font-bold text-[#111] mb-6 line-clamp-3 leading-tight">"{order.notes || "No additional notes provided."}"</p>
                
                <div className="space-y-3 mb-8 bg-[var(--color-surface)] p-4 brutalist-border transform rotate-1">
                  <div className="flex justify-between text-sm font-serif font-bold uppercase tracking-wider">
                    <span className="text-gray-500">Dimensions:</span>
                    <span className="text-[#111]">{order.dimensions || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold uppercase tracking-wider">
                    <span className="text-gray-500">Est. Budget:</span>
                    <span className="text-[#111]">{order.budget || 'Not specified'}</span>
                  </div>
                </div>
              </div>
              
              <a href={`/orders/${order.id}`} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#111] text-white font-serif font-bold uppercase tracking-wider text-xl hover:bg-[var(--color-primary)] transition-all brutalist-border brutalist-shadow transform -rotate-1 hover:-translate-y-1">
                Open Workspace <iconify-icon icon="lucide:folder-open"></iconify-icon>
              </a>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
