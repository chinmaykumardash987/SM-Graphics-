import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Printer,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Trash2,
  RefreshCw,
  Plus
} from 'lucide-react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

export interface BookingRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface UserBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNew: () => void;
}

export function UserBookingsModal({ isOpen, onClose, onBookNew }: UserBookingsModalProps) {
  if (!isOpen) return null;

  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const records: BookingRecord[] = [];
        snapshot.forEach((docSnap) => {
          records.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        // Sort descending by createdAt
        records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(records);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'bookings');
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    setCancellingId(bookingId);
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'cancelled',
        updatedAt: new Date().toISOString(),
      });
      setCancellingId(null);
    } catch (err) {
      setCancellingId(null);
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  };

  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-400 border border-blue-800">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-800">
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-white">
                My Appointments & Bookings
              </h3>
              <p className="text-xs text-slate-400">
                Logged in as {currentUser?.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close my bookings modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 my-2">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">No Bookings Found</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  You haven't scheduled any printing appointments yet. Schedule your first session with SM Graphics!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Book Appointment Now</span>
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-heading">
                      {booking.serviceType}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      #{booking.id.slice(0, 6)}
                    </span>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Date: <strong className="text-white">{booking.appointmentDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Slot: <strong className="text-white">{booking.appointmentTime}</strong></span>
                  </div>
                </div>

                {booking.notes && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Notes:</span> {booking.notes}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                  <a
                    href={`https://wa.me/919437390950?text=${encodeURIComponent(
                      `Hello SM Graphics, regarding my booking #${booking.id.slice(0, 6)} (${booking.serviceType} on ${booking.appointmentDate} - ${booking.appointmentTime}), I would like an update.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-semibold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  {booking.status === 'pending' && (
                    <button
                      type="button"
                      disabled={cancellingId === booking.id}
                      onClick={() => handleCancelBooking(booking.id)}
                      className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{cancellingId === booking.id ? 'Cancelling...' : 'Cancel Appointment'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookNew();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Appointment</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
