"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OrderWizard() {
  const searchParams = useSearchParams();
  const refProduct = searchParams.get('ref');

  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [concept, setConcept] = useState(refProduct || '');
  const [dimensions, setDimensions] = useState('Medium (3x5)');
  const [colors, setColors] = useState('');
  const [budget, setBudget] = useState('');
  
  const [occasion, setOccasion] = useState('Personal / Home');
  const [urgency, setUrgency] = useState('Standard (4-6 weeks)');
  const [giftMessage, setGiftMessage] = useState('');
  
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('byume_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const token = localStorage.getItem('byume_token');
    
    if (!token) {
      alert("Please login first to upload images.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'byume/custom_orders');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/upload/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to upload image');
      }

      const data = await res.json();
      setImageUrl(data.url);
    } catch (err: any) {
      alert(`Upload Error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('byume_token');
      if (!token) throw new Error('You must be logged in to place an order.');

      // Compile notes
      const notes = `
Concept/Reference: ${concept}
Dimensions: ${dimensions}
Colors/Aesthetic: ${colors}
Reference Image URL: ${imageUrl}
      `.trim();

      const payload = {
        budget: budget,
        priority: urgency,
        gift_message: giftMessage,
        notes: notes
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/orders/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to submit order');
      }

      setSuccess(true);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-[var(--color-surface)] brutalist-border brutalist-shadow-lg transform rotate-1 max-w-lg mx-auto mt-20 relative">
        <div className="pushpin absolute -top-4 right-1/2"></div>
        <h2 className="text-4xl font-serif font-bold tracking-widest uppercase mb-4 text-[#111] mt-4">Oh wait!</h2>
        <p className="font-serif font-bold text-xl text-[#111] mb-8 max-w-md">You need an account so we can chat securely about your design. <iconify-icon icon="lucide:cat"></iconify-icon></p>
        <div className="flex gap-4">
          <a href="/login" className="bg-[var(--color-primary)] text-white px-8 py-3 font-serif font-bold uppercase tracking-wider brutalist-border brutalist-shadow-sm hover:bg-[#111] hover:-translate-y-1 transition-all">Log in</a>
          <a href="/register" className="bg-white text-[var(--color-primary)] px-8 py-3 font-serif font-bold uppercase tracking-wider brutalist-border brutalist-shadow-sm hover:bg-[var(--color-surface-dim)] hover:-translate-y-1 transition-all">Register</a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in bg-[var(--color-surface)] brutalist-border brutalist-shadow-lg transform -rotate-1 max-w-xl mx-auto mt-10 relative">
        <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 transform rotate-2"></div>
        <div className="w-24 h-24 mt-4 bg-[var(--color-secondary)] brutalist-border text-[#111] rounded-full flex items-center justify-center text-5xl mb-6 brutalist-shadow-sm transform rotate-6">
          <iconify-icon icon="lucide:sparkles"></iconify-icon>
        </div>
        <h2 className="text-4xl font-serif font-bold uppercase tracking-widest mb-4 text-[#111]">Your vision is in motion!</h2>
        <p className="font-serif font-bold text-xl text-[#111] mb-8 max-w-md bg-white px-4 py-2 brutalist-border">We've got your request. The studio will review it and reach out within 48 hours.</p>
        <a href="/dashboard" className="bg-[var(--color-primary)] text-white px-8 py-3 font-serif font-bold uppercase tracking-wider brutalist-border brutalist-shadow-sm hover:bg-[#111] hover:-translate-y-1 transition-all">Go to Studio Dashboard</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 brutalist-border brutalist-shadow-xl relative overflow-hidden transform rotate-1">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')] pointer-events-none"></div>
      
      <div className="pushpin absolute -top-4 right-10"></div>
      <div className="washi-tape-green absolute -top-4 left-4 transform -rotate-12"></div>

      {/* Progress Bar */}
      <div className="relative z-10 mb-12 brutalist-border-b-4 border-[#111] border-b-[3px] pb-6">
        <div className="flex justify-between items-end">
          {['Concept', 'Details', 'Occasion', 'Review'].map((label, idx) => (
             <div key={label} className={`flex flex-col items-center ${step >= idx + 1 ? 'opacity-100' : 'opacity-40'}`}>
               <span className="font-serif font-bold uppercase tracking-wider text-sm mb-1 bg-[#111] text-white px-2 py-0.5">{idx + 1}. {label}</span>
               {step === idx + 1 && <span className="text-[var(--color-primary)] text-2xl mt-1 flex justify-center"><iconify-icon icon="lucide:minus"></iconify-icon></span>}
             </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        
        {/* STEP 1: CONCEPT */}
        {step === 1 && (
          <div className="animate-fade-in space-y-8">
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-2 bg-[var(--color-secondary)] inline-block px-4 py-2 brutalist-border transform -rotate-1">Let's start.</h1>
              <p className="font-serif font-bold text-xl text-[#111] mt-4">What kind of handmade creation are you looking for?</p>
            </div>
            
            <div className="bg-[var(--color-surface-dim)] p-6 brutalist-border transform -rotate-1 brutalist-shadow-sm">
              <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-2">Base Concept or Reference</label>
              <input 
                type="text" 
                value={concept} 
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g. A crochet frog, a tufted strawberry rug..."
                className="w-full bg-white px-4 py-3 text-lg font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-container)] transition-all placeholder:font-sans placeholder:font-normal"
              />
              {refProduct && (
                <p className="font-serif font-bold text-sm text-[#111] bg-[var(--color-primary-container)] px-2 py-1 inline-block brutalist-border mt-3"><iconify-icon icon="lucide:sparkles"></iconify-icon> Starting from gallery item: {refProduct}</p>
              )}
            </div>

            <div className="bg-[var(--color-tertiary-container)] p-6 brutalist-border transform rotate-1 brutalist-shadow-sm">
              <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-4">Inspiration Image (Optional)</label>
              <div className="flex items-center gap-4">
                {imageUrl ? (
                  <div className="relative group p-2 bg-white brutalist-border brutalist-shadow transform -rotate-3">
                    <div className="pushpin absolute -top-4 right-4"></div>
                    <img src={imageUrl} alt="Reference" className="h-40 w-40 object-cover mt-2" />
                    <button 
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 bg-[#111] text-white w-8 h-8 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity brutalist-border hover:bg-red-500"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 brutalist-border border-dashed border-2 bg-white hover:bg-[var(--color-tertiary)] transition-colors">
                    <span className="text-4xl mb-2 text-[#111]"><iconify-icon icon="lucide:camera"></iconify-icon></span>
                    <span className="font-serif font-bold text-lg text-[#111] uppercase tracking-wider">
                      {isUploading ? 'Pinning it...' : 'Pin a reference photo here!'}
                    </span>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DETAILS */}
        {step === 2 && (
          <div className="animate-fade-in space-y-8">
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-2 bg-[var(--color-tertiary)] inline-block px-4 py-2 brutalist-border transform rotate-1">The finer details.</h1>
              <p className="font-serif font-bold text-xl text-[#111] mt-4">Tell us how you want it to look and feel.</p>
            </div>
            
            <div className="bg-[var(--color-primary-container)] p-6 brutalist-border transform rotate-1 relative brutalist-shadow-sm">
              <div className="washi-tape absolute -top-3 right-10"></div>
              <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-2">Approximate Size / Dimensions</label>
              <select 
                value={dimensions} 
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full bg-white px-4 py-3 text-lg font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all cursor-pointer appearance-none"
              >
                <option>Small (Desk Accent)</option>
                <option>Medium (3x5 Area)</option>
                <option>Large (5x7 Room)</option>
                <option>Custom / Not sure</option>
              </select>
            </div>

            <div className="bg-[var(--color-secondary-container)] p-6 brutalist-border transform -rotate-1 relative brutalist-shadow-sm">
              <div className="pushpin absolute -top-4 left-6 border-gray-400"></div>
              <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-2">Colors & Aesthetic</label>
              <textarea 
                rows={3}
                value={colors} 
                onChange={(e) => setColors(e.target.value)}
                placeholder="Warm neutrals, bright neon pink, cottagecore vibe..."
                className="w-full bg-white px-4 py-3 text-lg font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:font-sans placeholder:font-normal"
              />
            </div>
          </div>
        )}

        {/* STEP 3: OCCASION */}
        {step === 3 && (
          <div className="animate-fade-in space-y-8">
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-white mb-2 bg-[var(--color-primary)] inline-block px-4 py-2 brutalist-border transform rotate-1">Logistics & Budget.</h1>
              <p className="font-serif font-bold text-xl text-[#111] mt-4">When do you need it, and what are we working with?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[var(--color-tertiary)] p-6 brutalist-border brutalist-shadow-sm transform -rotate-1">
                <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-2">Occasion</label>
                <select 
                  value={occasion} 
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-white px-4 py-3 text-lg font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all cursor-pointer appearance-none"
                >
                  <option>Personal / Home</option>
                  <option>Birthday Gift</option>
                  <option>Anniversary / Wedding</option>
                  <option>Holiday</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div className="bg-[var(--color-primary-container)] p-6 brutalist-border brutalist-shadow-sm transform rotate-1">
                <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-2">Urgency</label>
                <select 
                  value={urgency} 
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full bg-white px-4 py-3 text-lg font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all cursor-pointer appearance-none"
                >
                  <option>Standard (4-6 weeks)</option>
                  <option>Rush (2-3 weeks)</option>
                  <option>Extreme Rush (1 week - if possible)</option>
                  <option>No rush</option>
                </select>
              </div>
            </div>

            <div className="bg-[var(--color-secondary)] p-6 brutalist-border transform -rotate-1 relative brutalist-shadow-sm">
              <div className="washi-tape-green absolute -top-3 left-1/2 -translate-x-1/2"></div>
              <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-2">Target Budget Range</label>
              <select 
                  value={budget} 
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-white px-4 py-3 text-lg font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all cursor-pointer appearance-none"
                >
                  <option>Under ₹50</option>
                  <option>₹50 - ₹100</option>
                  <option>₹100 - ₹300</option>
                  <option>₹300+</option>
                  <option>Unsure, need quote</option>
                </select>
            </div>

            <div className="bg-white p-6 brutalist-border brutalist-shadow-sm transform rotate-1">
              <label className="block font-serif text-lg font-bold uppercase tracking-wider text-[#111] mb-2">Gift Message (Optional)</label>
              <textarea 
                rows={2}
                value={giftMessage} 
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="If this is a gift, what should the card say?"
                className="w-full bg-white px-4 py-3 text-lg font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:font-sans placeholder:font-normal"
              />
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {step === 4 && (
          <div className="animate-fade-in space-y-8">
            <div className="mb-6">
              <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-2 bg-[var(--color-secondary-container)] inline-block px-4 py-2 brutalist-border transform -rotate-1">Review your request.</h1>
              <p className="font-serif font-bold text-xl text-[#111] mt-4">Take a moment to ensure everything looks correct before submitting.</p>
            </div>
            
            <div className="bg-[#FFF9F0] p-8 brutalist-border space-y-6 relative transform -rotate-1 brutalist-shadow-lg">
              <div className="pushpin absolute -top-4 right-4"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b-[3px] border-[#111] pb-4">
                <div className="font-serif font-bold uppercase tracking-wider text-[#111]">Concept</div>
                <div className="sm:col-span-2 font-serif font-bold text-xl text-[#111]">{concept || 'None specified'}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b-[3px] border-[#111] pb-4">
                <div className="font-serif font-bold uppercase tracking-wider text-[#111]">Dimensions</div>
                <div className="sm:col-span-2 font-serif font-bold text-xl text-[#111]">{dimensions}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b-[3px] border-[#111] pb-4">
                <div className="font-serif font-bold uppercase tracking-wider text-[#111]">Colors</div>
                <div className="sm:col-span-2 font-serif font-bold text-xl text-[#111]">{colors || 'Designer\'s choice'}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b-[3px] border-[#111] pb-4">
                <div className="font-serif font-bold uppercase tracking-wider text-[#111]">Timeline</div>
                <div className="sm:col-span-2 font-serif font-bold text-xl text-[#111]">{urgency}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b-[3px] border-[#111] pb-4">
                <div className="font-serif font-bold uppercase tracking-wider text-[#111]">Budget</div>
                <div className="sm:col-span-2 font-serif font-bold text-xl text-[#111]">{budget}</div>
              </div>
              {imageUrl && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="font-serif font-bold uppercase tracking-wider text-[#111]">Reference</div>
                  <div className="sm:col-span-2">
                    <div className="p-2 bg-white brutalist-shadow-sm inline-block transform rotate-2 brutalist-border">
                      <img src={imageUrl} alt="Reference" className="h-24 w-24 object-cover" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between items-center">
          {step > 1 ? (
            <button 
              onClick={prevStep}
              className="font-serif font-bold uppercase tracking-wider text-xl text-[#111] bg-white px-6 py-3 brutalist-border brutalist-shadow-sm hover:bg-[var(--color-surface-dim)] hover:-translate-y-1 transition-all"
            >
              &larr; Go Back
            </button>
          ) : (
            <div></div> 
          )}

          {step < 4 ? (
            <button 
              onClick={nextStep}
              disabled={step === 1 && !concept.trim()}
              className="bg-[var(--color-primary)] text-white px-8 py-3 font-serif font-bold uppercase tracking-wider text-xl hover:bg-[#111] hover:-translate-y-1 transition-all brutalist-border brutalist-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue &rarr;
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#111] text-[var(--color-tertiary)] px-10 py-4 font-serif font-bold uppercase tracking-widest text-xl hover:bg-[var(--color-primary)] hover:text-white transition-all brutalist-border brutalist-shadow-lg transform rotate-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 flex items-center gap-2"
            >
              {loading ? 'Sending...' : <>Send to Studio <iconify-icon icon="lucide:sparkles"></iconify-icon></>}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default function CustomOrderPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">


      <div className="py-12 px-6 pb-24">
        <Suspense fallback={<div className="text-center mt-20 font-note text-2xl">Finding a clean sheet of paper...</div>}>
          <OrderWizard />
        </Suspense>
      </div>
    </div>
  );
}
