import { Star, ShieldCheck, ThumbsUp, ArrowRight, MessageSquare, Phone } from 'lucide-react';

interface RatingSectionProps {
  onOpenContact: () => void;
}

export function RatingSection({ onOpenContact }: RatingSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-white relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle CMYK decorative dots */}
          <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-60">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-slate-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Rating Scorecard */}
            <div className="md:col-span-6 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Local Feedback</span>
              </div>

              <div className="flex items-baseline justify-center md:justify-start gap-3">
                <span className="text-5xl sm:text-6xl font-black font-heading text-white tracking-tight">
                  4.8
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-400 font-heading">
                  / 5
                </span>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 stroke-amber-400" />
                ))}
              </div>

              <div className="text-sm font-semibold text-slate-300">
                Customer Rating in Cuttack
              </div>

              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Evaluated across flex print quality, turnaround punctuality, paper stocks, and customer service.
              </p>
            </div>

            {/* Right Column: Experience CTA & Direct Contact */}
            <div className="md:col-span-6 bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-5">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-xl font-bold font-heading text-white">
                  Want to experience our service?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Join hundreds of satisfied business owners, shops, institutions, and individuals across Cuttack.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Contact SM Graphics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:9437390950"
                  className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Call Directly</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 text-center md:text-left">
                Local printing workshop located at Menrva Complex, CDA Sector-9, Cuttack.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
