import React from 'react';
import { fetchCategories, fetchGalleryItems, fetchReviews } from '@/lib/api';

export default async function Home() {
  let categories = [];
  let galleryItems = [];
  let reviews = [];
  try {
    const [cats, items, revs] = await Promise.all([
      fetchCategories(),
      fetchGalleryItems(),
      fetchReviews(true)
    ]);
    categories = cats;
    galleryItems = items.slice(0, 8); // Grab up to 8
    reviews = revs;
  } catch (error) {
    console.error("Failed to load data:", error);
  }

  const colors = [
    "bg-[var(--color-primary-container)]",
    "bg-[var(--color-secondary-container)]",
    "bg-[var(--color-tertiary-container)]"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex justify-center py-12 px-4 sm:px-8">
      {/* Background doodles/texture handled by body background */}

      {/* Main Scrapbook Container */}
      <div className="w-full bg-[var(--color-background)] relative brutalist-border brutalist-shadow-lg">
        {/* Fake window top border */}
        <div className="h-8 bg-[#111] w-full border-b-[3px] border-[#111] flex justify-start items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#111]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#111]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#111]"></div>
        </div>

        <div className="flex flex-col md:flex-row min-h-screen">

          {/* Main Content Area */}
          <main className="flex-1 p-8 bg-[var(--color-surface)] relative overflow-hidden pb-32">
            
            {/* Scrapbook Hero Section */}
            <div className="max-w-6xl mx-auto mt-6 relative flex flex-col lg:flex-row items-center gap-12">
              
              {/* Left Column: Typography & CTA */}
              <div className="flex-1 relative z-10 p-8">
                {/* Tagline */}
                <div className="inline-block bg-[var(--color-primary-container)] px-4 py-2 text-[#111] font-serif text-sm font-bold tracking-wider uppercase mb-6 brutalist-border brutalist-shadow-sm transform rotate-[-2deg]">
                   <span className="text-black mr-2"><iconify-icon icon="lucide:flower"></iconify-icon></span>
                   Handmade is Happiness
                   <span className="text-black ml-2"><iconify-icon icon="lucide:flower"></iconify-icon></span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-serif text-[#111] font-bold leading-tight mb-4 tracking-tighter">
                  Every Piece, <br/>
                  Made with <span className="bg-[#111] text-white px-2 py-1 transform -rotate-1 inline-block brutalist-shadow-sm hover:rotate-0 transition-transform">Love</span>
                </h1>
                
                <p className="font-serif text-[#111] font-bold text-lg lg:text-xl mb-10 max-w-md bg-[var(--color-tertiary)] px-3 py-2 brutalist-border brutalist-shadow-sm transform rotate-1">
                  Custom crochet, pipe cleaner flowers, keychains & more – handcrafted just for you.
                </p>

                <div className="flex flex-wrap gap-6 mb-12">
                  <a href="/gallery" className="bg-[var(--color-primary)] text-white font-serif font-bold text-xl px-8 py-3 brutalist-border brutalist-shadow hover:bg-black transition-all flex items-center gap-2 transform -rotate-1 hover:translate-y-1">
                    Shop Collection <iconify-icon icon="lucide:arrow-right" class="text-2xl"></iconify-icon>
                  </a>
                  <a href="/custom-order" className="bg-[var(--color-secondary)] text-[#111] font-serif font-bold text-xl px-8 py-3 brutalist-border brutalist-shadow hover:bg-[#111] hover:text-white transition-all flex items-center gap-2 transform rotate-1 hover:translate-y-1">
                    Custom Order <iconify-icon icon="lucide:sparkles" class="text-2xl"></iconify-icon>
                  </a>
                </div>

                {/* Features Row */}
                <div className="flex flex-wrap gap-8 font-serif font-bold text-[#111] text-lg brutalist-border-t-4 border-t-[3px] border-[#111] pt-6">
                  <div className="flex items-center gap-3 bg-white px-3 py-2 brutalist-border brutalist-shadow-sm">
                    <span className="text-3xl text-black"><iconify-icon icon="lucide:scissors"></iconify-icon></span>
                    <span>Handmade <br/>with love</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[var(--color-secondary)] px-3 py-2 brutalist-border brutalist-shadow-sm">
                    <span className="text-3xl text-black"><iconify-icon icon="lucide:leaf"></iconify-icon></span>
                    <span>Eco-friendly <br/>materials</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[var(--color-tertiary-container)] px-3 py-2 brutalist-border brutalist-shadow-sm">
                    <span className="text-3xl text-black"><iconify-icon icon="lucide:gift"></iconify-icon></span>
                    <span>Perfect for <br/>every occasion</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Polaroids & Scrapbook Elements */}
              <div className="flex-1 relative min-h-[500px] w-full mt-12 lg:mt-0">
                {/* Yarn Ball Illustration / Graphic */}
                <div className="absolute -bottom-10 -left-10 text-[#111] text-6xl opacity-10 transform rotate-12 z-0">
                  <iconify-icon icon="lucide:gem"></iconify-icon>
                </div>

                {/* Main Polaroid (Cat) */}
                <div className="absolute top-10 left-0 lg:left-10 w-72 p-4 pb-20 bg-white brutalist-border brutalist-shadow-lg transform rotate-[-4deg] z-20 transition-all hover:scale-105 hover:-translate-y-2 hover:rotate-[-2deg] hover:z-50">
                  <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 transform -rotate-2"></div>
                  <div className="bg-[#111] w-full aspect-square mb-4 overflow-hidden brutalist-border">
                    <img src="/images/cat.webp" alt="Crochet Cat" className="w-full h-full object-cover" />
                  </div>
                  <p className="absolute bottom-5 left-0 right-0 font-serif font-bold text-2xl text-center text-[#111] uppercase tracking-widest bg-[var(--color-secondary)] mx-4 py-2 brutalist-border">Purrfect</p>
                </div>

                {/* Top Right Polaroid (Tulips) */}
                <div className="absolute -top-10 right-20 lg:right-10 w-56 p-3 pb-16 bg-white brutalist-border brutalist-shadow-lg transform rotate-[6deg] z-10 transition-all hover:scale-110 hover:-translate-y-2 hover:rotate-[4deg] hover:z-50">
                  <div className="pushpin absolute -top-4 right-10"></div>
                  <div className="bg-[#111] w-full aspect-square mb-3 overflow-hidden brutalist-border">
                    <img src="/images/tulips.webp" alt="Crochet Tulips" className="w-full h-full object-cover" />
                  </div>
                  <p className="absolute bottom-4 left-0 right-0 font-serif font-bold text-xl text-center text-[#111] uppercase tracking-wider bg-[var(--color-primary-container)] mx-3 py-1.5 brutalist-border">For you <iconify-icon icon="lucide:flower"></iconify-icon></p>
                </div>

                {/* Bottom Right Polaroid (Keychain) */}
                <div className="absolute bottom-4 right-4 lg:-right-4 w-64 p-4 pb-16 bg-white brutalist-border brutalist-shadow-xl transform rotate-[-8deg] z-30 transition-all hover:scale-105 hover:-translate-y-2 hover:rotate-[-4deg] hover:z-50">
                  <div className="pushpin absolute -top-4 left-1/2 -translate-x-1/2"></div>
                  <div className="bg-[#111] w-full aspect-square mb-3 overflow-hidden brutalist-border">
                    <img src="/images/keychain.webp" alt="Crochet Keychain" className="w-full h-full object-cover" />
                  </div>
                  <p className="absolute bottom-3 left-0 right-0 font-serif font-bold text-lg text-center text-[#111] uppercase tracking-tighter bg-[var(--color-tertiary-container)] mx-4 py-1.5 brutalist-border leading-tight">little things<br/>big smiles</p>
                </div>

                {/* Sticky Note */}
                <div className="absolute top-32 -right-12 lg:-right-24 w-56 h-56 bg-blue-300 brutalist-shadow-lg p-6 transform rotate-[12deg] brutalist-border z-0 flex items-center justify-center text-center transition-all hover:z-50 hover:scale-105 hover:-translate-y-2 hover:rotate-[6deg]">
                  <p className="font-serif font-bold text-3xl text-[#111] uppercase tracking-widest leading-tight bg-white p-3 brutalist-border transform -rotate-2">Crafted<br/>with<br/>Love.</p>
                </div>
              </div>

            </div>

            {/* Bottom Lavender Ribbon */}
            <div className="absolute bottom-0 left-0 w-full bg-[var(--color-primary)] brutalist-border-t-4 border-t-[3px] border-[#111] p-4 flex flex-wrap justify-between items-center z-40">
              
              {/* Trust Badge */}
              <div className="bg-white brutalist-border brutalist-shadow px-6 py-2 transform -translate-y-6 flex items-center gap-4 relative">
                 <div className="pushpin absolute -top-4 right-2 transform rotate-45"></div>
                 <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] brutalist-border z-30"></div>
                    <div className="w-8 h-8 rounded-full bg-[var(--color-tertiary)] brutalist-border z-20"></div>
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary-container)] brutalist-border z-10"></div>
                 </div>
                 <div className="font-serif font-bold text-lg text-[#111] uppercase tracking-wider">Loved by <br/><span className="text-xl bg-[#111] text-white px-2 py-0.5">5000+</span><br/>customers</div>
              </div>

              {/* Rating */}
              <div className="text-center font-serif font-bold text-lg text-[#111] bg-white px-4 py-2 brutalist-border brutalist-shadow-sm transform rotate-1">
                <div className="flex text-[#111] justify-center text-xl mb-1 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <iconify-icon key={i} icon="lucide:star" class="fill-current"></iconify-icon>
                  ))}
                </div>
                4.9 (2.3K REVIEWS)
              </div>

              {/* Badges */}
              <div className="flex gap-8 font-serif font-bold text-lg text-white">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-black"><iconify-icon icon="lucide:lock"></iconify-icon></span>
                  <span>Secure <br/>Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-black"><iconify-icon icon="lucide:credit-card"></iconify-icon></span>
                  <span>Easy & Safe <br/>Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-black"><iconify-icon icon="lucide:globe"></iconify-icon></span>
                  <span>Worldwide <br/>Shipping</span>
                </div>
              </div>
            </div>

            {/* Recent Creations Section */}
            <div className="mt-32 max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className="text-3xl"><iconify-icon icon="lucide:scissors"></iconify-icon></span>
                <h3 className="text-4xl font-serif text-white bg-[#111] px-4 py-2 brutalist-shadow font-bold uppercase tracking-widest">Recent Creations</h3>
                <span className="text-3xl"><iconify-icon icon="lucide:flower"></iconify-icon></span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {galleryItems.map((item: any, idx: number) => (
                  <a href={`/gallery/${item.id}`} key={idx} className="block group relative">
                    <div className="bg-white p-3 pb-4 brutalist-border brutalist-shadow transform transition-transform hover:-translate-y-2 hover:rotate-1">
                      <div className="aspect-square overflow-hidden mb-3 bg-[#111] brutalist-border">
                        <img src={`https://images.unsplash.com/photo-1606907568153-9b9776d338a0?q=80&w=400&auto=format&fit=crop&sig=${item.id}`} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex justify-between items-center px-1">
                        <span className="font-serif font-bold text-sm text-[#111] uppercase tracking-wide truncate pr-2">{item.title}</span>
                        <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white brutalist-border flex shrink-0 items-center justify-center text-sm font-bold group-hover:bg-[#111] transition-colors"><iconify-icon icon="lucide:arrow-right"></iconify-icon></span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Customer Love */}
            <div className="mt-20 max-w-5xl mx-auto flex flex-col items-center pb-20">
              <h3 className="text-4xl font-serif font-bold mb-10 flex items-center gap-2 bg-[var(--color-secondary)] px-4 py-2 brutalist-border brutalist-shadow uppercase tracking-widest text-[#111]">
                Customer Stories <span className="text-white bg-[#111] rounded-full p-1 w-10 h-10 flex items-center justify-center brutalist-border ml-2"><iconify-icon icon="lucide:heart"></iconify-icon></span>
              </h3>
              <div className="flex gap-6 overflow-x-auto w-full pb-8 hide-scrollbar px-4 justify-center">
                 {reviews.length > 0 ? reviews.slice(0,5).map((rev: any, idx: number) => (
                   <div key={idx} className="min-w-[250px] max-w-[300px] shrink-0 bg-[var(--color-primary-container)] p-6 brutalist-border brutalist-shadow relative transform rotate-1">
                     <div className="flex text-[#111] text-lg mb-4 justify-center gap-1">
                       {[...Array(5)].map((_, i) => (
                         <iconify-icon key={i} icon={i < rev.rating ? "lucide:star" : "lucide:star"} class={i < rev.rating ? "fill-current" : ""}></iconify-icon>
                       ))}
                     </div>
                     <p className="font-serif text-[#111] font-bold text-lg mb-6 leading-relaxed bg-white p-3 brutalist-border">"{rev.story}"</p>
                     <p className="font-serif font-bold text-[#111] text-xl uppercase tracking-wider">- {rev.customer?.first_name || 'Anonymous'}</p>
                   </div>
                 )) : (
                   <div className="bg-white p-6 brutalist-border brutalist-shadow transform -rotate-1 relative">
                     <div className="pushpin absolute -top-4 right-4"></div>
                     <p className="font-serif font-bold text-[#111] uppercase tracking-wider text-xl">No stories pinned yet! Be the first!</p>
                   </div>
                 )}
              </div>
            </div>
          </main>
        </div>


        {/* Brutalist Footer */}
        <footer className="w-full bg-[#111] px-10 py-12 border-t-[3px] border-[#111] flex flex-col sm:flex-row justify-between items-center text-white z-10 relative brutalist-border-t-4">
          <div className="flex items-center gap-4 mb-8 sm:mb-0">
             <span className="text-3xl text-[var(--color-primary)]"><iconify-icon icon="lucide:cat"></iconify-icon></span>
             <span className="font-serif text-2xl font-bold tracking-widest uppercase bg-white text-[#111] px-3 py-1 transform rotate-1 brutalist-border">Handmade with love</span>
          </div>
          
          <div className="flex gap-16 text-sm font-serif font-bold uppercase tracking-wide">
             <div className="flex flex-col gap-3">
               <span className="text-[var(--color-primary)] text-lg mb-2">Shop</span>
               <a href="/gallery" className="hover:text-[var(--color-secondary)] transition-colors">All Collections</a>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Best Sellers</a>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">New Arrivals</a>
             </div>
             <div className="flex flex-col gap-3">
               <span className="text-[var(--color-primary)] text-lg mb-2">Help</span>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Track Order</a>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Shipping</a>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Returns</a>
             </div>
             <div className="flex flex-col gap-3">
               <span className="text-[var(--color-primary)] text-lg mb-2">About</span>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Our Story</a>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Careers</a>
               <a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Contact Us</a>
             </div>
          </div>
          
          <div className="mt-8 sm:mt-0 text-center sm:text-right">
             <span className="font-serif font-bold text-[var(--color-tertiary)] text-xl mb-4 block uppercase tracking-widest">Let's be friends!</span>
             <div className="flex gap-4 justify-end text-3xl">
               <a href="#" className="text-white hover:text-[var(--color-secondary)] hover:-translate-y-1 transition-all"><iconify-icon icon="lucide:camera"></iconify-icon></a>
               <a href="#" className="text-white hover:text-[var(--color-primary)] hover:-translate-y-1 transition-all"><iconify-icon icon="lucide:pin"></iconify-icon></a>
               <a href="#" className="text-white hover:text-[var(--color-tertiary)] hover:-translate-y-1 transition-all"><iconify-icon icon="lucide:message-circle"></iconify-icon></a>
               <a href="#" className="text-white hover:text-[#ff5f56] hover:-translate-y-1 transition-all"><iconify-icon icon="lucide:mail"></iconify-icon></a>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
