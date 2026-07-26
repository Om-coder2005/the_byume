"use client";

import React, { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // FastAPI OAuth2 expects username
      formData.append('password', password);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      
      // Store token separately for admin to avoid crossing scopes
      localStorage.setItem("byume_admin_token", data.access_token);
      
      // Redirect to orders
      window.location.href = "/orders";
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cork flex items-center justify-center py-12 px-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-6xl transform -rotate-12 opacity-80 z-0"><iconify-icon icon="lucide:file-text"></iconify-icon></div>
      <div className="absolute bottom-10 right-10 text-6xl transform rotate-12 opacity-80 z-0"><iconify-icon icon="lucide:coffee"></iconify-icon></div>

      <div className="max-w-md w-full bg-white p-10 brutalist-border brutalist-shadow-lg relative transform rotate-1 z-10">
        <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
        <div className="pushpin absolute -top-4 right-8"></div>

        <h2 className="text-4xl font-serif font-bold uppercase tracking-widest text-center text-[#111] mb-2 mt-4 bg-[var(--color-primary-container)] inline-block w-full brutalist-border py-2">Admin Studio</h2>
        <p className="text-center font-serif font-bold text-xl text-[#111] mb-8 mt-4">Authorized personnel only <iconify-icon icon="lucide:key"></iconify-icon></p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="bg-[var(--color-tertiary-container)] p-4 brutalist-border brutalist-shadow-sm transform -rotate-1">
            <label className="block font-serif text-xl font-bold uppercase tracking-wider text-[#111] mb-2">Email / Username</label>
            <input
              type="text"
              required
              className="w-full bg-white px-4 py-3 text-xl font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:font-sans placeholder:font-normal"
              placeholder="admin@thebyume.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="bg-[var(--color-surface-dim)] p-4 brutalist-border brutalist-shadow-sm transform rotate-1">
            <label className="block font-serif text-xl font-bold uppercase tracking-wider text-[#111] mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-white px-4 py-3 text-xl font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:font-sans placeholder:font-normal"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-400 p-4 brutalist-border transform -rotate-1">
               <div className="text-[#111] text-lg font-serif font-bold uppercase tracking-wider bg-white inline-block px-2">{error}</div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 text-xl font-serif font-bold uppercase tracking-widest text-white bg-[#111] hover:bg-[var(--color-primary)] brutalist-border brutalist-shadow transition-all transform -rotate-1 hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : <>Unlock Dashboard <iconify-icon icon="lucide:unlock"></iconify-icon></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
