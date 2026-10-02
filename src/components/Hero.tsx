import { ArrowRight, Phone, MessageSquare, CheckCircle2, Sparkles, MapPin, Printer, Calendar } from 'lucide-react';
import heroPressImg from '../assets/images/hero_printing_facility_1790824873591.jpg';
import smLogoImg from '../assets/images/sm_graphics_logo_1790931105985.jpg';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onOpenBookingModal: () => void;
}

export function Hero({ onOpenQuoteModal, onOpenBookingModal }: HeroProps) {
  const whatsappUrl = `https://wa.me/919437390950?text=${encodeURIComponent(
    'Hello SM Graphics, I would like to enquire about your printing services.'
  )}`;

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-slate-950 text-white overflow-hidden">
      {/* Subtle Background Glows matching CMYK Palette */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2"
        aria-hidden="true"
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Distinction tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-300 font-semibold">CDA Sector-9, Cuttack</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">Flex & Digital Printing Specialists</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] font-heading text-white">
                YOUR VISION.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-500 bg-clip-text text-transparent">
                  WE PRINT IT.
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl font-semibold text-slate-200 leading-snug">
              Premium Digital Printing, Flex Banners, Signage & Commercial Stationery in Cuttack.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              From vibrant banners to professional business stationery, SM Graphics delivers high-quality printing
              solutions designed to make your brand stand out. Trusted by businesses, retail shops, institutions, and
              event organizers across Odisha.
            </p>

            {/* Feature quick checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1440 DPI High Resolution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Weatherproof Flex Media</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Same-Day Fast Turnaround</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenBookingModal}
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 transition-all rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 active:scale-95 transition-all rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <a
                href="tel:9437390950"
                className="px-4 py-3.5 text-sm sm:text-base font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 active:scale-95 transition-all rounded-xl flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Call:</span>
                <span className="font-mono">9437390950</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-sm sm:text-base font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 active:scale-95 transition-all rounded-xl flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Address micro-indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Menrva Complex, CDA Sector-9, Cuttack, Odisha – 753014</span>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
                <img
                  src={heroPressImg}
                  alt="SM Graphics Modern Flex and Digital Printing Facility"
                  className="w-full h-80 sm:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating CMYK Ink Gauge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-[11px] font-mono text-slate-200 flex items-center gap-2 shadow-lg">
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>PRODUCTION STUDIO</span>
                  </div>

                  {/* CMYK Marks */}
                  <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-700/80 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" title="Cyan (C)" />
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500" title="Magenta (M)" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" title="Yellow (Y)" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-600" title="Key/Black (K)" />
                  </div>
                </div>

                {/* Bottom Details Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> High-Definition Precision
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      Active Studio
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Equipped for roll-to-roll flex banners, crisp multi-colour digital runs, signboards & die-cut stationery.
                  </p>
                </div>
              </div>

              {/* Floating Stat Pill on Desktop */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3.5 rounded-xl shadow-xl items-center gap-3">
                <img
                  src={smLogoImg}
                  alt="SM Graphics Official Logo"
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/70 shadow-md shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>SM Graphics Cuttack</span>
                    <span className="text-amber-400 font-bold">4.8★</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Flex & Digital Print Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
