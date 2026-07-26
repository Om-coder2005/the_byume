"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Wishlist state
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProduct();
    checkWishlist();
  }, [id]);

  const checkWishlist = async () => {
    const token = localStorage.getItem('byume_customer_token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8000/api/wishlist/${id}/check`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.is_saved);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleWishlist = async () => {
    const token = localStorage.getItem('byume_customer_token');
    if (!token) {
      alert("Please login to save to your Inspiration Board.");
      window.location.href = "/login";
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8000/api/wishlist/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.status === 'added');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const fetchProduct = async () => {
    try {
      const [prodRes, recRes] = await Promise.all([
        fetch(`http://localhost:8000/api/gallery/${id}`),
        fetch(`http://localhost:8000/api/gallery/${id}/recommendations`)
      ]);
      
      if (prodRes.ok) setProduct(await prodRes.json());
      if (recRes.ok) setRecommendations(await recRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-cork relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-12 flex justify-center items-center min-h-[60vh]">
         <div className="text-4xl font-note text-gray-500 animate-pulse bg-white p-8 border border-gray-300 shadow-md transform rotate-2">
            Loading memories... <iconify-icon icon="lucide:hourglass"></iconify-icon>
         </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-cork relative overflow-hidden text-center py-20">
      <div className="bg-[#FFF9F0] p-12 shadow-lg border border-[#E3D9CC] inline-block transform -rotate-2 relative">
         <div className="pushpin absolute -top-4 left-1/2"></div>
         <h1 className="text-4xl font-serif font-bold text-gray-900">Creation Not Found</h1>
         <p className="mt-4 font-note text-2xl text-gray-600">Looks like this memory blew away!</p>
         <a href="/gallery" className="text-[var(--color-primary)] font-bold mt-8 inline-block hover:underline font-note text-2xl">&larr; Back to Gallery</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cork relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-20 text-6xl transform rotate-12 opacity-80 z-0"><iconify-icon icon="lucide:gift"></iconify-icon></div>
      <div className="absolute bottom-20 left-10 text-6xl transform -rotate-12 opacity-80 z-0"><iconify-icon icon="lucide:scissors"></iconify-icon></div>



      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <a href="/gallery" className="font-note text-2xl text-gray-700 bg-white px-4 py-2 border border-[#DCD1C4] shadow-sm transform -rotate-2 hover:bg-gray-50 inline-flex items-center transition-colors mb-12">
          &larr; <span className="ml-2">Back to Gallery</span>
          <div className="paperclip absolute -top-4 -left-2 transform -rotate-45"></div>
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
          {/* Left: Polaroid Image Showcase */}
          <div className="relative group">
            <div className="washi-tape-green absolute -top-6 left-1/2 -translate-x-1/2 z-20 transform -rotate-2"></div>
            
            <div className="bg-white p-6 pb-20 shadow-[5px_5px_15px_rgba(0,0,0,0.15)] border border-[#E3D9CC] transform rotate-2 transition-transform duration-500 group-hover:rotate-0 relative">
              <div className="relative bg-[var(--color-surface-dim)] flex items-center justify-center p-12 aspect-[4/3] border border-gray-200 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
                
                <div className="relative z-10 text-center">
                   <span className="text-6xl filter drop-shadow-md"><iconify-icon icon="lucide:scissors"></iconify-icon></span>
                   <h2 className="mt-4 font-note text-3xl text-gray-500">Visual Reference</h2>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 text-center">
                 <p className="font-note text-3xl text-gray-700 handwriting-marker">{product.title}</p>
              </div>
            </div>

            {/* Badges pinned to the polaroid */}
            <div className="absolute -left-6 top-10 transform -rotate-12 z-30">
               <div className="pushpin absolute -top-4 right-2"></div>
               <div className="bg-[#FFF9F0] border border-[#E3D9CC] px-4 py-2 shadow-sm font-note text-xl text-gray-800">
                 {product.difficulty} Craft
               </div>
            </div>
          </div>

          {/* Right: Details & CTA (Notepad style) */}
          <div className="bg-[#FFF9F0] p-10 md:p-14 shadow-lg border-2 border-dashed border-[#DCD1C4] relative transform -rotate-1">
            <div className="paperclip absolute -top-5 right-10"></div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight border-b-4 border-double border-[#E3D9CC] pb-4">
              {product.title}
            </h1>
            
            <p className="text-2xl text-gray-700 mb-10 leading-relaxed font-note whitespace-pre-line">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12 bg-white p-6 border border-[#E3D9CC] shadow-sm transform rotate-1">
              <div className="pushpin absolute top-2 right-4"></div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-500 mb-1">Price Estimate</h3>
                <p className="text-3xl font-note text-gray-900 font-bold">₹{product.price_from} <span className="text-xl text-gray-500">to</span> ₹{product.price_to}</p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-500 mb-1">Production Time</h3>
                <p className="text-3xl font-note text-gray-900 font-bold">{product.estimated_days} <span className="text-xl text-gray-500">days</span></p>
              </div>
            </div>

            <div className="space-y-6">
              <a 
                href={`/custom-order?ref=${product.slug}`} 
                className="block w-full stitched-border bg-[var(--color-primary)] text-white text-center px-8 py-4 font-serif font-bold text-2xl hover:bg-white hover:text-[var(--color-primary)] transition-colors transform -rotate-1"
              >
                Customize This Creation <iconify-icon icon="lucide:scissors"></iconify-icon>
              </a>
              <button 
                onClick={toggleWishlist}
                disabled={saving}
                className={`block w-full stitched-border text-center px-8 py-4 font-serif font-bold text-xl transition-colors transform rotate-1 ${
                  isSaved 
                    ? 'bg-pink-100 text-pink-700 border-pink-300' 
                    : 'bg-white border-[#DCD1C4] text-gray-700 hover:bg-[#FFF9F0]'
                }`}
              >
                {saving ? 'Pinning...' : (isSaved ? '<iconify-icon icon="lucide:pin"></iconify-icon> Saved to Board' : '<iconify-icon icon="lucide:map-pin"></iconify-icon> Pin to Inspiration Board')}
              </button>
            </div>

          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-32 mb-12 relative">
            <div className="washi-tape absolute -top-8 left-1/2 -translate-x-1/2 transform rotate-2 z-20"></div>
            <div className="bg-white p-12 border-2 border-dashed border-[#DCD1C4] shadow-md transform rotate-1">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12 text-center transform -rotate-2">More Inspiration <iconify-icon icon="lucide:flower"></iconify-icon></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {recommendations.map((rec, index) => (
                  <a 
                    key={`${rec.id}-${index}`}
                    href={`/gallery/${rec.id}`}
                    className={`group block bg-[#FFF9F0] p-4 pb-16 shadow-[3px_3px_10px_rgba(0,0,0,0.1)] border border-[#E3D9CC] transition-transform duration-300 hover:scale-105 hover:z-10 relative ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
                  >
                    {/* Small piece of tape */}
                    <div className="washi-tape-green opacity-70 w-16 h-6 absolute -top-3 left-1/2 -translate-x-1/2 z-20"></div>
                    
                    <div className="relative bg-white aspect-[4/3] flex items-center justify-center overflow-hidden border border-gray-200">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] transition-transform duration-700 group-hover:scale-110"></div>
                      <span className="relative z-10 text-4xl group-hover:scale-125 transition-transform duration-300">
                        <iconify-icon icon="lucide:sparkles"></iconify-icon>
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                      <h3 className="text-2xl font-note font-bold text-gray-800 truncate handwriting-marker">{rec.title}</h3>
                      <p className="text-lg font-note text-gray-600 mt-1">₹{rec.price_from} - ₹{rec.price_to}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
