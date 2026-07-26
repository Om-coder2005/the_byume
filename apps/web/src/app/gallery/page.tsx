"use client";

import React, { useState } from 'react';
import { useGallery } from '@/hooks/useGallery';

export default function GalleryPage() {
  const { items: galleries, categories, loading } = useGallery();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const filteredGalleries = galleries.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? g.category_id === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center">
      <main className="flex-1 px-8 py-12 max-w-6xl">
        <header className="mb-12 relative">
          <div className="washi-tape absolute -top-4 -left-4 z-10 transform -rotate-6"></div>
          <div className="bg-white p-8 brutalist-border brutalist-shadow transform rotate-1 relative">
             <div className="flex justify-between items-center mb-6">
               <h1 className="text-5xl font-serif text-[#111] font-bold uppercase tracking-wider bg-[var(--color-secondary)] px-4 py-2 brutalist-border inline-block">The Gallery</h1>
               <a href="/" className="text-[#111] hover:text-white hover:bg-[#111] px-2 py-1 transition-all font-serif font-bold uppercase brutalist-border brutalist-shadow-sm flex items-center gap-2"><iconify-icon icon="lucide:arrow-left"></iconify-icon> Back Home</a>
             </div>
             
             {/* Custom category buttons */}
             <div className="flex flex-wrap gap-4">
               <button 
                 onClick={() => setActiveCategory(null)}
                 className={`font-serif px-6 py-2 brutalist-border transition-all brutalist-shadow-sm uppercase font-bold tracking-wide hover:-translate-y-1 ${activeCategory === null ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[#111] hover:bg-[var(--color-surface-dim)]'}`}
               >
                 All Pieces
               </button>
               {categories.map(cat => (
                 <button 
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`font-serif px-6 py-2 brutalist-border transition-all brutalist-shadow-sm uppercase font-bold tracking-wide hover:-translate-y-1 ${activeCategory === cat.id ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[#111] hover:bg-[var(--color-surface-dim)]'}`}
                 >
                   {cat.name}
                 </button>
               ))}
             </div>
          </div>
        </header>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-pulse">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-gray-200 aspect-[3/4] border border-gray-300"></div>
            ))}
          </div>
        ) : filteredGalleries.length === 0 ? (
          <div className="text-center py-20 bg-[var(--color-surface-dim)] brutalist-border brutalist-shadow transform -rotate-1 relative">
            <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
            <p className="text-6xl mb-6 text-[#111]"><iconify-icon icon="lucide:scissors"></iconify-icon></p>
            <h3 className="text-3xl font-serif font-bold text-[#111] uppercase tracking-wide mb-4">Nothing here yet!</h3>
            <button onClick={() => {setSearchQuery(''); setActiveCategory(null);}} className="font-serif font-bold uppercase text-[var(--color-primary)] bg-white px-4 py-2 brutalist-border brutalist-shadow-sm hover:bg-[var(--color-primary)] hover:text-white transition-all hover:-translate-y-1">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredGalleries.map((item, i) => (
              <a 
                href={`/gallery/${item.id}`} 
                key={item.id} 
                className={`group block relative ${i % 2 === 0 ? 'transform rotate-1 hover:rotate-2' : 'transform -rotate-2 hover:-rotate-1'} transition-transform`}
              >
                {/* Washi tape varies */}
                {i % 3 === 0 ? <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 z-20"></div> : 
                 i % 3 === 1 ? <div className="washi-tape-green absolute -top-4 left-4 z-20 transform -rotate-12"></div> :
                 <div className="pushpin absolute -top-4 right-8 z-20"></div>}
                
                <div className="bg-white p-4 pb-16 brutalist-border brutalist-shadow relative z-10 group-hover:brutalist-shadow-lg transition-all group-hover:-translate-y-2">
                  
                  <div className="aspect-[4/5] bg-[var(--color-surface-dim)] flex items-center justify-center overflow-hidden brutalist-border">
                    {/* Placeholder image representation since we don't have real media fetched in this mock context easily */}
                    <img src={`https://images.unsplash.com/photo-1606907568153-9b9776d338a0?q=80&w=400&auto=format&fit=crop&sig=${item.id}`} alt={item.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                  </div>
                  
                  <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-end">
                     <h3 className="font-serif font-bold uppercase tracking-wider text-xl text-[#111] group-hover:bg-[#111] group-hover:text-white transition-colors px-2 py-1 line-clamp-1">{item.title}</h3>
                     <div className="bg-[var(--color-primary-container)] px-3 py-1 font-serif font-bold text-sm text-[#111] brutalist-border brutalist-shadow-sm transform -rotate-3 group-hover:rotate-0 transition-transform">
                        ₹{item.price_from}
                     </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
