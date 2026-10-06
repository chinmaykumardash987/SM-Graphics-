import React, { useEffect, useState } from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Search,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Trash2,
  RefreshCw,
  MessageSquare,
  Filter,
  Check,
  ChevronDown,
  Printer
} from 'lucide-react';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

const ADMIN_EMAILS = [
  'chinmaykumardash987@gmail.com',
  'smgraphicscda@gmail.com'
];

export interface AdminBookingRecord {
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

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
}

export function AdminPanelModal({ isOpen, onClose, onOpenAuthModal }: AdminPanelModalProps) {
  if (!isOpen) return null;

  const { currentUser, logout } = useAuth();
  const isAdmin = currentUser?.email && ADMIN_EMAILS.includes(currentUser.email.toLowerCase());

  const [bookings, setBookings] = useState<AdminBookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, 'bookings'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const records: AdminBookingRecord[] = [];
        snapshot.forEach((docSnap) => {
          records.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        // Sort newest first
        records.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setBookings(records);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'bookings');
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  const handleUpdateStatus = async (bookingId: string, newStatus: AdminBookingRecord['status']) => {
    setUpdatingId(bookingId);
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
      setUpdatingId(null);
      setActionSuccessMessage(`Booking status updated to ${newStatus}`);
      setTimeout(() => setActionSuccessMessage(null), 3000);
    } catch (err) {
      setUpdatingId(null);
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  };

  const handleDeleteBooking = async (bookingId: string, clientName: string) => {
    if (!confirm(`Are you sure you want to permanently delete the booking for "${clientName}"?`)) return;
    setUpdatingId(bookingId);
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setUpdatingId(null);
      setActionSuccessMessage('Booking removed successfully');
      setTimeout(() => setActionSuccessMessage(null), 3000);
    } catch (err) {
      setUpdatingId(null);
      handleFirestoreError(err, OperationType.DELETE, `bookings/${bookingId}`);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.userName?.toLowerCase().includes(q) ||
      b.userPhone?.toLowerCase().includes(q) ||
      b.userEmail?.toLowerCase().includes(q) ||
      b.serviceType?.toLowerCase().includes(q) ||
      b.notes?.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // Calculate metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full p-5 sm:p-7 overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  SM Graphics Admin Portal
                </h3>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Authorized Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Customer appointment schedule, printing specifications & status management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate for Non-Admins */}
        {!currentUser ? (
          <div className="py-16 text-center space-y-5 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white font-heading">
                Admin Sign-In Required
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Please sign in with your authorized SM Graphics administrator account (<span className="text-cyan-400 font-mono">chinmaykumardash987@gmail.com</span>) to manage appointments.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              Sign In to Admin Account
            </button>
          </div>
        ) : !isAdmin ? (
          <div className="py-16 text-center space-y-5 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white font-heading">
                Access Restricted
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You are currently signed in as <strong className="text-white">{currentUser.email}</strong>, which is not registered with admin privileges.
              </p>
              <p className="text-[11px] text-slate-500">
                Authorized admin email: <span className="font-mono text-cyan-400">chinmaykumardash987@gmail.com</span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  onClose();
                  onOpenAuthModal();
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-400 font-semibold text-xs border border-slate-700 transition-all"
              >
                Switch Account
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Admin Dashboard Content */
          <>
            {/* KPI Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Bookings</span>
                <div className="text-2xl font-black text-white font-heading">{totalCount}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-900/30 space-y-1">
                <span className="text-[11px] text-amber-400 uppercase font-semibold">Pending Review</span>
                <div className="text-2xl font-black text-amber-400 font-heading">{pendingCount}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/30 space-y-1">
                <span className="text-[11px] text-emerald-400 uppercase font-semibold">Confirmed</span>
                <div className="text-2xl font-black text-emerald-400 font-heading">{confirmedCount}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-blue-900/30 space-y-1">
                <span className="text-[11px] text-cyan-400 uppercase font-semibold">Completed</span>
                <div className="text-2xl font-black text-cyan-400 font-heading">{completedCount}</div>
              </div>
            </div>

            {/* Notification Toast */}
            {actionSuccessMessage && (
              <div className="mb-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{actionSuccessMessage}</span>
              </div>
            )}

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search client name, phone number, service, or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap cursor-pointer transition-all ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              {loading ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400">Loading appointments from database...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
                  <h5 className="text-sm font-bold text-white">No Appointments Found</h5>
                  <p className="text-xs text-slate-400">
                    {searchQuery || statusFilter !== 'all'
                      ? 'No appointments match the current search or status filter.'
                      : 'No customer appointments have been booked yet.'}
                  </p>
                </div>
              ) : (
                filteredBookings.map((booking) => {
                  const whatsappMsg = `Hello ${booking.userName}, this is SM Graphics Cuttack regarding your appointment for "${booking.serviceType}" scheduled on ${booking.appointmentDate} (${booking.appointmentTime}).`;
                  const whatsappUrl = `https://wa.me/91${booking.userPhone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`;

                  return (
                    <div
                      key={booking.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                    >
                      {/* Top Row: Service & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white font-heading">
                            {booking.serviceType}
                          </span>
                          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                            #{booking.id.slice(0, 8)}
                          </span>
                        </div>

                        {/* Status Changer */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">Status:</span>
                          <select
                            disabled={updatingId === booking.id}
                            value={booking.status}
                            onChange={(e) =>
                              handleUpdateStatus(booking.id, e.target.value as AdminBookingRecord['status'])
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                : booking.status === 'completed'
                                ? 'bg-blue-950 text-blue-300 border-blue-700'
                                : booking.status === 'cancelled'
                                ? 'bg-slate-900 text-slate-400 border-slate-700'
                                : 'bg-amber-950 text-amber-300 border-amber-700'
                            }`}
                          >
                            <option value="pending" className="bg-slate-900 text-white">Pending Review</option>
                            <option value="confirmed" className="bg-slate-900 text-white">Confirmed</option>
                            <option value="completed" className="bg-slate-900 text-white">Completed</option>
                            <option value="cancelled" className="bg-slate-900 text-white">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {/* Client details */}
                        <div className="space-y-1">
                          <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-500" />
                            <span>Client:</span>
                          </div>
                          <div className="font-bold text-white text-sm">{booking.userName}</div>
                          <div className="text-slate-400 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-cyan-400" />
                            <a href={`tel:${booking.userPhone}`} className="hover:text-white font-mono">
                              {booking.userPhone}
                            </a>
                          </div>
                          {booking.userEmail && (
                            <div className="text-slate-500 truncate text-[11px] flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span>{booking.userEmail}</span>
                            </div>
                          )}
                        </div>

                        {/* Appointment Time */}
                        <div className="space-y-1">
                          <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>Scheduled Window:</span>
                          </div>
                          <div className="text-white font-medium">{booking.appointmentDate}</div>
                          <div className="text-emerald-400 font-medium">{booking.appointmentTime}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Booked: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>

                        {/* Notes / Specifications */}
                        <div className="space-y-1">
                          <div className="text-slate-400 font-semibold">Project Notes:</div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 min-h-[42px] leading-relaxed">
                            {booking.notes || <span className="text-slate-500 italic">No special specifications provided.</span>}
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                        <div className="flex items-center gap-2">
                          {/* Quick Confirm Button */}
                          {booking.status === 'pending' && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve & Confirm</span>
                            </button>
                          )}

                          {booking.status === 'confirmed' && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => handleUpdateStatus(booking.id, 'completed')}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1 shadow cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mark as Completed</span>
                            </button>
                          )}

                          {/* WhatsApp Customer */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Message Client</span>
                          </a>

                          {/* Direct Call */}
                          <a
                            href={`tel:${booking.userPhone}`}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Call</span>
                          </a>
                        </div>

                        {/* Delete Action */}
                        <button
                          type="button"
                          disabled={updatingId === booking.id}
                          onClick={() => handleDeleteBooking(booking.id, booking.userName)}
                          className="text-pink-400 hover:text-pink-300 p-1.5 rounded hover:bg-pink-950/40 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          title="Delete booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Info */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div>
                Logged in as <strong className="text-slate-300">{currentUser?.email}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span>Database: <code className="text-cyan-400 font-mono text-[11px]">ai-studio-smgraphics</code></span>
                <span>·</span>
                <span>Menrva Complex CDA Sec-9</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
