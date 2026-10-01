import { Award, Compass, Zap, MapPin, CheckCircle } from 'lucide-react';
import workshopImg from '../assets/images/cuttack_studio_workshop_1790824922488.jpg';

export function About() {
  const pillars = [
    {
      title: 'Quality',
      desc: 'High-density pigment inks, calibrated colour accuracy, and resilient tear-proof materials.',
      color: 'text-cyan-500'
    },
    {
      title: 'Creativity',
      desc: 'Expert pre-press layout assistance, font formatting, and eye-catching visual composition.',
      color: 'text-pink-500'
    },
    {
      title: 'Reliability',
      desc: 'Committed turnarounds for business launches, exhibitions, corporate conferences, and personal events.',
      color: 'text-amber-500'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
              <img
                src={workshopImg}
                alt="SM Graphics Printing Studio Production at CDA Sector-9 Cuttack"
                className="w-full h-[380px] sm:h-[450px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-heading">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Menrva Complex, CDA Sector-9
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Central printing hub serving Cuttack & coastal Odisha
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold text-xs">
                    EST. LOCAL HUB
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative CMYK Accent Bar on Side */}
            <div className="hidden sm:flex absolute -left-3 top-10 bottom-10 w-2 rounded-full flex-col overflow-hidden shadow-sm">
              <div className="flex-1 bg-cyan-400" />
              <div className="flex-1 bg-pink-500" />
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-slate-900" />
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-600">
                <span>About SM Graphics</span>
                <span>·</span>
                <span>Our Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                Your Local Printing Partner in Cuttack
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              SM Graphics provides professional printing and visual communication solutions for businesses,
              organizations, events and individuals.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From everyday digital printing to eye-catching flex banners and professional commercial stationery, our
              goal is simple — deliver quality prints that represent your ideas and brand professionally. We combine
              high-grade industrial roll printing with modern digital reproduction so every job arrives sharp,
              durable, and color-accurate.
            </p>

            {/* Three Pillars: Quality • Creativity • Reliability */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Core Core Commitments
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                    <div className={`text-base font-bold font-heading ${pillar.color}`}>
                      {pillar.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Advantages */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>On-site Inspection & Proofing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Bulk Commercial Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Express Turnaround Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
