"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, authLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // FastAPI OAuth2PasswordRequestForm expects username
      formData.append('password', password);

      const res = await fetch("http://localhost:8000/api/auth/login", {
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
      
      // Use auth hook to log in
      login(data.access_token);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background doodles/decorations */}
      <div className="absolute top-10 left-10 text-6xl transform -rotate-12 opacity-80 text-[#111]"><iconify-icon icon="lucide:scissors"></iconify-icon></div>
      <div className="absolute bottom-20 right-20 text-6xl transform rotate-12 opacity-80 text-[#111]"><iconify-icon icon="lucide:smile"></iconify-icon></div>
      
      <div className="max-w-md w-full bg-white p-10 brutalist-border brutalist-shadow-lg relative transform rotate-1">
        <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
        <div className="washi-tape-green absolute -bottom-4 right-10 transform -rotate-12"></div>
        
        <div className="border-b-[3px] border-[#111] pb-6 mb-6">
          <h2 className="text-center text-4xl font-serif font-bold uppercase tracking-widest text-[#111]">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-xl font-serif font-bold text-[#111] bg-[var(--color-secondary)] inline-block px-4 py-1 brutalist-border transform -rotate-1 mx-auto block w-max mt-4">
            Let's get back to creating. <iconify-icon icon="lucide:sparkles"></iconify-icon>
          </p>
        </div>
        
        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email-address" className="block text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-primary-container)] inline-block px-2 py-1 brutalist-border">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="w-full bg-white brutalist-border p-4 text-xl font-serif font-bold focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:text-gray-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-tertiary-container)] inline-block px-2 py-1 brutalist-border">Password</label>
              <input
                id="password"
                name="password"
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
            <div className="bg-red-500 p-4 brutalist-border transform -rotate-1 brutalist-shadow-sm">
               <div className="text-white text-lg font-serif font-bold uppercase tracking-wider">{error}</div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 brutalist-shadow-sm text-2xl font-serif font-bold uppercase tracking-widest text-white bg-[var(--color-primary)] hover:bg-[#111] brutalist-border transition-all transform -rotate-1 hover:-translate-y-1"
            >
              {loading ? "Opening door..." : "Log In"}
            </button>
          </div>
          
          <div className="text-center mt-6">
            <p className="font-serif font-bold text-xl text-[#111]">
              New here? <a href="/register" className="text-white bg-[#111] px-2 py-1 brutalist-border hover:bg-[var(--color-secondary)] hover:text-[#111] transition-all transform rotate-2 inline-block">Register</a>
            </p>
          </div>
        </form>
      </div>
      
      {/* Return Home Link */}
      <a href="/" className="absolute top-6 left-6 font-serif font-bold uppercase tracking-wider text-xl text-[#111] bg-white p-4 brutalist-border brutalist-shadow-sm transform -rotate-2 hover:bg-[#111] hover:text-white transition-all">
        &larr; Back to Shop
        <div className="pushpin absolute -top-4 -left-2 transform -rotate-45"></div>
      </a>
    </div>
  );
}
