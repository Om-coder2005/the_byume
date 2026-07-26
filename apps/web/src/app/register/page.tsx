"use client";

import React, { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to register');
      }

      // Success, redirect to login
      window.location.href = "/login";
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background doodles/decorations */}
      <div className="absolute top-20 right-20 text-6xl transform rotate-12 opacity-80 text-[#111]"><iconify-icon icon="lucide:gift"></iconify-icon></div>
      <div className="absolute bottom-10 left-10 text-6xl transform -rotate-12 opacity-80 text-[#111]"><iconify-icon icon="lucide:flower"></iconify-icon></div>
      
      <div className="max-w-md w-full bg-white p-10 brutalist-border brutalist-shadow-lg relative transform -rotate-1">
        <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
        <div className="washi-tape absolute -top-4 left-10 transform rotate-6"></div>
        
        <div className="border-b-[3px] border-[#111] pb-6 mb-6">
          <h2 className="mt-6 text-center text-4xl font-serif font-bold uppercase tracking-widest text-[#111]">
            Join The Byume
          </h2>
          <p className="mt-2 text-center text-xl font-serif font-bold text-[#111] bg-[var(--color-secondary)] inline-block px-4 py-1 brutalist-border transform rotate-1 mx-auto block w-max mt-4">
            Create an account to start your custom order journey <iconify-icon icon="lucide:sparkles"></iconify-icon>
          </p>
        </div>
        
        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleRegister}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email-address" className="block text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-primary-container)] inline-block px-2 py-1 brutalist-border">Email address</label>
              <input
                id="email-address"
                type="email"
                required
                className="w-full bg-white brutalist-border p-4 text-xl font-serif font-bold focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:text-gray-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-tertiary-container)] inline-block px-2 py-1 brutalist-border">Username</label>
              <input
                id="username"
                type="text"
                required
                className="w-full bg-white brutalist-border p-4 text-xl font-serif font-bold focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:text-gray-400"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-secondary-container)] inline-block px-2 py-1 brutalist-border">Password</label>
              <input
                id="password"
                type="password"
                required
                className="w-full bg-white brutalist-border p-4 text-xl font-serif font-bold focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:text-gray-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500 p-4 brutalist-border transform rotate-1 brutalist-shadow-sm">
               <div className="text-white text-lg font-serif font-bold uppercase tracking-wider">{error}</div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 brutalist-shadow-sm text-2xl font-serif font-bold uppercase tracking-widest text-[#111] bg-[var(--color-tertiary)] hover:bg-[#111] hover:text-[var(--color-tertiary)] brutalist-border transition-all transform rotate-1 hover:-translate-y-1"
            >
              {loading ? "Crafting account..." : "Register"}
            </button>
          </div>
          
          <div className="text-center mt-6">
            <p className="font-serif font-bold text-xl text-[#111]">
              Already have an account? <a href="/login" className="text-white bg-[#111] px-2 py-1 brutalist-border hover:bg-[var(--color-primary)] hover:text-white transition-all transform -rotate-2 inline-block">Log In</a>
            </p>
          </div>
        </form>
      </div>
      
      {/* Return Home Link */}
      <a href="/" className="absolute top-6 left-6 font-serif font-bold uppercase tracking-wider text-xl text-[#111] bg-white p-4 brutalist-border brutalist-shadow-sm transform rotate-2 hover:bg-[#111] hover:text-white transition-all">
        &larr; Back to Shop
        <div className="pushpin absolute -top-4 -left-2 transform -rotate-45"></div>
      </a>
    </div>
  );
}
