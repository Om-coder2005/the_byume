import React from 'react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
}

interface SpiralSidebarProps {
  title: string;
  items: SidebarItem[];
  bottomWidget?: React.ReactNode;
}

export default function SpiralSidebar({ title, items, bottomWidget }: SpiralSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0 relative hidden lg:block h-full py-6 pl-6 z-20">
      <div className="bg-[var(--color-surface)] brutalist-border brutalist-shadow-lg p-6 relative h-full flex flex-col">
        {/* Spiral Binding simulation */}
        <div className="spiral-binding absolute top-0 bottom-0 -left-3 w-6 flex flex-col justify-evenly"></div>
        
        <div className="pl-4 flex flex-col h-full">
          <div className="pushpin absolute -top-4 right-4"></div>
          <div className="mb-4 bg-[#F9E5DA] p-2 brutalist-border brutalist-shadow-sm h-24 w-48 relative transform -rotate-2 hover:rotate-0 transition-transform flex items-center justify-center">
            <img src="/images/logo-wide.png" alt="The Byume Logo" className="object-contain w-full h-full drop-shadow-md" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#111] mb-6 brutalist-border-b-4 border-[#111] pb-2 border-b-[3px] uppercase tracking-wider">{title}</h2>
          
          <nav className="space-y-4 font-serif text-lg font-bold flex-1 mt-4">
            {items.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 brutalist-border brutalist-shadow-sm transition-all hover:-translate-y-1 ${
                  item.active 
                    ? 'bg-[var(--color-primary)]' 
                    : 'bg-white hover:bg-[var(--color-primary-container)]'
                }`}
              >
                <span className="text-2xl flex items-center">{item.icon}</span>
                <span>{item.name}</span>
                
                {item.count !== undefined && (
                  <span className="bg-white brutalist-border text-[#111] text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center ml-auto font-mono">
                    {item.count}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Bottom Widget */}
          {bottomWidget && (
            <div className="mt-auto pt-8 relative">
               {bottomWidget}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
