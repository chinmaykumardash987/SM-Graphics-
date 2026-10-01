import { Phone, MessageSquare } from 'lucide-react';

export function FloatingActions() {
  const whatsappUrl = `https://wa.me/919437390950?text=${encodeURIComponent(
    'Hello SM Graphics, I would like to enquire about your printing services.'
  )}`;

  return (
    <>
      {/* Floating Call Button for Mobile (Fixed bottom-left) */}
      <aside aria-label="Mobile quick call action" className="sm:hidden fixed bottom-5 left-4 z-40">
        <a
          href="tel:9437390950"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-xl active:scale-95 transition-all border border-blue-400/40"
          aria-label="Call SM Graphics at 9437390950"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span>Call Us</span>
        </a>
      </aside>

      {/* Floating WhatsApp Action Button (Fixed bottom-right) */}
      <aside aria-label="WhatsApp quick chat action" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 group">
        {/* Subtle Tooltip Label on Desktop */}
        <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat on WhatsApp
        </span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl animate-whatsapp-pulse hover:scale-108 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
          aria-label="Chat with SM Graphics on WhatsApp"
        >
          {/* Custom SVG WhatsApp icon for authentic high-fidelity look */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.182-.076.355.101.173.449.741.963 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
          </svg>
        </a>
      </aside>
    </>
  );
}
