import { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ArrowUpRight, User, Calendar, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import smLogoImg from '../assets/images/sm_graphics_logo_1790931105985.jpg';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenAuthModal: () => void;
  onOpenBookingModal: () => void;
  onOpenMyBookings: () => void;
}

export function Navbar({
  onOpenQuoteModal,
  onOpenAuthModal,
  onOpenBookingModal,
  onOpenMyBookings
}: NavbarProps) {
  const { currentUser, userProfile, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayName = userProfile?.displayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Account';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-800/80 py-3'
          : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/40 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo Zone */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
            aria-label="SM Graphics Home"
          >
            <img
              src={smLogoImg}
              alt="SM Graphics Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-amber-400/60 shadow-md group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center font-heading">
                  SM<span className="text-cyan-400 ml-0.5">GRAPHICS</span>
                </span>
                {/* Subtle CMYK registration dots */}
                <div className="hidden sm:flex items-center gap-1 ml-1" title="CMYK Print Precision">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-sm"></span>
                  <span className="w-2 h-2 rounded-full bg-pink-500 inline-block shadow-sm"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block shadow-sm"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700 inline-block shadow-sm"></span>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase font-sans mt-0.5">
                PRINT • DESIGN • DISPLAY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Action Zone */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Appointment Booking Action */}
            <button
              onClick={onOpenBookingModal}
              className="px-3.5 py-2 text-xs font-bold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Auth / Account Controls */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold uppercase">
                    {displayName.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{displayName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-1.5 border-b border-slate-800">
                      <p className="text-[11px] text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-white truncate">{currentUser.email}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenMyBookings();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:text-cyan-400 hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>My Bookings</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenBookingModal();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:text-cyan-400 hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-pink-400" />
                      <span>New Appointment</span>
                    </button>

                    <div className="border-t border-slate-800 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-pink-400 hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Direct Call Button */}
            <a
              href="tel:9437390950"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg shadow-sm hover:shadow-cyan-500/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Call</span>
              <span className="text-cyan-100 font-mono text-[11px] hidden xl:inline">9437390950</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBookingModal}
              className="p-2 text-cyan-300 bg-cyan-950 border border-cyan-800 rounded-lg flex items-center justify-center"
              aria-label="Book Appointment"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <a
              href="tel:9437390950"
              className="p-2 text-white bg-blue-600 rounded-lg sm:hidden flex items-center justify-center"
              aria-label="Call SM Graphics"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl">
          {/* User profile row in mobile */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                  {displayName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{displayName}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[170px]">{currentUser.email}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xs font-bold text-white">Guest Customer</div>
                <div className="text-[10px] text-slate-400">Sign in to book or view appointments</div>
              </div>
            )}

            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="text-xs font-semibold text-pink-400 hover:text-pink-300 p-1.5"
              >
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
              >
                Sign In
              </button>
            )}
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 rounded-md text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full text-center px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Printing Appointment</span>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold text-cyan-300 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 flex items-center justify-center gap-2"
              >
                <span>View My Appointments</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800"
            >
              Instant Print Rate Estimator
            </button>

            <a
              href="tel:9437390950"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call 9437390950</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            📍 Menrva Complex, CDA Sector-9, Cuttack
          </div>
        </div>
      )}
    </header>
  );
}
