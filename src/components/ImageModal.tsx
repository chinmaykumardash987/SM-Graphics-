import { X, Phone, MessageSquare, Tag, FileText } from 'lucide-react';
import { PortfolioItem } from '../data/portfolioData';

interface ImageModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function ImageModal({ item, onClose }: ImageModalProps) {
  if (!item) return null;

  const whatsappMsg = `Hello SM Graphics, I am interested in printing similar to your portfolio item: "${item.title}" (${item.category}). Please provide quotation details.`;
  const whatsappUrl = `https://wa.me/919437390950?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition-colors"
          aria-label="Close image modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview Container */}
        <div className="relative bg-black h-64 sm:h-96 w-full flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover sm:object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Modal Info Content */}
        <div className="p-6 sm:p-8 space-y-4 bg-slate-900 text-white overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-1 rounded-md">
              {item.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Printed in Cuttack · SM Graphics
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
            {item.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {item.description}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Standard Specifications:</span> {item.specs}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire for this Item</span>
            </a>

            <a
              href="tel:9437390950"
              className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call 9437390950</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
