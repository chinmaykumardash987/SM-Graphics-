import { useState } from 'react';
import { Eye, ShieldCheck, Sparkles, Info } from 'lucide-react';
import { portfolioItems, portfolioCategories, CategoryFilter, PortfolioItem } from '../data/portfolioData';
import { ImageModal } from './ImageModal';

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <span>Work & Capabilities</span>
            <span>·</span>
            <span>CDA Sector-9, Cuttack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading leading-tight">
            Our Printing Work & Demonstration Samples
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore authentic photos of our Cuttack workshop and printing press alongside demonstration designs
            showcasing available media substrates, resolution, and finishes.
          </p>
        </div>

        {/* Authenticity & Transparency Notice Bar */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <span className="font-bold text-white">Transparency & Authenticity Commitment:</span>
              <p className="text-slate-400 mt-0.5">
                Real shop & equipment photos are labeled <span className="text-emerald-400 font-semibold">Actual Facility Photo</span>. Conceptual templates are marked <span className="text-amber-400 font-semibold">Sample Design</span> or <span className="text-cyan-400 font-semibold">Demonstration Design</span>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800 text-[11px] font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Real Shop Photos
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-semibold text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Print Samples
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {portfolioCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-slate-600 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image with zoom on hover */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Badges on top */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  {/* Category Pill Tag */}
                  <span className="text-[11px] font-semibold text-cyan-300 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-800/60">
                    {item.category}
                  </span>

                  {/* Authenticity Badge */}
                  {item.isRealFacilityPhoto ? (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-700/80 flex items-center gap-1 shadow">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {item.badgeLabel}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-300 bg-slate-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-amber-700/60 flex items-center gap-1 shadow">
                      <Info className="w-3 h-3 text-amber-400" />
                      {item.badgeLabel}
                    </span>
                  )}
                </div>

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2 bg-slate-950">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors font-heading line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono truncate">
                  {item.specs}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Custom Job Prompt */}
        <div className="mt-14 text-center p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          <p>
            Have a custom size or specific material requirement? We support standard & custom dimensions for all flex
            signboards, visiting card paper stocks, and marketing brochures.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-cyan-400 font-semibold">
            <span>Direct workshop visits welcome at Menrva Complex, CDA Sector-9</span>
          </div>
        </div>
      </div>

      {/* Item Lightbox Modal */}
      <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
