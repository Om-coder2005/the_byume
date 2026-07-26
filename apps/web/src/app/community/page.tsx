"use client";

import React, { useEffect, useState } from 'react';

export default function CommunityShowcase() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Fetch only featured reviews
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/reviews/?featured_only=true`);
      if (res.ok) {
        setReviews(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cork relative overflow-hidden">


      {/* Hero */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto relative z-10">
        <div className="bg-[var(--color-primary-container)] p-8 brutalist-border brutalist-shadow-lg transform -rotate-1 relative inline-block">
          <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
          <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-2 bg-white inline-block px-4 py-2 brutalist-border mt-2">Community Stories</h1>
          <p className="font-serif font-bold text-xl text-[#111] mt-4 p-4 bg-white brutalist-border inline-block">Every handmade piece carries an emotion. Look at all the lovely places our creations ended up! <iconify-icon icon="lucide:sparkles"></iconify-icon></p>
        </div>
      </section>

      {/* Masonry / Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        {loading ? (
          <div className="text-center font-serif font-bold uppercase tracking-wider text-xl text-[#111] py-20 bg-white brutalist-border p-6 max-w-md mx-auto brutalist-shadow-sm transform rotate-2">Loading stories...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 bg-[var(--color-surface)] p-8 brutalist-border brutalist-shadow-lg transform rotate-1 max-w-lg mx-auto relative">
             <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
            <h3 className="font-serif font-bold uppercase tracking-widest text-2xl text-[#111] mb-2 mt-4 bg-white inline-block px-4 py-2 brutalist-border">No stories pinned yet!</h3>
            <p className="font-serif font-bold text-xl text-[#111] mt-4">Check back soon to see our community showcase.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {reviews.map((review, i) => (
              <div 
                key={review.id} 
                className="break-inside-avoid bg-white p-4 pb-12 brutalist-border brutalist-shadow-lg relative group transition-transform hover:z-20 hover:-translate-y-2 hover:brutalist-shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
              >
                {i % 3 === 0 ? (
                  <div className="pushpin absolute -top-4 right-1/2"></div>
                ) : i % 3 === 1 ? (
                   <div className="pushpin absolute -top-4 left-4"></div>
                ) : (
                   <div className="pushpin absolute -top-4 right-8"></div>
                )}
                
                <div className="relative z-10 mt-4">
                  <div className="flex justify-between items-start mb-4 px-2">
                    <div className="flex gap-1 text-sm mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <iconify-icon key={idx} icon="lucide:star" class={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}></iconify-icon>
                      ))}
                    </div>
                    {review.occasion && (
                      <span className="bg-[var(--color-tertiary-container)] text-[#111] px-3 py-1 text-sm font-serif font-bold uppercase tracking-wider transform rotate-3 brutalist-border brutalist-shadow-sm">
                        {review.occasion}
                      </span>
                    )}
                  </div>

                  <p className="font-serif font-bold text-xl text-[#111] leading-relaxed mb-6 px-4">"{review.story}"</p>
                  
                  <div className="absolute bottom-4 right-6 text-right">
                    <p className="font-serif font-bold uppercase tracking-wider text-sm text-[#111] bg-white px-2 py-0.5 brutalist-border inline-block">
                      - {review.is_anonymous ? 'Anonymous' : (review.customer?.first_name + ' ' + review.customer?.last_name)}
                    </p>
                    <p className="text-xs font-serif font-bold uppercase tracking-wider text-gray-500 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Footer CTA */}
      <section className="py-20 px-6 text-center relative z-10 pb-32">
        <div className="bg-[var(--color-secondary)] brutalist-border brutalist-shadow-lg p-12 max-w-2xl mx-auto transform -rotate-1 relative">
           <div className="pushpin absolute -top-4 right-1/4"></div>
           <div className="pushpin absolute -top-4 left-4"></div>
          <h2 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-6 bg-white inline-block px-4 py-2 brutalist-border transform rotate-1 mt-4">Create your story</h2>
          <br/>
          <a href="/custom-order" className="inline-block bg-[#111] text-white px-8 py-4 font-serif font-bold uppercase tracking-wider text-xl hover:bg-[var(--color-primary)] transition-all brutalist-border brutalist-shadow transform rotate-2 hover:-translate-y-1">
            Start a Custom Order
          </a>
        </div>
      </section>

    </div>
  );
}
