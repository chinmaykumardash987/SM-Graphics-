import { Building2, Store, Calendar, GraduationCap, Megaphone, HeartHandshake, ArrowRight } from 'lucide-react';

interface ApplicationsProps {
  onSelectApplication: (purpose: string) => void;
}

export function Applications({ onSelectApplication }: ApplicationsProps) {
  const applications = [
    {
      icon: Building2,
      title: 'Businesses & Corporates',
      desc: 'Visiting cards, branded letterheads, presentation folders, employee badges & corporate envelopes.',
      accent: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      icon: Store,
      title: 'Shops & Retail Outlets',
      desc: 'Storefront flex boards, product price banners, sale hoardings, promotional standees & wall graphics.',
      accent: 'text-cyan-600 bg-cyan-50 border-cyan-200'
    },
    {
      icon: Calendar,
      title: 'Events & Exhibitions',
      desc: 'Stage backdrops, registration booth banners, delegate badges, directional signs & pull-up standees.',
      accent: 'text-pink-600 bg-pink-50 border-pink-200'
    },
    {
      icon: GraduationCap,
      title: 'Schools & Institutions',
      desc: 'Academic prospectuses, student ID cards, annual day banners, achievement certificates & posters.',
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      icon: Megaphone,
      title: 'Commercial Promotions',
      desc: 'High-visibility hoardings, roadshow flex banners, marketing flyers, pamphlets & newspaper inserts.',
      accent: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      icon: HeartHandshake,
      title: 'Personal Occasions',
      desc: 'Luxury wedding invitation cards, birthday stage backdrops, anniversary banners & custom greetings.',
      accent: 'text-purple-600 bg-purple-50 border-purple-200'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-600">
            <span>Versatile Solutions</span>
            <span>·</span>
            <span>Tailored By Sector</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Printing for Every Purpose
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you are launching a storefront in Cuttack, organizing a corporate summit, or celebrating a family
            milestone, we produce prints crafted for your distinct use case.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.title}
                onClick={() => onSelectApplication(app.title)}
                className="group p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${app.accent} border flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading group-hover:text-blue-600 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>Enquire for {app.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
