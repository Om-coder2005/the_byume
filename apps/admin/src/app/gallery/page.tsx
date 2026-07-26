"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';

export default function GalleryManagerPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/gallery/`);
      if (res.ok) {
        const data = await res.json();
        setGalleries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setGalleries(galleries.filter(g => g.id !== id));
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminShell>
      <div className="mb-10 relative">
        <div className="absolute -top-4 right-10 text-5xl transform rotate-12 opacity-80 z-0 text-[#111]"><iconify-icon icon="lucide:camera"></iconify-icon></div>
        
        <div className="bg-[var(--color-secondary)] p-8 brutalist-border brutalist-shadow-lg inline-block transform -rotate-1 relative">
           <div className="pushpin absolute -top-4 -left-2"></div>
           <h1 className="text-5xl font-serif font-bold uppercase tracking-widest text-[#111] bg-white inline-block px-4 py-2 brutalist-border mb-4">Gallery Manager</h1>
           <p className="mt-2 text-xl font-serif font-bold text-[#111] bg-white brutalist-border px-3 py-1 inline-block">Upload and manage your portfolio creations.</p>
        </div>
        
        <div className="mt-8">
          <a
            href="/gallery/new"
            className="inline-flex items-center gap-2 bg-[#111] px-8 py-4 text-center text-xl font-bold font-serif uppercase tracking-wider text-white brutalist-border hover:bg-[var(--color-primary)] transform rotate-1 transition-all hover:-translate-y-1 brutalist-shadow"
          >
            + Pin New Creation <iconify-icon icon="lucide:map-pin"></iconify-icon>
          </a>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse flex gap-6 flex-wrap">
          <div className="w-64 h-80 bg-[var(--color-surface)] brutalist-border brutalist-shadow transform -rotate-2"></div>
          <div className="w-64 h-80 bg-[var(--color-surface)] brutalist-border brutalist-shadow transform rotate-2"></div>
          <div className="w-64 h-80 bg-[var(--color-surface)] brutalist-border brutalist-shadow transform -rotate-1"></div>
        </div>
      ) : galleries.length === 0 ? (
        <div className="text-center bg-white p-16 brutalist-border brutalist-shadow-xl max-w-2xl transform rotate-1 relative mx-auto">
          <div className="pushpin absolute -top-4 right-10"></div>
          <p className="text-7xl mb-6 text-[#111]"><iconify-icon icon="lucide:image"></iconify-icon></p>
          <h3 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] bg-[var(--color-tertiary-container)] inline-block px-4 py-2 brutalist-border mb-4">Your gallery is empty</h3>
          <p className="mt-4 text-xl font-serif font-bold text-[#111]">Start filling your board by pinning a new creation.</p>
          <div className="mt-10">
            <a href="/gallery/new" className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-8 py-4 text-xl font-bold font-serif uppercase tracking-wider text-white brutalist-shadow-sm brutalist-border hover:bg-[#111] transform -rotate-2 hover:-translate-y-1 transition-all">
              Add New Creation <iconify-icon icon="lucide:sparkles"></iconify-icon>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
          {galleries.map((gallery, index) => (
            <div key={gallery.id} className={`group block bg-white p-4 pb-16 brutalist-border brutalist-shadow-lg relative ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} transition-transform hover:-translate-y-2 hover:brutalist-shadow-xl hover:z-20`}>
              
              {/* Tape */}
              <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2 z-20"></div>
              
              <div className="relative bg-[var(--color-surface)] aspect-square flex items-center justify-center overflow-hidden brutalist-border mb-4">
                <span className="text-5xl opacity-50"><iconify-icon icon="lucide:scissors"></iconify-icon></span>
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-2xl font-serif font-bold uppercase tracking-wider text-[#111] truncate">{gallery.title}</h3>
                   {gallery.featured && (
                      <span className="text-xs bg-yellow-400 text-[#111] px-2 py-1 font-serif font-bold uppercase tracking-wider transform rotate-6 brutalist-border">Featured</span>
                   )}
                </div>
                <div className="flex justify-between items-end">
                   <div className="text-lg font-serif font-bold text-[#111]">
                      ₹{gallery.price_from} - ₹{gallery.price_to}
                   </div>
                   <button onClick={() => handleDelete(gallery.id)} className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 brutalist-border font-bold font-serif uppercase tracking-wider text-sm transform rotate-[-5deg] transition-all">
                     Delete
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
