"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { useParams } from 'next/navigation';

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Pricing Form State
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  
  // Status State
  const [timelineMsg, setTimelineMsg] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        setEstimatedPrice(data.estimated_price || '');
        setFinalPrice(data.final_price || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async () => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`http://localhost:8000/api/orders/${id}/price`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          estimated_price: estimatedPrice ? parseFloat(estimatedPrice) : null,
          final_price: finalPrice ? parseFloat(finalPrice) : null
        })
      });
      if (res.ok) {
        alert("Pricing updated successfully!");
        fetchOrder();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update pricing.");
    }
  };

  const handleGenerateQuote = async () => {
    if (!finalPrice) {
      alert("Please save a Final Price first!");
      return;
    }
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`http://localhost:8000/api/payments/quote/${id}?final_price=${finalPrice}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert("Quote generated and sent to customer!");
        fetchOrder();
      } else {
        const data = await res.json();
        alert(`Error: ${data.detail || 'Failed to generate quote'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate quote.");
    }
  };

  const handleUpdateStatus = async (statusName: string, message?: string) => {
    try {
      const token = localStorage.getItem('byume_admin_token');
      const res = await fetch(`http://localhost:8000/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status_name: statusName,
          message: message || `Updated status to ${statusName}`
        })
      });
      if (res.ok) {
        setTimelineMsg('');
        alert(`Status updated to ${statusName} and customer notified via email!`);
        fetchOrder();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (loading) return <AdminShell><div className="animate-pulse p-10 font-note text-3xl text-gray-500 transform rotate-1">Loading Workspace... <iconify-icon icon="lucide:hourglass"></iconify-icon></div></AdminShell>;
  if (!order) return <AdminShell><div className="p-10 font-note text-3xl text-gray-700 bg-[#FFF9F0] border border-[#E3D9CC] shadow-sm transform -rotate-1 inline-block">Order not found. <iconify-icon icon="lucide:help-circle"></iconify-icon></div></AdminShell>;

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div className="relative z-10">
          <a href="/orders" className="font-serif font-bold uppercase tracking-wider text-xl text-[#111] hover:bg-[#111] hover:text-white transition-all mb-4 inline-block transform -rotate-2 bg-white px-4 py-2 brutalist-border brutalist-shadow-sm">&larr; Back to Inbox</a>
          <div className="bg-[var(--color-primary-container)] p-6 brutalist-border brutalist-shadow-lg transform rotate-1 relative mt-2">
            <div className="pushpin absolute -top-4 -left-2"></div>
            <h1 className="text-5xl font-serif font-bold uppercase tracking-widest text-[#111] border-b-[3px] border-[#111] pb-2 bg-white inline-block px-4 py-2 brutalist-border">Order {order.order_number}</h1>
            <p className="mt-4 text-xl font-serif font-bold text-[#111] bg-white brutalist-border px-3 py-1 inline-block">Customer ID: {order.customer_id} | Submitted: {new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 relative z-20">
          <span className="inline-block px-6 py-3 text-xl font-serif font-bold uppercase tracking-wider text-[#111] bg-green-400 brutalist-border brutalist-shadow-sm transform rotate-3">
            Current Status: {order.status.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Left Column: Details & Images */}
        <div className="xl:col-span-2 space-y-10">
          
          <div className="bg-white brutalist-border brutalist-shadow-lg p-8 relative transform -rotate-1">
            <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
            <h2 className="text-3xl font-serif font-bold uppercase tracking-widest mb-6 text-[#111] bg-[var(--color-secondary)] inline-block px-4 py-2 brutalist-border">Design Request</h2>
            
            <div className="space-y-6">
              <div className="bg-[var(--color-surface)] p-6 brutalist-border brutalist-shadow-sm transform rotate-1 relative">
                <div className="pushpin absolute -top-4 -right-2"></div>
                <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-white inline-block px-2 py-1 brutalist-border">Notes & Ideas</h3>
                <p className="text-xl font-serif font-bold text-[#111] whitespace-pre-line mt-2 p-4 bg-white brutalist-border">
                  {order.notes || "No notes provided."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 brutalist-border brutalist-shadow-sm transform -rotate-2">
                  <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-tertiary-container)] inline-block px-2 py-1 brutalist-border">Budget Estimate</h3>
                  <p className="text-2xl font-serif font-bold text-[#111] mt-2">{order.budget || "N/A"}</p>
                </div>
                <div className="bg-white p-6 brutalist-border brutalist-shadow-sm transform rotate-2">
                  <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-primary-container)] inline-block px-2 py-1 brutalist-border">Dimensions</h3>
                  <p className="text-2xl font-serif font-bold text-[#111] mt-2">{order.dimensions || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cork p-10 brutalist-border brutalist-shadow-inner relative">
            <h2 className="text-3xl font-serif font-bold uppercase tracking-widest mb-8 text-[#111] bg-white inline-block px-4 py-2 transform -rotate-2 brutalist-border brutalist-shadow">Reference Images <iconify-icon icon="lucide:camera"></iconify-icon></h2>
            {order.reference_images && order.reference_images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {order.reference_images.map((img: any, i: number) => (
                  <div key={img.id} className={`bg-white p-4 pb-12 brutalist-border brutalist-shadow-lg relative ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'} transition-transform hover:-translate-y-2 hover:z-10 hover:brutalist-shadow-xl`}>
                    <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2 z-20"></div>
                    <img src={img.media.url} alt="Reference" className="object-cover w-full aspect-square brutalist-border" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-[var(--color-surface)] brutalist-border transform rotate-1">
                <p className="text-2xl font-serif font-bold uppercase tracking-wider text-[#111]">No polaroids pinned yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing & Timeline */}
        <div className="space-y-10">
          
          {/* Decision & Pricing Panel */}
          <div className="bg-[var(--color-primary-container)] brutalist-border brutalist-shadow-lg p-8 relative transform rotate-1">
            <div className="pushpin absolute -top-4 left-10"></div>
            <h2 className="text-3xl font-serif font-bold uppercase tracking-widest mb-6 text-[#111] bg-white inline-block px-4 py-2 brutalist-border">Pricing & Quotation <iconify-icon icon="lucide:banknote"></iconify-icon></h2>
            
            <div className="space-y-6 mb-8 bg-white p-6 brutalist-border brutalist-shadow-sm transform -rotate-1">
              <div>
                <label className="block text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-surface)] inline-block px-2 py-1 brutalist-border">Estimated Price (₹)</label>
                <input 
                  type="number" 
                  value={estimatedPrice} 
                  onChange={e => setEstimatedPrice(e.target.value)}
                  className="w-full bg-white border-[3px] border-[#111] py-3 px-4 text-2xl font-serif font-bold focus:outline-none focus:ring-4 focus:ring-[#111] transition-all text-[var(--color-primary)] mt-2"
                  placeholder="e.g. 1500"
                />
              </div>
              <div>
                <label className="block text-xl font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-tertiary-container)] inline-block px-2 py-1 brutalist-border mt-4">Final Price (₹)</label>
                <input 
                  type="number" 
                  value={finalPrice} 
                  onChange={e => setFinalPrice(e.target.value)}
                  className="w-full bg-white border-[3px] border-[#111] py-3 px-4 text-2xl font-serif font-bold focus:outline-none focus:ring-4 focus:ring-[#111] transition-all text-green-600 mt-2"
                  placeholder="e.g. 1750"
                />
              </div>
              <button 
                onClick={handleUpdatePrice}
                className="w-full bg-white text-[#111] font-serif font-bold uppercase tracking-wider text-xl py-4 px-4 hover:bg-[#111] hover:text-white transition-all brutalist-border brutalist-shadow-sm transform -rotate-1 hover:-translate-y-1 mt-6"
              >
                Save Pricing <iconify-icon icon="lucide:save"></iconify-icon>
              </button>
            </div>

            {order.status.name === "Submitted" && (
              <div className="space-y-4 border-t-[3px] pt-6 border-[#111]">
                <button onClick={() => handleUpdateStatus("Accepted", "Order reviewed and accepted by artist.")} className="w-full bg-[var(--color-primary)] text-white font-bold font-serif uppercase tracking-wider text-xl py-4 px-4 hover:bg-[var(--color-primary-dark)] brutalist-border brutalist-shadow transform rotate-1 hover:-translate-y-1 transition-all">
                  Accept Order <iconify-icon icon="lucide:check-circle"></iconify-icon>
                </button>
                <button onClick={() => handleUpdateStatus("Changes Requested", "Artist requested changes before accepting.")} className="w-full bg-white text-[#111] font-bold font-serif uppercase tracking-wider text-xl py-4 px-4 hover:bg-[#111] hover:text-white brutalist-border brutalist-shadow transform -rotate-1 hover:-translate-y-1 transition-all mt-4">
                  Request Changes <iconify-icon icon="lucide:pen-tool"></iconify-icon>
                </button>
              </div>
            )}
            
            {order.status.name === "Accepted" && (
               <div className="space-y-4 border-t-[3px] pt-6 border-[#111] mt-6">
                 <button onClick={handleGenerateQuote} className="w-full bg-blue-500 text-white font-bold font-serif uppercase tracking-wider text-xl py-4 px-4 hover:bg-blue-600 transition-all brutalist-border brutalist-shadow transform rotate-1 hover:-translate-y-1">
                   Generate & Send Quote <iconify-icon icon="lucide:receipt"></iconify-icon>
                 </button>
                 <p className="text-xl font-serif font-bold text-[#111] text-center bg-white inline-block w-full px-4 py-2 brutalist-border mt-4">Customer will be prompted to pay ₹{finalPrice || '?'}</p>
               </div>
            )}
          </div>

          {/* Timeline Editor */}
          <div className="bg-white brutalist-border brutalist-shadow-lg p-8 relative transform -rotate-1">
             <div className="pushpin absolute -top-4 right-10"></div>
            <h2 className="text-3xl font-serif font-bold uppercase tracking-widest mb-6 text-[#111] bg-[var(--color-secondary)] inline-block px-4 py-2 brutalist-border">Timeline <iconify-icon icon="lucide:scissors"></iconify-icon></h2>
            
            <div className="space-y-8 mb-8 pl-6 border-l-[4px] border-[#111]">
              {order.timeline && order.timeline.map((event: any, i: number) => (
                <div key={event.id} className="relative">
                  <div className="absolute -left-[36px] top-1">
                     <div className="h-6 w-6 rounded-full bg-[var(--color-primary)] brutalist-border"></div>
                  </div>
                  <div className={`bg-[var(--color-surface)] p-6 brutalist-border brutalist-shadow-sm ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                    <p className="text-2xl font-bold font-serif uppercase tracking-wider text-[#111]">{event.status.name}</p>
                    <p className="text-sm font-serif font-bold uppercase tracking-wider text-[#111] bg-white inline-block px-2 py-0.5 brutalist-border mb-4 mt-2">{new Date(event.created_at).toLocaleString()}</p>
                    <p className="text-xl font-serif font-bold text-[#111] bg-white p-4 brutalist-border">{event.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-[3px] pt-6 border-[#111]">
              <label className="block text-2xl font-serif font-bold uppercase tracking-wider text-[#111] mb-4 bg-white inline-block px-4 py-2 brutalist-border transform rotate-1">Add Timeline Event</label>
              <textarea 
                value={timelineMsg}
                onChange={e => setTimelineMsg(e.target.value)}
                className="w-full bg-white brutalist-border focus:ring-4 focus:ring-[#111] focus:outline-none p-4 font-serif font-bold text-xl mb-6 transform -rotate-1 transition-all"
                rows={3}
                placeholder="e.g. Purchased yarn today!"
              ></textarea>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => handleUpdateStatus("In Progress", timelineMsg)} className="flex-1 bg-white text-[#111] brutalist-border text-lg font-bold font-serif uppercase tracking-wider py-4 px-4 hover:bg-[#111] hover:text-white brutalist-shadow transform rotate-1 hover:-translate-y-1 transition-all">
                  + Progress Note
                </button>
                <button onClick={() => handleUpdateStatus("Completed", timelineMsg)} className="flex-1 bg-green-400 text-[#111] brutalist-border text-lg font-bold font-serif uppercase tracking-wider py-4 px-4 hover:bg-green-500 brutalist-shadow transform -rotate-1 hover:-translate-y-1 transition-all">
                  Mark Completed <iconify-icon icon="lucide:check-circle"></iconify-icon>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </AdminShell>
  );
}
