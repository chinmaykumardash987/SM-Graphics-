import { Send, SlidersHorizontal, Printer, PackageCheck, ArrowRight } from 'lucide-react';

interface ProcessProps {
  onOpenQuoteModal: () => void;
}

export function Process({ onOpenQuoteModal }: ProcessProps) {
  const steps = [
    {
      number: '01',
      title: 'Share Your Design',
      desc: 'Send your design file via WhatsApp or email, or drop into our CDA studio with your concept.',
      icon: Send,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    },
    {
      number: '02',
      title: 'Choose Your Solution',
      desc: 'Select paper GSM, flex banner grade, size dimensions, and finishing options with our guidance.',
      icon: SlidersHorizontal,
      color: 'text-pink-400 border-pink-500/30 bg-pink-500/10'
    },
    {
      number: '03',
      title: 'We Print With Precision',
      desc: 'We calibrate colors on high-speed digital or large-format flex presses for crisp, vibrant results.',
      icon: Printer,
      color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
    },
    {
      number: '04',
      title: 'Collect Your Product',
      desc: 'Pick up your neatly packaged prints at CDA Sector-9 or request convenient local dispatch.',
      icon: PackageCheck,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <span>Seamless Workflow</span>
            <span>·</span>
            <span>How We Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Simple. Fast. Professional.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From initial artwork review to the final packaged order, our streamlined process ensures zero delays and
            flawless print output.
          </p>
        </div>

        {/* 4-Step Timeline with Connecting Lines */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-cyan-400 via-pink-400 via-yellow-400 to-emerald-400 -translate-y-8 z-0 opacity-40"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
                >
                  {/* Step Number & Icon Circle */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl border ${step.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="absolute -top-2.5 -right-2.5 px-2 py-0.5 rounded-md bg-slate-900 text-[11px] font-mono font-bold text-white border border-slate-700 shadow">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Start Your Order Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
