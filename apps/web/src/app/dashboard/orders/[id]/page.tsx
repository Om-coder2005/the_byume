"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Script from 'next/script';

export default function CustomerOrderTimeline() {
  const params = useParams();
  const id = params.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  
  // Review State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewStory, setReviewStory] = useState('');
  const [reviewOccasion, setReviewOccasion] = useState('Personal / Home');
  const [reviewIsPublic, setReviewIsPublic] = useState(true);
  const [reviewIsAnonymous, setReviewIsAnonymous] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Payment state
  const [payments, setPayments] = useState<any[]>([]);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem('byume_token');
    if (t) {
      setToken(t);
      setIsAuthenticated(true);
      fetchOrder(t);
    } else {
      window.location.href = '/login';
    }
  }, [id]);

  const fetchOrder = async (token: string) => {
    try {
      const [orderRes, payRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/orders/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/payments/order/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      if (orderRes.ok) {
        setOrder(await orderRes.json());
      }
      if (payRes.ok) {
        setPayments(await payRes.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse space-y-8">
        <div className="h-40 bg-gray-200 rounded-2xl"></div>
        <div className="h-96 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen bg-[var(--color-background)] text-center py-20 relative">
       <div className="bg-[var(--color-surface)] p-12 brutalist-border brutalist-shadow-lg transform rotate-1 max-w-lg mx-auto relative inline-block">
         <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
        <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mt-4 mb-4">Order Not Found</h1>
        <a href="/dashboard" className="text-[var(--color-primary)] font-bold font-serif uppercase tracking-wider text-xl hover:bg-[#111] hover:text-white px-4 py-2 transition-all brutalist-border inline-block">&larr; Back to Dashboard</a>
      </div>
    </div>
  );

  const getStatusColor = (statusName: string) => {
    const colors: any = {
      'Draft': 'bg-gray-100 text-gray-800 border-gray-400',
      'Submitted': 'bg-blue-100 text-blue-800 border-blue-400',
      'Accepted': 'bg-green-100 text-green-800 border-green-400',
      'Crafting': 'bg-orange-100 text-orange-800 border-orange-400',
      'Shipped': 'bg-indigo-100 text-indigo-800 border-indigo-400',
      'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-400',
      'Awaiting Payment': 'bg-yellow-100 text-yellow-800 border-yellow-400',
      'In Production': 'bg-purple-100 text-purple-800 border-purple-400'
    };
    return colors[statusName] || 'bg-gray-100 text-gray-800 border-gray-400';
  };

  const handlePay = async (paymentId: number) => {
    setPaying(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/payments/razorpay-order/${paymentId}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to start payment");
      }
      const data = await res.json();

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Byume Studio",
        description: "Custom Order Payment",
        order_id: data.razorpay_order_id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/payments/verify-payment?payment_id=${paymentId}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}&razorpay_signature=${response.razorpay_signature}`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (verifyRes.ok) {
              alert("Payment successful! Your order is now in production.");
              fetchOrder(token);
            } else {
              alert("Payment verification failed.");
            }
          } catch (e) {
            alert("Error verifying payment.");
          }
        },
        theme: {
          color: "#d15656" // Byume primary color
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();

    } catch (err: any) {
      alert(err.message || "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  const submitReview = async () => {
    setReviewSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/reviews/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          order_id: order.id,
          rating: reviewRating,
          story: reviewStory,
          occasion: reviewOccasion,
          is_public: reviewIsPublic,
          is_anonymous: reviewIsAnonymous
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to submit review');
      }

      setReviewSuccess(true);
      setShowReviewForm(false);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />


      <main className="max-w-4xl mx-auto px-6 py-12 relative">
        <a href="/dashboard" className="font-note text-2xl text-gray-500 hover:text-[var(--color-primary)] mb-8 inline-flex items-center transition-colors">
          &larr; <span className="ml-2">Back to Dashboard</span>
        </a>

        {/* Order Header */}
        <div className="bg-[var(--color-tertiary-container)] brutalist-border p-8 mb-12 relative brutalist-shadow-lg transform -rotate-1">
          <div className="pushpin absolute -top-4 right-10"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="font-serif font-bold uppercase tracking-wider text-sm text-[#111] mb-1 bg-white px-2 py-0.5 inline-block brutalist-border">Order Summary</p>
              <h1 className="text-5xl font-serif font-bold uppercase tracking-widest text-[#111] mb-4 mt-2">{order.order_number}</h1>
              <span className={`px-4 py-1.5 font-serif font-bold uppercase tracking-wider text-sm brutalist-border transform rotate-2 inline-block ${getStatusColor(order.status.name).replace('border-', '')}`}>
                {order.status.name}
              </span>
            </div>
            
            <div className="bg-white p-6 brutalist-border transform rotate-2 min-w-[200px] brutalist-shadow relative">
               <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
               <p className="font-serif font-bold uppercase tracking-wider text-sm text-[#111] mb-1 mt-2">Final Price</p>
               <p className="text-3xl font-serif font-bold text-[var(--color-primary)]">{order.final_price ? `₹${order.final_price}` : 'Pending Quote'}</p>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 pt-6 border-t-[3px] border-[#111] grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 brutalist-border brutalist-shadow-sm transform rotate-1">
               <h3 className="font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-secondary)] inline-block px-2 py-1 border-[2px] border-[#111]">Your Request</h3>
               <p className="font-serif font-bold text-lg text-[#111] whitespace-pre-line mt-2">{order.notes}</p>
             </div>
             <div className="bg-white p-6 brutalist-border brutalist-shadow-sm transform -rotate-1">
                <h3 className="font-serif font-bold uppercase tracking-wider text-[#111] mb-2 bg-[var(--color-primary)] text-white inline-block px-2 py-1 border-[2px] border-[#111]">Logistics</h3>
                <p className="font-serif font-bold text-lg text-[#111] mt-2">Urgency: {order.priority || 'Standard'}</p>
                <p className="font-serif font-bold text-lg text-[#111]">Budget: {order.budget || 'Unspecified'}</p>
             </div>
          </div>
        </div>

        {/* Payment Section (If Awaiting Payment) */}
        {order.status.name === 'Awaiting Payment' && payments.find(p => p.status === 'Pending') && (
          <div className="bg-yellow-400 brutalist-border p-8 mb-12 text-center animate-fade-in relative transform rotate-1 brutalist-shadow-lg">
            <div className="pushpin absolute -top-4 right-1/2"></div>
            <h2 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-2 mt-4 bg-white inline-block px-4 py-2 brutalist-border transform -rotate-1">Quotation Ready!</h2>
            <p className="font-serif font-bold text-xl text-[#111] mb-6 max-w-lg mx-auto mt-4">Your artist has reviewed your request and provided a final price of <strong className="bg-white px-2 py-0.5 brutalist-border">₹{order.final_price}</strong>. Once paid, production will begin immediately. <iconify-icon icon="lucide:sparkles"></iconify-icon></p>
            <button 
              onClick={() => handlePay(payments.find(p => p.status === 'Pending').id)}
              disabled={paying}
              className="bg-[#111] text-yellow-400 px-8 py-4 font-serif font-bold uppercase tracking-wider text-xl hover:bg-white hover:text-[#111] transition-all disabled:opacity-50 w-full md:w-auto transform -rotate-2 brutalist-border brutalist-shadow hover:-translate-y-1"
            >
              {paying ? 'Processing...' : `Pay ₹${order.final_price} Securely`}
            </button>
            <p className="font-serif font-bold text-sm text-[#111] mt-6 uppercase tracking-wider bg-white inline-block px-2 py-1 brutalist-border">* This uses a secure mock payment gateway for testing.</p>
          </div>
        )}

        {/* Timeline Section */}
        <h2 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-8 pl-4 border-l-[6px] border-[var(--color-primary)]">Production Timeline</h2>
        <div className="bg-white brutalist-border p-8 brutalist-shadow-lg relative transform -rotate-1">
          <div className="pushpin absolute -top-4 right-1/4"></div>
          
          {order.timeline && order.timeline.length > 0 ? (
            <div className="relative border-l-[4px] border-[#111] ml-6 space-y-12 py-4">
              {/* Reverse timeline so newest is on top */}
              {[...order.timeline].reverse().map((event: any, index: number) => (
                <div key={event.id} className="relative pl-10 group">
                  {/* Timeline Dot */}
                  <div className={`absolute w-8 h-8 rounded-full border-[3px] border-[#111] -left-[18px] top-1 brutalist-shadow-sm flex items-center justify-center ${index === 0 ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-transparent'}`}>
                    {index === 0 && <span className="text-sm"><iconify-icon icon="lucide:scissors"></iconify-icon></span>}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                    <h3 className={`text-2xl font-serif font-bold uppercase tracking-wider ${index === 0 ? 'text-[var(--color-primary)]' : 'text-[#111]'}`}>
                      {event.status.name}
                    </h3>
                    <span className="font-serif font-bold text-sm uppercase tracking-wider text-[#111] transform rotate-1 bg-[var(--color-surface-dim)] px-2 py-1 brutalist-border">
                      {new Date(event.created_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className={`p-6 brutalist-border transform transition-transform group-hover:rotate-1 group-hover:-translate-y-1 ${index === 0 ? 'bg-[var(--color-primary-container)] brutalist-shadow border-[3px] border-[#111]' : 'bg-white rotate-1 brutalist-shadow-sm'}`}>
                    <p className="font-serif font-bold text-xl text-[#111]">{event.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <p className="font-serif font-bold uppercase tracking-wider text-xl text-[#111] text-center py-8">Your timeline hasn't started yet. Grab a coffee! <iconify-icon icon="lucide:coffee"></iconify-icon></p>
          )}

        </div>

        {/* Feedback Section */}
        {order.status.name === 'Completed' && (
          <div className="mt-16 mb-20 relative">
            
            {!showReviewForm && !reviewSuccess && (
              <div className="bg-[var(--color-secondary)] brutalist-border p-12 text-center brutalist-shadow-lg transform rotate-1 relative">
                 <div className="pushpin absolute -top-4 left-10 transform -rotate-12 z-20"></div>
                 <h2 className="text-5xl font-serif font-bold uppercase tracking-widest text-[#111] mb-6 bg-white inline-block px-4 py-2 brutalist-border transform -rotate-1">Share Your Story</h2>
                 <p className="font-serif font-bold text-xl text-[#111] mb-10 max-w-lg mx-auto bg-white p-4 brutalist-border">Every handmade piece has a story. Did it bring a smile to someone's face? We'd love to hear how your creation fit into your life. <iconify-icon icon="lucide:flower"></iconify-icon></p>
                 <button 
                   onClick={() => setShowReviewForm(true)}
                   className="bg-white text-[#111] px-10 py-4 font-serif font-bold uppercase tracking-wider text-xl hover:bg-[#111] hover:text-white transition-all transform -rotate-2 brutalist-border brutalist-shadow hover:-translate-y-1"
                 >
                   Leave a Review
                 </button>
              </div>
            )}

            {reviewSuccess && (
              <div className="bg-green-400 brutalist-border p-12 text-center animate-fade-in relative transform -rotate-1 brutalist-shadow-lg">
                 <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
                 <div className="w-20 h-20 bg-[#111] text-green-400 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 mt-2 transform rotate-12 brutalist-border"><iconify-icon icon="lucide:sparkles"></iconify-icon></div>
                 <h2 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111] mb-4 bg-white inline-block px-4 py-2 brutalist-border">Thank you for sharing!</h2>
                 <p className="font-serif font-bold text-xl text-[#111] bg-white p-4 brutalist-border inline-block mt-4">Your story has been safely received and may be featured in our community showcase soon.</p>
              </div>
            )}

            {showReviewForm && !reviewSuccess && (
              <div className="bg-white brutalist-border p-10 animate-fade-in relative transform rotate-1 brutalist-shadow-xl">
                <div className="flex justify-between items-center mb-8 border-b-[3px] border-[#111] pb-6">
                  <h2 className="text-4xl font-serif font-bold uppercase tracking-widest text-[#111]">Write a Review</h2>
                  <button onClick={() => setShowReviewForm(false)} className="text-[#111] hover:text-red-500 font-bold text-4xl leading-none">&times;</button>
                </div>

                <div className="space-y-8">
                  <div className="bg-[var(--color-tertiary-container)] p-6 brutalist-border transform -rotate-1 brutalist-shadow-sm">
                    <label className="block font-serif text-xl font-bold uppercase tracking-wider text-[#111] mb-4">Overall Rating</label>
                    <div className="flex gap-4">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} 
                          onClick={() => setReviewRating(star)}
                          className={`text-5xl transition-transform transform hover:-translate-y-1 ${reviewRating >= star ? 'text-[var(--color-primary)]' : 'text-gray-300'}`}
                        >
                          <i className={reviewRating >= star ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-serif text-xl font-bold uppercase tracking-wider text-[#111] mb-2">Your Story</label>
                    <textarea 
                      rows={4}
                      value={reviewStory}
                      onChange={e => setReviewStory(e.target.value)}
                      placeholder="Tell us about the occasion, the reaction, or how it looks in your space..."
                      className="w-full bg-white px-4 py-3 text-xl font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all placeholder:font-sans placeholder:font-normal"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block font-serif text-xl font-bold uppercase tracking-wider text-[#111] mb-2">Occasion</label>
                    <select 
                      value={reviewOccasion}
                      onChange={e => setReviewOccasion(e.target.value)}
                      className="w-full bg-white px-4 py-3 text-xl font-serif font-bold brutalist-border focus:outline-none focus:ring-4 focus:ring-[#111] transition-all cursor-pointer appearance-none"
                    >
                      <option>Personal / Home</option>
                      <option>Birthday</option>
                      <option>Wedding / Anniversary</option>
                      <option>Holiday Gift</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="bg-[var(--color-surface-dim)] p-6 brutalist-border space-y-4 transform rotate-1 brutalist-shadow-sm">
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input type="checkbox" checked={reviewIsPublic} onChange={e => setReviewIsPublic(e.target.checked)} className="w-8 h-8 accent-[var(--color-primary)] cursor-pointer brutalist-border" />
                      <span className="font-serif font-bold text-xl text-[#111]">Allow this review to be public on the community showcase</span>
                    </label>
                    <label className="flex items-center gap-4 cursor-pointer mt-4">
                      <input type="checkbox" checked={reviewIsAnonymous} onChange={e => setReviewIsAnonymous(e.target.checked)} className="w-8 h-8 accent-[var(--color-primary)] cursor-pointer brutalist-border" />
                      <span className="font-serif font-bold text-xl text-[#111]">Hide my name (post anonymously)</span>
                    </label>
                  </div>

                  <div className="pt-8 border-t-[3px] border-[#111] flex justify-end">
                    <button 
                      onClick={submitReview}
                      disabled={reviewSubmitting || !reviewStory.trim()}
                      className="bg-[#111] text-white px-10 py-4 font-serif font-bold uppercase tracking-widest text-xl hover:bg-[var(--color-primary)] transition-all disabled:opacity-50 transform rotate-2 brutalist-border brutalist-shadow hover:-translate-y-1 flex items-center gap-2"
                    >
                      {reviewSubmitting ? 'Pinning it...' : <>Submit Story <iconify-icon icon="lucide:pin"></iconify-icon></>}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
