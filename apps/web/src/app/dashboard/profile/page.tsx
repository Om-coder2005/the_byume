"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardShell from '@/components/DashboardShell';

export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  
  const [profile, setProfile] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    shipping_address: ''
  });
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Prefill the form with user data from the auth context
  useEffect(() => {
    if (user) {
      setProfile({
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_number: user.phone_number || '',
        shipping_address: user.shipping_address || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, authLoading]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const token = localStorage.getItem('byume_token');
    try {
      const res = await fetch("http://localhost:8000/api/users/me", {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone_number: profile.phone_number,
          shipping_address: profile.shipping_address
        })
      });

      if (res.ok) {
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardShell activePath="/dashboard/profile">
      <div className="mb-8 relative inline-block">
        <h1 className="text-4xl font-bold text-gray-900 font-serif bg-white p-4 border border-[#E3D9CC] shadow-sm transform rotate-1 inline-block">Profile & Settings</h1>
        <div className="paperclip absolute -top-4 right-0 transform rotate-12"></div>
        <p className="mt-4 text-2xl text-gray-800 font-note bg-white p-2 border-2 border-dashed border-[#DCD1C4] inline-block transform -rotate-1 shadow-sm">Manage your personal information and shipping address.</p>
      </div>

      <div className="bg-[#FFF9F0] shadow-[5px_5px_15px_rgba(0,0,0,0.15)] border border-[#E3D9CC] max-w-2xl overflow-visible relative transform rotate-1">
        
        <div className="washi-tape absolute -top-4 left-10 transform -rotate-6"></div>
        <div className="washi-tape-green absolute -bottom-4 right-10 transform rotate-3"></div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8 relative z-10">
          
          {message && (
            <div className={`p-4 font-note text-xl border-l-4 transform -rotate-1 ${message.includes('successfully') ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
              {message}
            </div>
          )}

          <div>
            <label className="block text-2xl font-serif font-bold text-gray-700 mb-2">Email Address</label>
            <div className="mt-1 relative">
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note text-gray-500 cursor-not-allowed"
              />
            </div>
            <p className="mt-2 text-lg text-gray-500 font-note italic">Your email address cannot be changed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label htmlFor="first_name" className="block text-2xl font-serif font-bold text-gray-700 mb-2">First Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-300"
                  placeholder="Jane"
                />
              </div>
            </div>

            <div>
              <label htmlFor="last_name" className="block text-2xl font-serif font-bold text-gray-700 mb-2">Last Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-300"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-2xl font-serif font-bold text-gray-700 mb-2">Phone Number</label>
            <div className="mt-1">
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={profile.phone_number}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="shipping_address" className="block text-2xl font-serif font-bold text-gray-700 mb-2">Default Shipping Address</label>
            <div className="mt-1">
              <textarea
                id="shipping_address"
                name="shipping_address"
                rows={3}
                value={profile.shipping_address}
                onChange={handleChange}
                placeholder="123 Craft Lane&#10;Apt 4B&#10;New York, NY 10001"
                className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="stitched-border bg-white border-2 border-dashed border-[var(--color-primary)] text-[var(--color-primary)] py-3 px-8 text-2xl font-serif font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors disabled:opacity-50 transform -rotate-2"
            >
              {saving ? 'Saving...' : <>Save Changes <iconify-icon icon="lucide:pin"></iconify-icon></>}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
