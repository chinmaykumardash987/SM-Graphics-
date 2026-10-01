import { Star, Award, ShieldCheck, MapPin, Zap } from 'lucide-react';

export function TrustBar() {
  const highlights = [
    {
      icon: Star,
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-400/10 border-amber-400/20',
      title: '4.8 / 5 Rating',
      subtitle: 'Verified local client satisfaction'
    },
    {
      icon: Award,
      iconColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-400/10 border-cyan-400/20',
      title: 'High Quality Printing',
      subtitle: '1440 DPI true CMYK precision'
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-pink-400',
      badgeBg: 'bg-pink-400/10 border-pink-400/20',
      title: 'Professional Service',
      subtitle: 'Expert design check & finish'
    },
    {
      icon: MapPin,
      iconColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-400/10 border-emerald-400/20',
      title: 'Cuttack Based',
      subtitle: 'Menrva Complex, CDA Sector-9'
    }
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 ${
                  index > 0 ? 'pt-3 sm:pt-0 sm:pl-4 lg:pl-6' : ''
                }`}
              >
                <div className={`p-2.5 sm:p-3 rounded-xl border ${item.badgeBg} shrink-0`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 leading-tight mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
