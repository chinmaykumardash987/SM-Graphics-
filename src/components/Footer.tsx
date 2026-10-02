import { Phone, Mail, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import smLogoImg from '../assets/images/sm_graphics_logo_1790931105985.jpg';

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative border-t border-slate-800">
      {/* CMYK Top Hairline Gradient Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-pink-500 via-yellow-400 to-blue-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={smLogoImg}
                alt="SM Graphics Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/60 shadow-lg shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-white font-heading">
                    SM<span className="text-cyan-400 ml-0.5">GRAPHICS</span>
                  </span>
                  {/* CMYK dots */}
                  <div className="flex items-center gap-1 ml-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
                </div>
                <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase mt-0.5 font-sans">
                  PRINT • DESIGN • DISPLAY
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional digital printing, signage, banners and commercial stationery solutions in Cuttack, Odisha.
              Dedicated to precision, vivid colors, and fast turnaround for all commercial and personal printing.
            </p>

            <div className="pt-2 text-xs text-slate-500">
              Serving CDA, Bidanasi, Badambadi, Link Road, Mangalabag, and all regions across Cuttack & Bhubaneswar.
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Services', href: '#services' },
                { label: 'About', href: '#about' },
                { label: 'Why Us', href: '#why-us' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }} className="hover:text-cyan-400 transition-colors">
                  Digital Printing
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }} className="hover:text-cyan-400 transition-colors">
                  Flex Banners & Hoardings
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }} className="hover:text-cyan-400 transition-colors">
                  Signage & Glow Boards
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }} className="hover:text-cyan-400 transition-colors">
                  Commercial Stationery
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }} className="hover:text-cyan-400 transition-colors">
                  Visiting & Invitation Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a href="tel:9437390950" className="hover:text-white transition-colors font-mono">
                  9437390950
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <a href="mailto:smgraphicscda@gmail.com" className="hover:text-white transition-colors break-all">
                  smgraphicscda@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Menrva Complex, CDA Sector-9,
                  <br />
                  Cuttack, Odisha – 753014
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 SM Graphics. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>High Quality Printing · Cuttack, Odisha</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
