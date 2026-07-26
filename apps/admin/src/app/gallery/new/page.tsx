"use client";

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';
import { useRouter } from 'next/navigation';

export default function NewGalleryItemPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    description: '',
    difficulty: 'Intermediate',
    estimated_days: 7,
    price_from: 0,
    price_to: 0,
    featured: false
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/gallery/categories");
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: any) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-₹)+/g, '');
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('byume_admin_token');
      
      const payload = {
        ...formData,
        category_id: parseInt(formData.category_id),
        estimated_days: parseInt(formData.estimated_days as any),
        price_from: parseFloat(formData.price_from as any),
        price_to: parseFloat(formData.price_to as any),
      };

      const res = await fetch("http://localhost:8000/api/gallery/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Product published successfully! ✨");
        router.push("/gallery");
      } else {
        const err = await res.json();
        alert(`Failed: ${err.detail || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error publishing product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminShell>
      <div className="mb-8 relative inline-block">
        <a href="/gallery" className="font-note text-xl text-gray-500 hover:text-[var(--color-primary)] mb-4 inline-block transform -rotate-1">&larr; Back to Board</a>
        <div className="bg-[#FFF9F0] p-4 shadow-sm border border-[#E3D9CC] transform rotate-1 relative">
           <div className="paperclip absolute -top-4 right-10"></div>
           <h1 className="text-4xl font-bold text-gray-900 font-serif border-b-2 border-dashed border-[#DCD1C4] pb-2">Publish New Creation</h1>
           <p className="mt-2 text-xl font-note text-gray-600">Add a new masterpiece to your portfolio.</p>
        </div>
      </div>

      <div className="bg-[#FFF9F0] rounded-none shadow-[5px_5px_15px_rgba(0,0,0,0.1)] border border-[#E3D9CC] max-w-3xl transform -rotate-1 relative mt-8">
        <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 transform rotate-2"></div>
        <div className="pushpin absolute -top-3 right-4"></div>
        
        {/* Lined paper effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 95%, #a5b4fc 5%)', backgroundSize: '100% 2.5rem' }}></div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-2xl font-serif font-bold text-gray-700">Creation Title</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400 handwriting-marker"
                  placeholder="e.g. Sunflower Bouquet"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="slug" className="block text-2xl font-serif font-bold text-gray-700">URL Slug</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-xl font-note text-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-2xl font-serif font-bold text-gray-700">Description</label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400"
                  placeholder="Describe the piece, the materials used, and the inspiration behind it."
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category_id" className="block text-2xl font-serif font-bold text-gray-700">Category</label>
              <div className="mt-1">
                <select
                  id="category_id"
                  name="category_id"
                  required
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="difficulty" className="block text-2xl font-serif font-bold text-gray-700">Difficulty</label>
              <div className="mt-1">
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Masterclass</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price_from" className="block text-2xl font-serif font-bold text-gray-700">Price From (₹)</label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price_from"
                  id="price_from"
                  required
                  min="0"
                  value={formData.price_from}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors handwriting-marker text-[var(--color-primary)]"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price_to" className="block text-2xl font-serif font-bold text-gray-700">Price To (₹)</label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price_to"
                  id="price_to"
                  required
                  min="0"
                  value={formData.price_to}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors handwriting-marker text-[var(--color-primary)]"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="estimated_days" className="block text-2xl font-serif font-bold text-gray-700">Est. Days</label>
              <div className="mt-1">
                <input
                  type="number"
                  name="estimated_days"
                  id="estimated_days"
                  required
                  min="1"
                  value={formData.estimated_days}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-dashed border-gray-400 py-2 text-2xl font-note focus:outline-none focus:border-[var(--color-primary)] transition-colors handwriting-marker"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t-4 border-dashed border-gray-300 flex items-center justify-between">
            <div className="flex items-center transform rotate-1">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className="h-6 w-6 rounded border-gray-400 text-[var(--color-primary)] focus:ring-[var(--color-primary)] accent-[var(--color-primary)]"
              />
              <label htmlFor="featured" className="ml-3 block text-2xl font-note text-gray-900 font-bold">
                Feature on Homepage <iconify-icon icon="lucide:sparkles"></iconify-icon>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="stitched-border bg-[var(--color-primary)] py-3 px-8 text-2xl font-serif font-bold text-white hover:bg-[var(--color-primary-dark)] transition-transform transform -rotate-2 hover:scale-105 shadow-md disabled:opacity-50"
            >
              {loading ? 'Publishing...' : <>Publish Product <iconify-icon icon="lucide:pin"></iconify-icon></>}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
