"use client";

import React, { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';

export default function InspirationBoardPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const token = localStorage.getItem('byume_token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/wishlist/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id: number, gallery_id: number) => {
    const token = localStorage.getItem('byume_token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/wishlist/${gallery_id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardShell activePath="/dashboard/inspiration">
      {/* Corkboard area */}
      <div className="w-full h-full min-h-[80vh] bg-[#D7C4A5] p-8 border-[12px] border-[#8C6B4A] shadow-inner relative overflow-hidden" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cork-board.png')" }}>
        
        <div className="bg-white p-4 w-64 transform -rotate-2 mb-10 shadow-md">
          <div className="pushpin"></div>
          <h1 className="text-3xl font-serif text-[var(--color-foreground)] font-bold text-center">My Inspiration</h1>
        </div>

        {loading ? (
           <div className="animate-pulse flex space-x-4">
             <div className="bg-white p-4 pb-12 shadow-[0_10px_20px_rgba(0,0,0,0.15)] border border-[#E3D9CC] h-64 w-64 transform rotate-2 relative">
               <div className="pushpin absolute -top-3 left-1/2"></div>
               <div className="w-full h-full bg-gray-200/50"></div>
             </div>
           </div>
        ) : items.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--color-tertiary-container)] shadow-lg p-8 rotate-3 border border-yellow-200 text-center flex flex-col justify-center items-center">
             <div className="pushpin"></div>
             <p className="font-note text-3xl mb-4 text-gray-800">So empty...</p>
             <p className="font-sans text-sm text-gray-600 mb-6">Pin some ideas from the gallery to start your board!</p>
             <a href="/gallery" className="stitched-border border-[var(--color-primary)] font-serif font-bold text-[var(--color-primary)] px-4 py-2 hover:bg-white transition-colors">
               Go to Gallery
             </a>
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-start items-start relative min-h-[50vh]">
            {items.map((item, i) => (
              <div key={item.id} className={`group relative bg-white p-4 pb-16 shadow-[0_10px_20px_rgba(0,0,0,0.15)] border border-[#E3D9CC] w-64 transition-transform ${i % 2 === 0 ? 'transform rotate-3 hover:rotate-6 z-10 hover:z-50' : 'transform -rotate-2 hover:-rotate-4 z-20 hover:z-50'}`}>
                <div className="pushpin"></div>
                
                <button 
                  onClick={(e) => { e.preventDefault(); removeWishlist(item.id, item.gallery_item.id); }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 rounded-full text-red-500 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 font-bold"
                  title="Remove"
                >
                  ×
                </button>
                
                <div className="relative aspect-square bg-[var(--color-surface-dim)] overflow-hidden border border-gray-100 mb-3">
                  <img src={`https://images.unsplash.com/photo-1606907568153-9b9776d338a0?q=80&w=400&auto=format&fit=crop&sig=${item.gallery_item.id}`} alt={item.gallery_item.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                  <h3 className="font-note text-xl text-gray-800">{item.gallery_item.title}</h3>
                </div>
                
                <div className="absolute top-1/2 -right-16 transform translate-x-full opacity-0 group-hover:opacity-100 transition-all z-40 bg-[var(--color-tertiary-container)] p-3 border border-yellow-200 shadow-md rotate-6 w-32 text-center pointer-events-none">
                   <div className="paperclip absolute -top-4 right-4"></div>
                   <p className="font-note text-sm">₹{item.gallery_item.price_from} - ₹{item.gallery_item.price_to}</p>
                   <p className="font-sans text-xs mt-1">Make Custom &rarr;</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
