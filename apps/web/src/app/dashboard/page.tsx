"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import DashboardShell from '@/components/DashboardShell';

export default function CustomerDashboard() {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const token = typeof window !== 'undefined' ? localStorage.getItem("byume_token") : null;
  const { orders, loading: ordersLoading } = useOrders(token);

  const loading = authLoading || ordersLoading;

  const getStatusColor = (statusName: string) => {
    const colors: any = {
      'Draft': 'bg-gray-100 text-gray-800 border-gray-300',
      'Submitted': 'bg-blue-50 text-blue-800 border-blue-300',
      'Accepted': 'bg-green-50 text-green-800 border-green-300',
      'Crafting': 'bg-orange-50 text-orange-800 border-orange-300',
      'Shipped': 'bg-indigo-50 text-indigo-800 border-indigo-300',
      'Completed': 'bg-emerald-50 text-emerald-800 border-emerald-300'
    };
    return colors[statusName] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, authLoading]);



  return (
    <DashboardShell activePath="/dashboard">
      <header className="mb-12 relative bg-[var(--color-primary)] p-8 brutalist-border brutalist-shadow transform rotate-1 inline-block">
        <div className="pushpin absolute -top-4 left-1/4 -translate-x-1/2 z-10"></div>
        <h1 className="text-4xl font-serif text-white uppercase tracking-widest font-bold mb-2">My Studio Space</h1>
        <p className="font-serif font-bold text-xl text-[#111] bg-white px-4 py-2 brutalist-border inline-block transform -rotate-1 mt-2">Track your custom orders and manage your inspiration.</p>
      </header>

      {/* Quick Stats - Polaroids */}
      <div className="flex flex-wrap gap-8 mb-16">
        <div className="bg-white p-4 pb-12 brutalist-border brutalist-shadow-lg w-64 transform -rotate-2 relative hover:-translate-y-2 transition-transform hover:brutalist-shadow-xl">
           <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
           <div className="aspect-[4/3] bg-[var(--color-surface-dim)] brutalist-border flex items-center justify-center mb-4 overflow-hidden relative">
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')] pointer-events-none"></div>
             <p className="text-6xl font-serif text-[var(--color-primary)] font-bold">{orders.filter(o => o.status.name !== 'Completed').length}</p>
           </div>
           <h3 className="font-serif font-bold uppercase tracking-wider text-xl text-center text-[#111]">Active Orders</h3>
        </div>
        <div className="bg-[var(--color-tertiary-container)] p-4 pb-12 brutalist-border brutalist-shadow-lg w-64 transform rotate-3 relative hover:-translate-y-2 transition-transform hover:brutalist-shadow-xl">
           <div className="pushpin absolute -top-4 right-6"></div>
           <div className="aspect-[4/3] bg-white brutalist-border flex items-center justify-center mb-4 overflow-hidden relative">
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')] pointer-events-none"></div>
             <p className="text-6xl font-serif text-[#111] font-bold">{orders.filter(o => o.status.name === 'Completed').length}</p>
           </div>
           <h3 className="font-serif font-bold uppercase tracking-wider text-xl text-center text-[#111]">Completed</h3>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-1 border-l-[4px] border-[#111] -z-10"></div>
        
        <h2 className="text-4xl font-serif text-[#111] font-bold uppercase tracking-widest mb-10 pl-6 relative">
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--color-primary)] rounded-full border-4 border-[#111] brutalist-shadow-sm"></span>
          Order History
        </h2>
        
        {loading ? (
          <div className="animate-pulse space-y-8 pl-16">
            <div className="h-40 bg-[var(--color-surface-dim)] p-6 brutalist-border brutalist-shadow transform rotate-1 relative">
               <div className="pushpin absolute -top-3 right-4 transform rotate-6"></div>
            </div>
            <div className="h-40 bg-[var(--color-surface-dim)] p-6 brutalist-border brutalist-shadow transform -rotate-1 relative"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="ml-16 bg-[var(--color-surface)] p-12 brutalist-border transform rotate-1 brutalist-shadow-lg relative inline-block">
            <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
            <h3 className="text-3xl font-serif font-bold text-[#111] uppercase tracking-wider mb-4 mt-2">No active orders found.</h3>
            <p className="font-serif font-bold text-xl text-[#111] mb-8">Ready to bring an idea to life?</p>
            <a href="/custom-order" className="bg-[var(--color-primary)] text-white px-8 py-3 font-serif font-bold uppercase tracking-wider hover:bg-[#111] hover:-translate-y-1 transition-all brutalist-border brutalist-shadow-sm inline-block">
              Start Custom Order
            </a>
          </div>
        ) : (
          <div className="space-y-12 pl-16">
            {orders.map((order, i) => (
              <div key={order.id} className={`bg-white p-6 brutalist-border brutalist-shadow-lg relative ${i % 2 === 0 ? 'transform rotate-1 hover:rotate-0 hover:-translate-y-1' : 'transform -rotate-1 hover:rotate-0 hover:-translate-y-1'} transition-all max-w-3xl`}>
                <div className="absolute -left-16 top-6 w-8 h-8 bg-white border-4 border-[#111] rounded-full z-10 brutalist-shadow flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#111] rounded-full"></div>
                </div>
                
                <div className="pushpin absolute -top-3 right-4 transform rotate-6"></div>

                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="flex-1 mt-4 md:mt-0">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-serif font-bold text-[#111] uppercase tracking-wider">{order.order_number}</h3>
                      <span className={`px-4 py-1 font-serif font-bold uppercase tracking-wider text-sm brutalist-border transform -rotate-2 ${getStatusColor(order.status.name).replace('border-', '')}`}>
                        {order.status.name}
                      </span>
                    </div>
                    
                    <div className="bg-[#FFF9F0] p-4 brutalist-border font-serif font-bold text-lg text-[#111] mb-4 inline-block transform rotate-1 brutalist-shadow-sm">
                      <span className="text-gray-500 mr-2 text-sm font-sans uppercase tracking-widest">Notes:</span> 
                      {order.notes?.split('\n')[0] || "No notes"}
                    </div>
                    
                    <p className="font-sans text-sm text-[#111] font-bold tracking-wider uppercase block">
                      Submitted: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-4">
                    <div className="text-right">
                       <p className="font-serif font-bold uppercase tracking-wider text-sm text-gray-500">Est. Delivery</p>
                       <p className="font-serif font-bold text-2xl text-[#111]">{order.deadline ? new Date(order.deadline).toLocaleDateString() : 'TBD'}</p>
                    </div>
                    <a 
                      href={`/dashboard/orders/${order.id}`}
                      className="bg-white border-[3px] border-[#111] font-serif font-bold uppercase tracking-wider text-[#111] px-6 py-2 hover:bg-[#111] hover:text-white transition-all mt-2 brutalist-shadow-sm hover:brutalist-shadow hover:-translate-y-1"
                    >
                      View Details &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
