import { Printer, Megaphone, CreditCard, ArrowRight, Check } from 'lucide-react';
import digitalImg from '../assets/images/digital_printing_sample_1790824885908.jpg';
import flexImg from '../assets/images/flex_banner_signage_1790824898075.jpg';
import stationeryImg from '../assets/images/stationery_mockup_1790824909500.jpg';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onBookAppointment?: (serviceName: string) => void;
}

export function Services({ onSelectService, onBookAppointment }: ServicesProps) {
  const services = [
    {
      id: 'digital-printing',
      icon: Printer,
      title: 'Digital Printing',
      description: 'High-quality colour and black & white printing with sharp details and professional finishing.',
      image: digitalImg,
      items: [
        'High-Impact Colour Printing',
        'High-Speed B&W Printing',
        'Ultra-Sharp 1440 DPI Output',
        'Professional Lamination & Finishing'
      ],
      ctaText: 'Enquire Now',
      accentColor: 'from-cyan-500 to-blue-600',
      tagColor: 'text-cyan-600 bg-cyan-50 border-cyan-200'
    },
    {
      id: 'signage-banners',
      icon: Megaphone,
      title: 'Signage & Banners',
      description: 'Make your brand impossible to miss with vibrant flex banners, hoardings and display advertising solutions.',
      image: flexImg,
      items: [
        'Vibrant Flex Banners (Normal & Star)',
        'Roadside & Rooftop Hoardings',
        'Commercial Display Advertising',
        'Outdoor Promotional Signage & Standees'
      ],
      ctaText: 'Get a Quote',
      accentColor: 'from-blue-600 to-indigo-700',
      tagColor: 'text-blue-600 bg-blue-50 border-blue-200',
      popular: true
    },
    {
      id: 'commercial-stationery',
      icon: CreditCard,
      title: 'Commercial Stationery',
      description: 'Professional printed materials that give your business a polished and memorable identity.',
      image: stationeryImg,
      items: [
        'Executive Visiting Cards (Matte & Gloss)',
        'Official Corporate Letterheads',
        'Product & Marketing Brochures',
        'Custom Wedding & Event Invitations'
      ],
      ctaText: 'Start Your Order',
      accentColor: 'from-pink-500 to-purple-600',
      tagColor: 'text-pink-600 bg-pink-50 border-pink-200'
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span>Specialized Capabilities</span>
            <span>·</span>
            <span>Cuttack, Odisha</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Printing Solutions That Make You Stand Out
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From everyday printing to large-format advertising, we provide professional printing solutions for
            businesses, events and individuals.
          </p>
        </div>

        {/* 3 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`group flex flex-col bg-white rounded-2xl border ${
                  service.popular ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/20' : 'border-slate-200 shadow-md hover:shadow-xl'
                } overflow-hidden transition-all duration-300 hover:-translate-y-1.5`}
              >
                {/* Card Media Preview */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Icon badge floating */}
                  <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md text-white border border-slate-700 shadow-lg">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  {service.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      Most Requested
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm font-heading">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Included Solutions:
                      </div>
                      <ul className="space-y-2.5">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card CTA Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white cursor-pointer active:scale-98 shadow-sm"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {onBookAppointment && (
                      <button
                        onClick={() => onBookAppointment(service.title)}
                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-cyan-600 hover:text-cyan-700 bg-cyan-50 hover:bg-cyan-100/70 border border-cyan-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Schedule Workshop Consultation</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Order Strip Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
              Need urgent printing in Cuttack today?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Direct workshop pickup at CDA Sector-9 or immediate dispatch across Cuttack & Bhubaneswar.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:9437390950"
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md"
            >
              Call 9437390950
            </a>
            <a
              href={`https://wa.me/919437390950?text=${encodeURIComponent(
                'Hello SM Graphics, I need an urgent printing quote for my project in Cuttack.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-xl transition-all"
            >
              WhatsApp Estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
