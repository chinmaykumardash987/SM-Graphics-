import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Printer,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Lock,
  Phone,
  User,
  Mail,
  FileText
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequireAuth: () => void;
  onOpenMyBookings: () => void;
  initialService?: string;
}

export function AppointmentBookingModal({
  isOpen,
  onClose,
  onRequireAuth,
  onOpenMyBookings,
  initialService = 'Digital Printing'
}: AppointmentBookingModalProps) {
  if (!isOpen) return null;

  const { currentUser, userProfile } = useAuth();

  // Tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [serviceType, setServiceType] = useState(initialService);
  const [appointmentDate, setAppointmentDate] = useState(minDateStr);
  const [appointmentTime, setAppointmentTime] = useState('Morning (10:00 AM – 1:00 PM)');
  const [notes, setNotes] = useState('');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [name, setName] = useState(userProfile?.displayName || currentUser?.displayName || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  // Sync profile details if available
  React.useEffect(() => {
    if (userProfile?.phone && !phone) {
      setPhone(userProfile.phone);
    }
    if ((userProfile?.displayName || currentUser?.displayName) && !name) {
      setName(userProfile?.displayName || currentUser?.displayName || '');
    }
  }, [userProfile, currentUser]);

  const serviceOptions = [
    'Digital Printing',
    'Flex Banner',
    'Hoarding & Outdoor Signage',
    'Commercial Stationery',
    'Visiting Cards',
    'Brochures & Flyers',
    'Custom Design & Consultation',
    'Other'
  ];

  const timeSlots = [
    'Morning (10:00 AM – 1:00 PM)',
    'Afternoon (1:00 PM – 5:00 PM)',
    'Evening (5:00 PM – 8:00 PM)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onRequireAuth();
      return;
    }

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a contact phone number for appointment confirmation.');
      return;
    }
    if (!appointmentDate) {
      setError('Please select an appointment date.');
      return;
    }

    setLoading(true);
    setError(null);

    const bookingPayload = {
      userId: currentUser.uid,
      userName: name.trim(),
      userEmail: currentUser.email || '',
      userPhone: phone.trim(),
      serviceType,
      appointmentDate,
      appointmentTime,
      notes: notes.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, 'bookings'), bookingPayload);
      setLoading(false);
      setBookingSuccess({
        id: docRef.id,
        ...bookingPayload,
      });
    } catch (err) {
      setLoading(false);
      handleFirestoreError(err, OperationType.CREATE, 'bookings');
    }
  };

  const getWhatsAppConfirmationUrl = () => {
    if (!bookingSuccess) return '#';
    const text = `Hello SM Graphics, I have booked a printing appointment on your website!\n\n*Booking ID:* ${bookingSuccess.id}\n*Name:* ${bookingSuccess.userName}\n*Phone:* ${bookingSuccess.userPhone}\n*Service:* ${bookingSuccess.serviceType}\n*Date:* ${bookingSuccess.appointmentDate}\n*Time:* ${bookingSuccess.appointmentTime}\n*Notes:* ${bookingSuccess.notes || 'N/A'}\n\nPlease confirm my slot at CDA Sector-9.`;
    return `https://wa.me/919437390950?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-white">
              Book a Printing Appointment
            </h3>
            <p className="text-xs text-slate-400">
              Workshop Consultation & Proofing · Menrva Complex, CDA Sector-9
            </p>
          </div>
        </div>

        {/* Gate: If User is Not Logged In */}
        {!currentUser ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-sm mx-auto">
              <h4 className="text-lg font-bold font-heading text-white">
                Sign In Required to Book
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Please sign in or create a customer account so we can store your contact details and appointment history safely.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onRequireAuth}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Sign In / Sign Up
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-all"
              >
                Cancel
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
              Need immediate urgent printing? Call directly at <a href="tel:9437390950" className="text-cyan-400 font-mono font-bold">9437390950</a>
            </div>
          </div>
        ) : bookingSuccess ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-bold font-heading text-white">
                Appointment Booked!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Your appointment request has been recorded in our system.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-mono text-cyan-400 font-semibold">{bookingSuccess.id.slice(0, 10)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-white font-medium">{bookingSuccess.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="text-white font-medium">{bookingSuccess.appointmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time Window:</span>
                <span className="text-emerald-400 font-medium">{bookingSuccess.appointmentTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <span className="text-slate-200">{bookingSuccess.userName} ({bookingSuccess.userPhone})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMyBookings();
                }}
                className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
              >
                View My Bookings
              </button>
            </div>
          </div>
        ) : (
          /* Active Booking Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-pink-950/60 border border-pink-700/60 text-xs text-pink-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Your Name <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contact Phone <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9437390950"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Service Type Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Printing Service or Consultation Needed <span className="text-pink-400">*</span>
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
              >
                {serviceOptions.map((s) => (
                  <option key={s} value={s} className="bg-slate-950">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Date */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Preferred Date <span className="text-pink-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={minDateStr}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Time Slot <span className="text-pink-400">*</span>
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-slate-950">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Project Details / Specifications <span className="text-slate-500">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention sizes (e.g. 8x4 flex), paper finish, quantity, or specific design ideas..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm & Schedule Appointment</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-[11px] text-slate-500">
              📍 Location: Menrva Complex, CDA Sector-9, Cuttack · Mon–Sat 9:30 AM–8:30 PM
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
