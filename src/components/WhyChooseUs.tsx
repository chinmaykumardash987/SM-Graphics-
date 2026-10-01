import { Sparkles, Lightbulb, Layers, ShieldCheck, MapPin, HeartHandshake } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Sparkles,
      title: 'High-Quality Output',
      desc: 'Sharp colours, clear text and professional print quality with calibrated CMYK output.',
      accent: 'border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400',
      iconBg: 'bg-cyan-500/10'
    },
    {
      icon: Lightbulb,
      title: 'Creative Solutions',
      desc: 'Printing solutions designed to make your message stand out in crowded commercial streets.',
      accent: 'border-pink-500/30 text-pink-400 group-hover:border-pink-400',
      iconBg: 'bg-pink-500/10'
    },
    {
      icon: Layers,
      title: 'Wide Range of Services',
      desc: 'From high-speed digital printing to giant flex banners, hoarding frames, and business stationery.',
      accent: 'border-blue-500/30 text-blue-400 group-hover:border-blue-400',
      iconBg: 'bg-blue-500/10'
    },
    {
      icon: ShieldCheck,
      title: 'Professional Finish',
      desc: 'Attention to detail across every printed product: precise eyeletting, cutting, binding, and lamination.',
      accent: 'border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400',
      iconBg: 'bg-emerald-500/10'
    },
    {
      icon: MapPin,
      title: 'Local & Convenient',
      desc: 'Conveniently located in Menrva Complex, CDA Sector-9, Cuttack for fast pickup and rapid delivery.',
      accent: 'border-amber-500/30 text-amber-400 group-hover:border-amber-400',
      iconBg: 'bg-amber-500/10'
    },
    {
      icon: HeartHandshake,
      title: 'Customer Focused',
      desc: 'We focus on delivering reliable service, prompt communication, and satisfying custom requirements.',
      accent: 'border-purple-500/30 text-purple-400 group-hover:border-purple-400',
      iconBg: 'bg-purple-500/10'
    }
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle CMYK Accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <span>Competitive Advantage</span>
            <span>·</span>
            <span>Why SM Graphics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading leading-tight">
            Why Choose SM Graphics?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Delivering the perfect balance of print quality, rapid turnaround, and competitive local pricing for
            Cuttack businesses and events.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group p-6 sm:p-7 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${item.iconBg} ${item.accent} border transition-colors`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight font-heading group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
