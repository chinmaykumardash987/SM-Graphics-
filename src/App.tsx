import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Applications } from './components/Applications';
import { RatingSection } from './components/RatingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuoteEstimatorModal } from './components/QuoteEstimatorModal';
import { AuthModal } from './components/AuthModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { UserBookingsModal } from './components/UserBookingsModal';
import { AdminPanelModal } from './components/AdminPanelModal';

function MainLayout() {
  const { currentUser } = useAuth();

  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('Flex Banners');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authSubtitle, setAuthSubtitle] = useState('Sign in to book an appointment and manage your printing orders with SM Graphics.');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState('Digital Printing');

  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const [contactPreselectedService, setContactPreselectedService] = useState('Digital Printing');

  // Listen for #admin in url hash
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminPanelOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenQuoteModal = (serviceName: string = 'Flex Banners') => {
    setSelectedServiceForQuote(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleOpenBooking = (serviceName: string = 'Digital Printing') => {
    setBookingService(serviceName);
    setIsBookingModalOpen(true);
  };

  const handleRequireAuthFromBooking = () => {
    setAuthSubtitle('Create an account or sign in to confirm and record your printing appointment.');
    setIsBookingModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    // Reopen booking modal if they signed in during a booking intent
    setIsBookingModalOpen(true);
  };

  const handleSelectServiceFromCard = (serviceTitle: string) => {
    setContactPreselectedService(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectApplication = (purpose: string) => {
    setContactPreselectedService(
      purpose.includes('Shop') ? 'Flex Banner' : purpose.includes('Business') ? 'Visiting Card' : 'Digital Printing'
    );
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Sticky Responsive Navbar with Auth, Booking & Admin triggers */}
      <Navbar
        onOpenQuoteModal={() => handleOpenQuoteModal('Flex Banners')}
        onOpenAuthModal={() => {
          setAuthSubtitle('Sign in to access your customer account and view saved appointments.');
          setIsAuthModalOpen(true);
        }}
        onOpenBookingModal={() => handleOpenBooking('Digital Printing')}
        onOpenMyBookings={() => {
          if (!currentUser) {
            setAuthSubtitle('Sign in to view your scheduled appointments and bookings.');
            setIsAuthModalOpen(true);
          } else {
            setIsMyBookingsOpen(true);
          }
        }}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenQuoteModal={() => handleOpenQuoteModal('Flex Banners')}
          onOpenBookingModal={() => handleOpenBooking('Digital Printing')}
        />

        {/* Quick Info & Trust Bar Strip */}
        <TrustBar />

        {/* Services Section with 3 Premium Cards */}
        <Services
          onSelectService={handleSelectServiceFromCard}
          onBookAppointment={(service) => handleOpenBooking(service)}
        />

        {/* About Section */}
        <About />

        {/* Why Choose Us: 6 Core Feature Cards */}
        <WhyChooseUs />

        {/* 4-Step Printing Process */}
        <Process onOpenQuoteModal={() => handleOpenQuoteModal('Flex Banners')} />

        {/* Portfolio & Work Showcase */}
        <Portfolio />

        {/* Business Applications */}
        <Applications onSelectApplication={handleSelectApplication} />

        {/* Rating & Local Trust Section */}
        <RatingSection onOpenContact={handleScrollToContact} />

        {/* Location & Contact Section with Form & Google Maps */}
        <ContactSection initialService={contactPreselectedService} />
      </main>

      {/* Dark Premium Footer with Admin Portal link */}
      <Footer onOpenAdminPanel={() => setIsAdminPanelOpen(true)} />

      {/* Floating Action Buttons: WhatsApp & Mobile Call */}
      <FloatingActions />

      {/* Instant Print Rate Estimator Modal */}
      <QuoteEstimatorModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={selectedServiceForQuote}
      />

      {/* Customer Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        subtitle={authSubtitle}
      />

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onRequireAuth={handleRequireAuthFromBooking}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        initialService={bookingService}
      />

      {/* Real-Time User Bookings Viewer */}
      <UserBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onBookNew={() => {
          setIsMyBookingsOpen(false);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Dedicated Admin Portal Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => {
          setIsAdminPanelOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
        onOpenAuthModal={() => {
          setAuthSubtitle('Sign in with your authorized admin email (chinmaykumardash987@gmail.com) to access the Admin Portal.');
          setIsAuthModalOpen(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
