"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from '../../components/AdminShell';

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/reviews/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id: number, currentState: boolean) => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/reviews/${id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_featured: !currentState })
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert("Failed to update feature status");
    }
  };

  const togglePublic = async (id: number, currentState: boolean) => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/reviews/${id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_public: !currentState })
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert("Failed to update public status");
    }
  };

  const getRandomRotation = (index: number) => {
    const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3'];
    return rotations[index % rotations.length];
  };

  const getRandomColor = (index: number) => {
    const colors = ['bg-yellow-100', 'bg-blue-100', 'bg-pink-100', 'bg-green-100', 'bg-purple-100'];
    return colors[index % colors.length];
  };

  return (
    <AdminShell>
      <div className="mb-10 relative">
        <div className="absolute -top-6 right-8 text-6xl transform rotate-12 opacity-80 z-0"><iconify-icon icon="lucide:file-text"></iconify-icon></div>
        
        <div className="bg-[#FFF9F0] p-6 shadow-sm border border-[#E3D9CC] inline-block transform -rotate-1 relative z-10">
           <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 transform -rotate-2"></div>
           <h1 className="text-4xl font-bold text-gray-900 font-serif border-b-2 border-dashed border-[#DCD1C4] pb-2">Review Moderation</h1>
           <p className="mt-2 text-xl font-note text-gray-700">Curate the love letters from your customers.</p>
        </div>
      </div>

      <div className="bg-cork p-8 rounded-md shadow-inner border border-[#DCD1C4] min-h-[500px]">
        
        {loading ? (
          <div className="text-3xl font-note text-white transform -rotate-2 inline-block bg-black/50 p-4">Fetching notes... <iconify-icon icon="lucide:hourglass"></iconify-icon></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {reviews.map((review, i) => (
              <div key={review.id} className={`${getRandomColor(i)} rounded-none shadow-[5px_5px_15px_rgba(0,0,0,0.15)] p-6 flex flex-col transform ${getRandomRotation(i)} transition-transform hover:scale-110 hover:z-20 relative border border-gray-200`}>
                
                <div className="pushpin absolute -top-3 left-1/2 -translate-x-1/2"></div>
                
                {review.is_featured && (
                  <div className="absolute -top-4 -right-4 text-4xl transform rotate-12 drop-shadow-md"><iconify-icon icon="lucide:sparkles"></iconify-icon></div>
                )}
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4 mt-2">
                  <div>
                    <div className="flex text-yellow-500 text-xl mb-1 drop-shadow-sm">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <p className="text-lg font-bold font-serif text-gray-900 border-b border-gray-300 pb-1 inline-block">
                      {review.is_anonymous ? 'Anonymous' : (review.customer?.first_name + ' ' + review.customer?.last_name)}
                    </p>
                  </div>
                </div>

                <div className="text-sm font-note text-gray-600 mb-3 italic">
                    <span className="bg-white/50 px-1">{new Date(review.created_at).toLocaleDateString()}</span>
                    {review.occasion && <span className="bg-white/50 px-1 ml-2 block mt-1">For: {review.occasion}</span>}
                </div>

                {/* Story */}
                <div className="flex-1 bg-white/40 p-4 mb-4 text-xl font-note text-gray-800 italic handwriting-marker leading-tight border border-white/50">
                  "{review.story}"
                </div>
                
                <div className="mb-4 text-right">
                  <a href={`/orders/${review.order_id}`} className="text-lg font-note font-bold text-gray-700 hover:text-black underline decoration-wavy">
                    Order #{review.order_id} ↗
                  </a>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-4 border-t-2 border-dashed border-gray-300/50">
                  <button 
                    onClick={() => toggleFeatured(review.id, review.is_featured)}
                    className={`flex-1 py-2 px-1 text-lg font-bold font-serif shadow-sm transform rotate-1 ${review.is_featured ? 'bg-yellow-400 text-yellow-900 border border-yellow-500' : 'bg-white/80 text-gray-700 border border-gray-300 hover:bg-white'}`}
                  >
                    {review.is_featured ? 'Unfeature' : <>Feature <iconify-icon icon="lucide:sparkles"></iconify-icon></>}
                  </button>
                  <button 
                    onClick={() => togglePublic(review.id, review.is_public)}
                    className={`flex-1 py-2 px-1 text-lg font-bold font-serif shadow-sm transform -rotate-1 ${review.is_public ? 'bg-green-400 text-green-900 border border-green-500' : 'bg-red-400 text-white border border-red-500 hover:bg-red-500'}`}
                  >
                    {review.is_public ? <>Public <iconify-icon icon="lucide:eye"></iconify-icon></> : <>Hidden <iconify-icon icon="lucide:eye-off"></iconify-icon></>}
                  </button>
                </div>

              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="inline-block bg-yellow-100 p-8 shadow-md transform rotate-2 border border-gray-200 relative">
                  <div className="pushpin absolute -top-3 left-1/2 -translate-x-1/2"></div>
                  <p className="text-3xl font-note text-gray-800">No reviews have been submitted yet. <iconify-icon icon="lucide:frown"></iconify-icon></p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
